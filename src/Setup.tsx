import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';
import { useNavigate } from "react-router-dom";
import { FC, useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Alert, Checkbox, FormControlLabel, Snackbar, Typography } from '@mui/material';
import { VerticalAlignBottom } from '@mui/icons-material';

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

      const [showWarning, setShowWarning] = useState(true);

      const atLeastTwoPlayersChecked= availablePlayers
        .filter(x => x.checked)
        .length >= 2
      ;

  const navigate = useNavigate();

     useEffect(
    () => setTitle("Choose Players then Start...")
    , []
  );



    //let num = 1;
    //const [num, setNum] = useState(1);

    return (
      <>
      <Snackbar 
        anchorOrigin={{
          vertical: "bottom"
          , horizontal: "center"
        }}
        open={showWarning}
        autoHideDuration={2500}
        onClose={
          () =>setShowWarning(false)
        }
      >
        <Alert
          severity="warning"
          sx={{ width: '100%' }}
        >
          Choose two players...
        </Alert>
      </Snackbar>
      <Button
          variant='outlined'
          size='large'
          startIcon={
            <SmartDisplay />
          }
          onClick={
           () => navigate(-1)
          }
          sx={{
            bgcolor: '#f44336'
            , color: "white"
            , p: 3
            , width: {
                xs: '100%'
                , md: '45%'
            }
            , m: {
              xs: 0
              , md: 3
            }
          }}
        >
          <Typography
            fontSize={20}
          >
          Go Back
          </Typography>
        </Button>
        <Button
          variant='outlined'
          size='large'
          startIcon={
            <SmartDisplay />
          }
          sx={{
            bgcolor: "black"
            , color: "white"
            , p: 3
            , width: {
                xs: '100%'
                , md: '45%'
            }
            , m: {
              xs: 0
              , md: 3
            }
          }}
          onClick={
           //() => navigate("/play")
           () => {
            //setNum(num + 1);
            //console.log(num);
            if (!atLeastTwoPlayersChecked) {
              setShowWarning(true);
              return;
            }
            setNum(num + 1);
            navigate('/play');
           }
          }
        >
          <Typography
            fontSize={20}
          >
          Start the game
          </Typography>
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