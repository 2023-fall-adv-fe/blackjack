import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';
import { useNavigate } from "react-router-dom";

export const Stats = () => {

  const navigate = useNavigate();

    return (
      <>
        <h3>
          User Stats
        </h3>
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