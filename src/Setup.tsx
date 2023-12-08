import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';
import { useNavigate } from "react-router-dom";
import { FC, useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Checkbox, FormControlLabel } from '@mui/material';

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

    const [availablePlayers, setAvailablePlayers] =
      useState(previousPlayers.map(x => ({
        name: x
        , checked: false
      })));

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
            availablePlayers.map( x => (
              <Grid
                xs={12}
                sm={6}
                md={4}
                lg={2}
              >
                <FormControlLabel
                  control={
                  <Checkbox
                    checked={x.checked}
                    onChange={
                      (e) => setAvailablePlayers(
                        [
                        ...availablePlayers.map(y => ({
                          name: y.name
                          , checked: y.name == x.name ? !y.checked : y.checked
                        }))
                        ]
                      )
                    }
                  />
                }
                  label={x.name}
                  />
              </Grid>
            ))
          }
          
        </Grid>
      </>
    );
  };