import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';
import { useNavigate } from "react-router-dom";
import { FC, useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Alert, Box, Checkbox, FormControlLabel, Snackbar, TextField, Typography } from '@mui/material';
import { VerticalAlignBottom } from '@mui/icons-material';

interface SetupProps {
  num: number;
  setNum: any;
  setTitle: (title: string) => void;
  previousPlayers: string[];
  setChosenPlayers: (players: string[]) => void;
}

export const Setup: FC<SetupProps> = ({
    num
    , setNum
    , setTitle 
    , previousPlayers
    , setChosenPlayers
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

  const [newPlayerName, setNewPlayerName] = useState("");
  const navigate = useNavigate();

     useEffect(
    () => setTitle("Choose Players then Start...")
    , []
  );

      const validateAndAddNewPlayer = () => {
        //Validate here

        if (
          newPlayerName.length == 0
          || availablePlayers.some(x => x.name.toUpperCase() == newPlayerName.toLocaleUpperCase())
        ) {
          return;
        }
        setAvailablePlayers([
          ...availablePlayers
          , {
            name: newPlayerName
            , checked: true
          }
        ].sort(
          (a, b) => a.name.localeCompare(b.name)
          )
        );

        setNewPlayerName("");
      };

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
          variant='contained'
          size='large'
          color='secondary'
          startIcon={
            <SmartDisplay />
          }
          onClick={
           () => navigate(-1)
          }
          sx={{
            p: 3
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
          variant='contained'
          color='primary'
          size='large'
          startIcon={
            <SmartDisplay />
          }
          sx={{
            color: "white"
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

            setChosenPlayers(
              availablePlayers
                .filter(x => x.checked)
                .map(x => x.name)
            );
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
        <Box
          sx={{
            mt: 2
            , display: "flex"
            , flexDirection: "row"
            , gap: 1
          }}
        >
          <TextField
            label="Enter new player name"
            variant='outlined'
            fullWidth
            value={newPlayerName}
            onChange={
              (e) => setNewPlayerName(e.target.value)
            }
          />
          <Button
            variant={newPlayerName.length == 0 ? "outlined" : 'contained'}
            color='primary'

            onClick={
              validateAndAddNewPlayer
            }
          >
            Add Name
          </Button>
          
        </Box>
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
                key={x.name}
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