import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';
import { useNavigate } from "react-router-dom";
import { GameResult } from './blackjack-game-results';
import { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';

interface PlayProps {
  addNewGameResult: (r: GameResult) => void;
  setTitle: (t: string) => void;
  chosenPlayers: string[];
};

export const Play: FC<PlayProps>  = ({
  addNewGameResult
  , setTitle
  , chosenPlayers
}) => {

  useEffect(
    () => setTitle("Play Blackjack and Collect Data")
    , []
  );
  
  const navigate = useNavigate();

  const [startTimestamp, _] = useState(new Date().toISOString());

  const gameOver = (winner: string) => {
    addNewGameResult({
      winner: winner
      , players: chosenPlayers

      , start: startTimestamp
      , end: new Date().toISOString()
    });
    navigate("/");
  }

    return (
      <Box
        sx={{
          mt: 2
          , display: "flex"
          , flexDirection: "column"
          , gap: 2
        }}
      >
      {
        chosenPlayers.map(x => (
          <Button
            key={x}
            variant='outlined'
            size='large'
            startIcon={
              <SmartDisplay />
            }
            onClick={
              () => gameOver(x)    
            }
            sx={{
              bgcolor: 'green'
              , color: "white"
              , p: 3
              , width: '100%'
            }}
          >
            {x} won
          </Button>
        ))
      }
        
      
      </Box>
    );
  };