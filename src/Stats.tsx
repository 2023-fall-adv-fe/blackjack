import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';
import { useNavigate } from "react-router-dom";
import { GeneralFactsDisplay, LeaderboardEntry} from './blackjack-game-results';
import { FC, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Paper, Table, TableBody, TableRow, TableCell, TableHead } from '@mui/material';

interface StatsProps {
  generalGameFacts: GeneralFactsDisplay
  leaderboard: LeaderboardEntry[];
  setTitle: (t: string) => void;
}

export const Stats: FC<StatsProps> = ({
  generalGameFacts
  , leaderboard
  , setTitle
}) => {

  const navigate = useNavigate();

  useEffect(
    () => setTitle("Blackjack Stats")
    , []
  );

    return (
      <>
               <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            md={12}
          >
            <Paper
              elevation={3}
              sx={{
                bgcolor: 'black'
                , overflow: 'hidden'
              }}
            >
              <Typography
              sx={{
                fontSize: 20
                , ml: 2
                , mt: 3
                , color: "white"

              }}
              color='text.disabled'
              gutterBottom
              >
                LEADERBOARD
              </Typography>
              <Table>
                <TableHead>
                  <TableRow
                  sx={{
                    color: "white"
                  }}
                  >
                    <TableCell
                     sx={{
                      color: "white"
                    }}
                    >
                      W
                    </TableCell>
                    <TableCell
                     sx={{
                      color: "white"
                    }}
                    >
                      L
                    </TableCell>
                    <TableCell
                     sx={{
                      color: "white"
                    }}
                    >
                      AVG
                    </TableCell>
                    <TableCell
                     sx={{
                      color: "white"
                    }}
                    >
                      BLACKJACKS
                    </TableCell>
                    <TableCell
                     sx={{
                      color: "white"
                    }}
                    >
                      PLAYER
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{width: "100%"}}
                >
                  {
                    leaderboard.map(x => (
                      <TableRow
                        key={x.name}
                      >
                        <TableCell
                         sx={{
                          color: "white"
                        }}
                        >
                          {x.wins}
                        </TableCell>
                        <TableCell
                         sx={{
                          color: "white"
                        }}
                        >
                          {x.losses}
                        </TableCell>
                        <TableCell
                         sx={{
                          color: "white"
                        }}
                        >
                          {x.avg.toFixed(3)}
                        </TableCell>
                        <TableCell
                         sx={{
                          color: "white"
                        }}
                        >
                          {x.blackJacks}
                        </TableCell>
                        <TableCell
                         sx={{
                          color: "white"
                        }}
                        >
                          {x.name}
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
        <Button
          variant='contained'
          size='large'
          color='secondary'
          startIcon={
            <SmartDisplay />
          }
          sx={{
            m: {
              xs: 0
              , md: 3
            }
            , p: 3
            , color: 'white'
            , width: {
                xs: '100%'
                , md: '45%'
            }
          }}
          onClick={
           () => navigate(-1)
          }
        >
          <Typography
          fontSize={20}
          >
            Go Back
          </Typography>
        </Button>
        <Button
          variant='contained'
          size='large'
          color='primary'
          startIcon={
            <SmartDisplay />
          }
          sx={{
            m: {
              xs: 0
              , md: 3
            }
            , p: 3
            , color: 'white'
            , width: {
                xs: '100%'
                , md: '45%'
            }
          }}
          onClick={
           () => navigate("/Setup")
          }
        >
          <Typography
          fontSize={20}
          >
            Start New Game
          </Typography>
        </Button>
      </>
    );
  };