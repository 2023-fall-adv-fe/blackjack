import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css'

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import { 
  Home
  , appTitle 
} from './Home';
import { Setup } from './Setup';
import { Play } from './Play';
import { Stats } from './Stats';
import { 
  GameResult
  , GeneralFactsDisplay
  , getGeneralGameTimeFacts
  , getLeaderboardData
  , getPreviousPlayers
} from './blackjack-game-results';
import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, IconButton, TextField, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import  TableBarOutlined from '@mui/icons-material/TableBarOutlined'
import { SettingsOutlined } from '@mui/icons-material';

import localForage from 'localforage';
import { loadGamesFromCloud, saveGameToCloud } from './tca-cloud-api';








const App = () => {

  const [num, setNum] = useState(1);
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [title, setTitle] = useState<string>(appTitle);
  const [chosenPlayers, setChosenPlayers] = useState<string[]>([]);

  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [emailAddress, setEmailAddress] = React.useState("");
  const [emailAddressUpdatedCount, setEmailAddressUpdatedCount] = React.useState(0);

  useEffect(
    () => {
      const init = async () => {
        if (!ignore) {

          const email = await localForage.getItem<string>('email') ?? "";

          if (email.length > 0) {
            setEmailAddress(email);

            const cloudGameResults = await loadGamesFromCloud(
              email
              , 'tca-blackjack-fall-2023'
            );

            setGameResults(cloudGameResults);
          }
        }
      };

      let ignore = false;
      init();

      return(
        () => {
          ignore = true;
        }
      );
    }
      , [emailAddressUpdatedCount]

  );



  const addNewGameResult = async (newGameResult: GameResult) => {

    if (emailAddress.length > 0) {
      await saveGameToCloud(
        emailAddress
        , 'tca-blackjack-fall-2023'
        , newGameResult.end
        , newGameResult
      );
    }
    setGameResults((prevGameResults) => 
      [
        ...prevGameResults
        , newGameResult
      ]
    );
  }

  const router = createHashRouter([
    {
      path: "/",
      element: <Home
        generalGameFacts={getGeneralGameTimeFacts(gameResults, Date.now())}
        setTitle={setTitle}
      />,
    },
    {
      path: "/setup",
      element: <Setup
        num={num}
        setNum={setNum}
        setTitle={setTitle}
        previousPlayers={ getPreviousPlayers(gameResults) }
        setChosenPlayers={setChosenPlayers}
      />,
    },{
      path: "/play",
      element: <Play
        addNewGameResult={addNewGameResult}
        setTitle={setTitle}
        chosenPlayers={chosenPlayers}
      />,
    },{
      path: "/Stats",
      element: <Stats
        generalGameFacts={getGeneralGameTimeFacts(gameResults, Date.now())}
        leaderboard={getLeaderboardData(gameResults)}
        setTitle={setTitle}
      />,
    },
  ]);

  return (
    <div className="App">
      <Box
        sx={{
          flexGrow: 1
        }}
      >
        <AppBar
          position='static'
          color='transparent'
          sx={{
            overflow: 'hidden'
            , bgcolor: 'black'
            , mb: 3
            , color: 'white'
          }} 
        >
          <Toolbar>
            {
              title == appTitle &&
              <TableBarOutlined
              color='inherit'
              sx={{
                mr: 1
                , fontSize: '1.5em'
                , opacity: 0.75
                , color: 'white'
                //, display: title == appTitle ? 'inherit' : 'none'
              }}
            />
            }
            
            <Typography
              variant='h6'
              color='black'
              sx={{
                opacity: 0.75
                , color: 'white'
                , flexGrow: 1
                , textAlign: 'left'
              }}
            >
              {title}
            </Typography>
            <IconButton
              size='small'
              onClick={
                () => setSettingsOpen(true)
              }
              sx={{
                opacity: 0.75
                , color: "white"
              }}
            >
              <SettingsOutlined />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          pl: 1
          , pr: 1
          , textAlign: 'left'
        }}
      >
        <RouterProvider router={router} />
      </Box>



      <Dialog
        fullScreen={fullScreen}
        open={settingsOpen}
        onClose={
          () => setSettingsOpen(false)
        }
      >
        <DialogTitle>
          Settings
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your Email address will be used to save/load game results
          </DialogContentText>

          <TextField
            label="Enter your email address"
            variant='outlined'
            fullWidth
            value={emailAddress}
            onChange={
              (e) => setEmailAddress(e.target.value)
            }
            sx={{
              mt: 3
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant={emailAddress.length > 0 ? 'contained' : 'outlined'}
            onClick={
              async () => {
                await localForage.setItem('email', emailAddress);
                setEmailAddressUpdatedCount(emailAddressUpdatedCount + 1);
                setSettingsOpen(false);
              }
            }
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
