import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';
import { useNavigate } from "react-router-dom";

export const Play = () => {

  const navigate = useNavigate();

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
            () => navigate("/")
          }
        >
          Done
        </Button>
      </>
    );
  };