import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';
import { useNavigate } from "react-router-dom";
import { GameResult } from './blackjack-game-results';
import { FC, useEffect, useState } from 'react';

interface PlayProps {
  addNewGameResult: (r: GameResult) => void;
  setTitle: (t: string) => void;
};

export const Play: FC<PlayProps>  = ({
  addNewGameResult
  , setTitle
}) => {

  useEffect(
    () => setTitle("Play Blackjack and Collect Data")
    , []
  );
  
  const navigate = useNavigate();

  const [startTimestamp, _] = useState(new Date().toISOString());

  const gameOver = (won: boolean) => {
    addNewGameResult({
      winner: "Moe"
      , players: ["Larry", "Curly", "Moe"]

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
          sx={{
            bgcolor: 'green'
            , color: "white"
            , p: 3
            , width: {
                xs: '100%'
                , md: '45%'
            }
            , m: {
              xs: 0
              , md: 3
            }
          }}
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
          sx={{
            bgcolor: '#f44336'
            , color: "white"
            , p: 3
            , width: {
                xs: '100%'
                , md: '45%'
            }
            , m: {
              xs: 0
              , md: 3
            }
          }}
        >
          I lost
        </Button>
      </>
    );
  };