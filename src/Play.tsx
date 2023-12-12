import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';
import { useNavigate } from "react-router-dom";
import { GameResult, Player, HandStatus } from './blackjack-game-results';
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

  const [handNumber, setHandNumber] = useState<number>(1)
  const [inGamePlayers, setInGamePlayers] = useState<Player[]>(
    chosenPlayers.map(
      x => ({
        name: x
        , hands: []
      })
    )
  );

  useEffect(
    () => setTitle("Play Blackjack and Collect Data")
    , []
  );
  
  const navigate = useNavigate();

  const [startTimestamp, _] = useState(new Date().toISOString());


  const gameOver = (player: string, handStatus: HandStatus) => {
    setInGamePlayers((prevPlayers) => {
    return prevPlayers.map((p) => {
      if (p.name === player) {
        return {
          ...p,
          hands: [...p.hands, { num: handNumber, status: handStatus }],
        };
      } else {
        return {
          ...p,
          hands: [...p.hands, { num: handNumber, status: 'Lost' }],
        };
      }
    });
  });
}

  const endGame = () => {
    const gameResult: GameResult = {
      players: inGamePlayers.map((player) => ({
        name: player.name
        , hands: [...player.hands]
      }))
      , start: startTimestamp
      , end: new Date().toISOString()
    };

    addNewGameResult(gameResult);


  setInGamePlayers(
    chosenPlayers.map((x) => ({
      name: x,
      hands: [],
    }))
  );

    navigate("/");
  };

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
            , justifyContent: "center"
          }}
        >
          <Typography
            fontSize={20}
          >
            Hand: {handNumber}
          </Typography>
        </Box>



      {
        chosenPlayers.map(x => (
          <Box
          key={x}
          sx={{
            display: 'flex'
            , gap: 2
            , marginBottom: 2
          }}
          >
            <Button
              variant='contained'
              size='large'
              color='success'
              startIcon={
                <SmartDisplay />
              }
              onClick={
                () => {
                  setHandNumber(handNumber + 1);
                  gameOver(x, 'Won');
                }
              }
              sx={{
                color: "white"
                , p: 3
                , width: '100%'
              }}
            >
              {x} won
            </Button>
            <Button
              variant='contained'
              color='primary'
              size='large'
              startIcon={
                <SmartDisplay />
              }
              onClick={
                () => {
                  setHandNumber(handNumber + 1);
                  gameOver(x, 'Blackjack');
                }
              }
              sx={{
                color: "white"
                , p: 3
                , width: '100%'
              }}
            >
              {x} Got BlackJack!
            </Button>
          </Box>
        ))
      }
      <Button
        variant='contained'
        color='secondary'
        size='large'
        onClick={endGame}
        sx={{
          p: 3
          , width: '100%'
          , marginTop: 2 
        }}
      >
        End Game and Record Hands
      </Button>
      
      </Box>
    );
  };