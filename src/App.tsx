import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css'

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import { Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';
import { Stats } from './Stats';
import { GameResult, getWinningPercentageDisplay } from './blackjack-game-results';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import  TableBarOutlined from '@mui/icons-material/TableBarOutlined'


const dummyGameResults: GameResult[] = [
  true
  , false
  , true
  , true
];


const App = () => {

  const [num, setNum] = useState(1);
  const [gameResults, setGameResults] = useState<GameResult[]>(dummyGameResults);

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
      />,
    },
    {
      path: "/setup",
      element: <Setup
        num={num}
        setNum={setNum}
      />,
    },{
      path: "/play",
      element: <Play
        addNewGameResult={addNewGameResult}
      />,
    },{
      path: "/Stats",
      element: <Stats
        winningPercentageDisplay = {getWinningPercentageDisplay(gameResults)}
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
            , bgcolor: 'whitesmoke'
            , mb: 3
          }} 
        >
          <Toolbar>
            <TableBarOutlined
              color='inherit'
              sx={{
                mr: 1
                , fontSize: '1.5em'
                , opacity: 0.75
              }}
            />
            <Typography
              variant='h6'
              color='black'
              sx={{
                opacity: 0.75
              }}
            >
              Blackjack Companion App
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
