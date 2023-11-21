import Grid from '@mui/material/Unstable_Grid2';
import { GameLog } from "../util/types";
import { IdToName } from "../util/helpers";
import { Card } from '@mui/material';
import { PlayerID } from "../util/static";

type Props = {
  log: GameLog;
  index: number;
}

const getByScore = (log: GameLog, id: PlayerID, align = 'left') => {
  const isWin = log.winner === id;
  return {
    // color: isWin ? 'success.dark' : 'error.dark',
    fontWeight: isWin ? 500 : 300,
    textAlign: align,
  }
};

const GameScore = ({ log, index }: Props) => (
  <Card sx={ { p: 1, mb: 1 } }>
    <Grid container spacing={ 0.5 } alignItems="center">
      <Grid xs={ 1 } sx={{ fontSize: 12, opacity: 0.5 }}>#{ index }</Grid>

      <Grid xs={ 4 } sx={ getByScore(log, log.p1.id) }>{ IdToName(log.p1.id) }</Grid>
      <Grid xs={ 1 } sx={ getByScore(log, log.p1.id, 'right') }>{ log.p1.score }</Grid>

      <Grid xs={ 1 } sx={{ fontSize: 12,opacity: 0.5, textAlign: 'center' }}>vs</Grid>

      <Grid xs={ 1 } sx={ getByScore(log, log.p2.id ) }>{ log.p2.score }</Grid>
      <Grid xs={ 4 } sx={ getByScore(log, log.p2.id, 'right') }>{ IdToName(log.p2.id) }</Grid>
    </Grid>
  </Card>
);

export default GameScore;