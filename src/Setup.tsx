import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';
import { useNavigate } from "react-router-dom";
import { FC, useState } from 'react';

interface SetupProps {
  num: number;
  setNum: any;
}

export const Setup: FC<SetupProps> = ({num, setNum}) => {

  const navigate = useNavigate();

    //let num = 1;
    //const [num, setNum] = useState(1);

    return (
      <>
        <h3>
          Setup a game of blackjack({num})
        </h3>
        <Button
          variant='outlined'
          size='large'
          startIcon={
            <SmartDisplay />
          }
          onClick={
           //() => navigate("/play")
           () => {
            //setNum(num + 1);
            //console.log(num);
            setNum(num + 1);
            navigate('/play');
           }
          }
        >
          Start the game
        </Button>
      </>
    );
  };