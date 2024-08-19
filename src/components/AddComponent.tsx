import moment from 'moment';
import { Box, Button, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useEffect, useState } from 'react';
import { Players } from "../utils/statics";
import { Game, GameHistory } from '../utils/types';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';

const AddComponent = () => {
  const alfaName = useReadLocalStorage("alfaName") as string;
  const betaName = useReadLocalStorage("betaName") as string;
  const [games, setGames] = useLocalStorage<GameHistory>('games', {});
  const [step, setStep] = useState(0);
  const [winner, setWinner] = useState<Players | undefined>(undefined);
  const [loserScore, setLoserScore] = useState<number>(0);

  const nextStep = () => {
    setStep(step + 1);
  }

  useEffect(() => {
    if (winner === undefined || !loserScore) {
      return;
    }

    const todayDate: string = moment().format('DD-MM-YYYY');
    const record: Game = [winner, loserScore];
    const gamesCopy = JSON.parse(JSON.stringify(games));
    if (!gamesCopy.hasOwnProperty(todayDate)) {
      gamesCopy[todayDate] = [];
    }
    gamesCopy[todayDate].push(record);
    console.error(record);
    console.error(gamesCopy);
    setGames(gamesCopy);
    setStep(0);
  }, [loserScore]);

  const getPlayerSelector = () => (
    <Box>
      <Typography variant="h4" sx={ { mb: 2 } }>The winner is..</Typography>
      <Grid container spacing={ 2 } alignItems="center">
        <Grid xs={ 6 }>
          <Box textAlign="left">
            <Button size="large" variant="contained" onClick={ () => { setWinner(Players.alfa); nextStep(); } }>
              { alfaName }
            </Button>
          </Box>
        </Grid>
        <Grid xs={ 6 }>
          <Box textAlign="right">
            <Button size="large" variant="contained" onClick={ () => { setWinner(Players.beta); nextStep(); } }>
              { betaName }
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )

  const getScoreSelector = () => (
    <Box>
      <Typography variant="h4" sx={ { mb: 2 } }>Loser score is..</Typography>
      <Grid container columns={ 3 } spacing={2}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(s => (
            <Grid xs={ 1 } key={ `setScore-${ s }` } sx={ { mb: 1 } }>
              <Button variant="outlined" sx={{ width: '100%', height: '5em' }} onClick={ () => {
                setLoserScore(s);
              } } >{ s }</Button>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )

  const getGamesList = () => {
    const todayDate: string = moment().format('DD-MM-YYYY');
    const todayGames = games[todayDate] || [];
    return (
      <Box>
        <Grid container spacing={ 2 } sx={ { mb: 2 } } alignItems="center">
          <Grid xs={ 9 }>
            <Typography variant="h4">{ moment().format('DD MMM') }</Typography>
            <Typography variant="h6">Games played: { todayGames.length }</Typography>
          </Grid>
          <Grid xs={ 3 }>
            <Box textAlign="right">
              <Button size="large" variant="contained" onClick={ nextStep }>
                <AddIcon/>
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell align="left">{ alfaName }</TableCell>
              <TableCell align="right">{ betaName }</TableCell>
            </TableRow>
            { todayGames.map((g, index) => (
              <TableRow key={ index } sx={ { p: 0 } }>
                <TableCell
                  align="left"
                  sx={ { fontWeight: g[0] === Players.alfa ? 800 : 400 } }
                >
                  { g[0] === Players.beta ? g[1] : Math.max(11, g[1] + 2) }
                </TableCell>
                <TableCell
                  align="right"
                  sx={ { fontWeight: g[0] === Players.beta ? 800 : 400 } }
                >
                  { g[0] === Players.alfa ? g[1] : Math.max(11, g[1] + 2) }
                </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </Box>
    );
  }

  switch (step) {
    case 0:
      return getGamesList();
    case 1:
      return getPlayerSelector();
    case 2:
      return getScoreSelector();
    default:
      return getGamesList();
  }
}

export default AddComponent;