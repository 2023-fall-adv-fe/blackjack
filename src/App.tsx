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
      element: <Home/>,
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
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
