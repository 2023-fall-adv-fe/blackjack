import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';
import { useNavigate } from "react-router-dom";
import { GameResult } from './blackjack-game-results';
import { FC, useState } from 'react';

interface PlayProps {
  addNewGameResult: (r: GameResult) => void;
  setTitle: (t: string) => void;
};

export const Play: FC<PlayProps>  = ({
  addNewGameResult
  , setTitle
}) => {

  setTitle("Play Blackjack & Collect Data")
  const navigate = useNavigate();

  const [startTimestamp, _] = useState(new Date().toISOString());

  const gameOver = (won: boolean) => {
    addNewGameResult({
      won: won
      , start: startTimestamp
      , end: new Date().toISOString()
    });
    navigate("/");
  }

    return (
      <>
        <Button
          variant='outlined'
          size='large'
          startIcon={
            <SmartDisplay />
          }
          onClick={
            () => gameOver(true)    
          }
        >
          I won
        </Button>
        <Button
          variant='outlined'
          size='large'
          startIcon={
            <SmartDisplay />
          }
          onClick={
            () => gameOver(false)    
          }
        >
          I lost
        </Button>
      </>
    );
  };