import { useContext } from "react";
import { GlobalContext } from "../util/static";
import { Box } from "@mui/material";
import { eloToBasicRating, getAllPlayersStats, getEloRatings, ratePlayersByField } from "../util/helpers";
import BasicRatingTable from "./BasicRatingTable";
import Grid from "@mui/material/Unstable_Grid2";


const HomePage = () => {
  const { gamesLog } = useContext(GlobalContext);
  const allStats = getAllPlayersStats(gamesLog);
  const elo = getEloRatings(gamesLog);
  const basicElo = eloToBasicRating(elo);

  return (
    <Box>
      <Grid container spacing={ 2 }>
        <Grid xs={ 12 }><BasicRatingTable rating={basicElo} title="Рейтинг ЭЛО" /></Grid>
        <Grid xs={ 6 }><BasicRatingTable rating={ratePlayersByField(allStats, 'plays')} title="Games played" /></Grid>
        <Grid xs={ 6 }><BasicRatingTable rating={ratePlayersByField(allStats, 'ratio')} title="Win\loss ratio" /></Grid>
        <Grid xs={ 6 }><BasicRatingTable rating={ratePlayersByField(allStats, 'wins')} title="Games won" /></Grid>
        <Grid xs={ 6 }><BasicRatingTable rating={ratePlayersByField(allStats, 'winsPercent')} title="Winning %" /></Grid>
        <Grid xs={ 6 }><BasicRatingTable rating={ratePlayersByField(allStats, 'streak')} title="Longest streak" /></Grid>
        <Grid xs={ 6 }><BasicRatingTable rating={ratePlayersByField(allStats, 'avgPoints')} title="Avg points" /></Grid>
      </Grid>


    </Box>
  )
}

export default HomePage;