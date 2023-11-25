import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';
import { useNavigate } from "react-router-dom";


export const Home = () => {

    const navigate = useNavigate();

    return (
      <>
        <h3>
          Home
        </h3>
        <Button
          variant='outlined'
          size='large'
          startIcon={
            <SmartDisplay />
          }
          onClick={
            () => navigate('/setup')
          }
        >
          Play Blackjack
        </Button>
      </>
    );
  };