import React, { useState } from 'react';
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
  , getWinningPercentageDisplay
  , GeneralGameTimeFactsDisplay,
  getGeneralGameTimeFacts
} from './blackjack-game-results';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import  TableBarOutlined from '@mui/icons-material/TableBarOutlined'





const dummyGameResults: GameResult[] = [
  {
      won: true
      , start: "2023-10-01T17:40:46.333Z"
      , end: "2023-10-01T17:53:27.123Z"
  }
  , {
      won: false
      , start: "2023-10-09T17:55:46.333Z"
      , end: "2023-10-09T18:00:27.123Z"
  }
];


const App = () => {

  const [num, setNum] = useState(1);
  const [gameResults, setGameResults] = useState<GameResult[]>(dummyGameResults);
  const [title, setTitle] = useState<string>(appTitle)

  const addNewGameResult = (newGameResult: GameResult) => setGameResults(
    [
      ...gameResults
      , newGameResult
    ]
  );

  const router = createHashRouter([
    {
      path: "/",
      element: <Home
      winningPercentageDisplay = {getWinningPercentageDisplay(gameResults)}
      generalGameTimeFacts={getGeneralGameTimeFacts(gameResults, Date.now())}
      setTitle={setTitle}
      />,
    },
    {
      path: "/setup",
      element: <Setup
        num={num}
        setNum={setNum}
        setTitle={setTitle}
      />,
    },{
      path: "/play",
      element: <Play
        addNewGameResult={addNewGameResult}
        setTitle={setTitle}
      />,
    },{
      path: "/Stats",
      element: <Stats
        winningPercentageDisplay = {getWinningPercentageDisplay(gameResults)}
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
              }}
            >
              {title}
            </Typography>
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
    </div>
  );
}

export default App;
