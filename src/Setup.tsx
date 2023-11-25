import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';
import { useNavigate } from "react-router-dom";

export const Setup = () => {

  const navigate = useNavigate();

    return (
      <>
        <h3>
          Setup a game of blackjack
        </h3>
        <Button
          variant='outlined'
          size='large'
          startIcon={
            <SmartDisplay />
          }
          onClick={
           () => navigate("/play")
          }
        >
          Start the game
        </Button>
      </>
    );
  };