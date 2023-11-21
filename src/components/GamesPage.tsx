import { Box, Divider } from "@mui/material";
import { GlobalContext } from "../util/static";
import { useContext, useState } from "react";
import GameScore from "./GameScore";
import { GameLog, GroupedGames } from "../util/types";
import DrawerToggle from "./DrawerToggle";
import { getGamesPerDate } from "../util/helpers";
import GridRow from "./GridRow";

const groupGamesByDate = (games: GameLog[]): GroupedGames => {
  return games.reduce((grouped: GroupedGames, game: GameLog) => {
    const date = game.date;

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(game);

    return grouped;
  }, {});
};

const GamesPage = () => {
  const { gamesLog } = useContext(GlobalContext);
  const grouped = groupGamesByDate(gamesLog);
  const dates = Object.keys(grouped);
  const [date, setDate] = useState(dates.slice(-1)[0]);
  const games = grouped[date];
  const drawerOptions = dates.map(date => ({ label: date, value: date }));
  const gamesStat = getGamesPerDate(date, gamesLog);

  return (
    <Box>
      <DrawerToggle label={ date } onChange={ setDate } value={ date } options={ drawerOptions }/>
      <Divider/>
      <GridRow label="Games played" value={ gamesStat.games }/>
      <GridRow label="Top wins" value={ gamesStat.wins }/>
      <GridRow label="Best streak" value={ gamesStat.streak }/>
      <Divider sx={ { my: 2 } }/>
      { gamesStat.byWin.map(plr => (
        <GridRow label={ plr.name } value={ plr.value } key={ plr.name }/>
      )) }
      <Divider sx={ { my: 2 } }/>
      { games.map((log, index) => (
        <GameScore key={ `${ log.date }-game-${ index }` } log={ log } index={ index + 1 }/>
      )) }
    </Box>
  )
}

export default GamesPage;