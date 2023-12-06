import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';
import { useNavigate } from "react-router-dom";
import { FC, useState } from 'react';

interface SetupProps {
  num: number;
  setNum: any;
  setTitle: (t: string) => void;
}

export const Setup: FC<SetupProps> = ({
    num
    , setNum
    , setTitle 
  }) => {

  const navigate = useNavigate();

    setTitle("Game Setup");

    //let num = 1;
    //const [num, setNum] = useState(1);

    return (
      <>
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