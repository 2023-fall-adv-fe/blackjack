import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';
import { useNavigate } from "react-router-dom";
import { Typography, Paper, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { WinningPercentageDisplay } from './blackjack-game-results';
import { FC } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

interface HomeProps {
  winningPercentageDisplay: WinningPercentageDisplay
}


export const Home: FC<HomeProps> = ({winningPercentageDisplay}) => {

    const navigate = useNavigate();

    return (
      <>
        <Button
          variant='contained'
          size='large'
          color='inherit'
          startIcon={
            <SmartDisplay />
          }
          sx={{
            m: {
              xs: 0
              , md: 3
            }
            , p: 3
            , width: {
                xs: '100%'
                , md: '45%'
            }
          }}
          onClick={
            () => navigate('/setup')
          }
        >
          <Typography
            fontSize={20}
            
          >
            Play Blackjack
          </Typography>
          
        </Button>

        <Button
          variant='contained'
          size='large'
          color='error'
          startIcon={
            <SmartDisplay />
          }
          sx={{
            m: {
              xs: 0
              , md: 3
            }
            , p: 3
            , opacity: 0.75
            , color: 'black'
            , width: {
              xs: '100%'
              , md: '45%'
          }
          }}
          onClick={
            () => navigate('/Stats')
          }
        >
          <Typography
            fontSize={20}
          >
            Stats
          </Typography>
        </Button>
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            md={6}
          >
            <Paper
              elevation={3}
              sx={{
                overflow: 'hidden'
              }}
            >
              <Typography
              sx={{
                fontSize: 20
                , ml: 2
                , mt: 3
              }}
              color='text.disabled'
              gutterBottom
              >
                General
              </Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography
                        fontSize={20}
                      >
                        Total Games
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        fontSize={20}
                      >
                        {winningPercentageDisplay.totalGames}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography
                        fontSize={20}
                      >
                        Winning Percentage
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        fontSize={20}
                      >
                        {winningPercentageDisplay.winningPercentage}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  };