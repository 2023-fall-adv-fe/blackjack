import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';
import { useNavigate } from "react-router-dom";
import { FC, useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

interface SetupProps {
  num: number;
  setNum: any;
  setTitle: (t: string) => void;
  previousPlayers: string[];
}

export const Setup: FC<SetupProps> = ({
    num
    , setNum
    , setTitle 
    , previousPlayers
  }) => {

  const navigate = useNavigate();

     useEffect(
    () => setTitle("Game Setup")
    , []
  );

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

        <Grid
          container
          spacing={2}
          sx={{
            mt: 2
            , mb: 2
          }}
        >
          {
            previousPlayers.map( x => (
              <Grid
                xs={12}
                sm={6}
                md={4}
                lg={2}
              >
                {x}
              </Grid>
            ))
          }
          
        </Grid>
      </>
    );
  };