import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';
import { useNavigate } from "react-router-dom";
import { GeneralFactsDisplay } from './blackjack-game-results';
import { FC, useEffect } from 'react';

interface StatsProps {
  generalGameTimeFacts: GeneralFactsDisplay
  setTitle: (t: string) => void;
}

export const Stats: FC<StatsProps> = ({
  generalGameTimeFacts
  , setTitle
}) => {

  const navigate = useNavigate();

  useEffect(
    () => setTitle("Blackjack Stats")
    , []
  );

    return (
      <>
        <h4>
          {`Total: ${generalGameTimeFacts.totalGames}`}
        </h4>
        <h4>
          
        </h4>
        <Button
          variant='outlined'
          size='large'
          startIcon={
            <SmartDisplay />
          }
          onClick={
           () => navigate(-1)
          }
        >
          Go Back
        </Button>
        <Button
          variant='outlined'
          size='large'
          startIcon={
            <SmartDisplay />
          }
          onClick={
           () => navigate("/Setup")
          }
        >
          Start New Game
        </Button>
      </>
    );
  };