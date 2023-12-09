import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';
import { useNavigate } from "react-router-dom";
import { GameResult, Player } from './blackjack-game-results';
import { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

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

  const [handNumber, setHandNumber] = useState(1)
  const [] = useState<Player[]>();

  useEffect(
    () => setTitle("Play Blackjack and Collect Data")
    , []
  );
  
  const navigate = useNavigate();

  const [startTimestamp, _] = useState(new Date().toISOString());

  const gameOver = (winner: string) => {
    addNewGameResult({
      winner: winner
      , players: chosenPlayers.map( x => ({
          name: x
          , hands: []

      }))

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
        <Box
          sx={{
            display: "flex"
            , flexDirection: "row"
            , gap: 2
            , alignItems: "center"
          }}
        >
          <Button
            variant='contained'
            onClick={
              () => setHandNumber(
                handNumber > 1 
                ? handNumber -1
                : handNumber
              )
            }
          >
            <Remove />
          </Button>
          <Typography
            fontSize={20}
          >
            Hand: {handNumber}
          </Typography>
          <Button
            variant='contained'
            onClick={
              () => setHandNumber(handNumber + 1)
            }
          >
            <Add />
          </Button>
        </Box>
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