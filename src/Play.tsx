import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';
import { useNavigate } from "react-router-dom";
import { GameResult } from './blackjack-game-results';
import { FC } from 'react';

interface PlayProps {
  addNewGameResult: (r: GameResult) => void;
};

export const Play: FC<PlayProps>  = ({addNewGameResult}) => {

  const navigate = useNavigate();

  const gameOver = (won: boolean) => {
    addNewGameResult(won);
    navigate("/");
  }

    return (
      <>
        <h3>
          Play &amp; Collect Data
        </h3>
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