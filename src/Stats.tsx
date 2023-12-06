import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';
import { useNavigate } from "react-router-dom";
import { WinningPercentageDisplay } from './blackjack-game-results';
import { FC } from 'react';

interface StatsProps {
  winningPercentageDisplay: WinningPercentageDisplay;
  setTitle: (t: string) => void;
}

export const Stats: FC<StatsProps> = ({
  winningPercentageDisplay
  , setTitle
}) => {

  const navigate = useNavigate();

    setTitle("Blackjack Stats");

    return (
      <>
        <h4>
          {`Total: ${winningPercentageDisplay.totalGames}`}
        </h4>
        <h4>
          {`Winning: ${winningPercentageDisplay.winningPercentage}`}
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