import { useContext, useState } from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { GlobalContext, PlayerID } from "../util/static";
import { Box, Divider, Typography } from "@mui/material";
import { getEloRatings, getGamesPerId, getPlayerStats, IdToName } from "../util/helpers";
import DrawerToggle from "./DrawerToggle";
import GridRow from "./GridRow";
import GameScore from "./GameScore";


const PlayerCard = ({ id }: { id: PlayerID }) => {
  const { gamesLog } = useContext(GlobalContext);
  const stats = getPlayerStats(id, gamesLog);
  return (
    <Box>
      <GridRow label="Played" value={ stats.plays }/>
      <GridRow label="Wins" value={ `${ stats.wins } (${ stats.winsPercent.toFixed(1) }%)` }/>
      <GridRow label="Loss" value={ `${ stats.loss } (${ stats.lossPercent.toFixed(1) }%)` }/>
      <GridRow label="Ratio" value={ stats.ratio.toFixed(1) }/>
      <GridRow label="Longest streak" value={ stats.streak }/>
      <GridRow label="Avg points" value={ stats.avgPoints.toFixed(1) }/>
    </Box>
  );
}

const PlayersPage = () => {
  const slice = 15;
  const { gamesLog } = useContext(GlobalContext);
  const [plrId, setPlrId] = useState(PlayerID.DB);
  const currentPlrName = IdToName(plrId);
  const drawerOptions = Object.values(PlayerID).map(id => ({ label: IdToName(id), value: id }));
  const games = getGamesPerId(plrId, gamesLog).slice(-slice);
  const elo = getEloRatings(gamesLog);
  const userElo = elo[plrId as PlayerID].slice(-slice);
  const currentElo = userElo.slice(-1)[0];

  const columnOptions = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
    },
    title: {
      text: 'Score'
    },
    xAxis: {
      title: {
        enabled:  false,
      },
      labels: {
        enabled:  false,
      },
    },
    yAxis: {
      title: {
        enabled:  false,
      }
    },
    series: [{
      showInLegend: false,
      data: games.map(game => ({
        y: game.p1.id === plrId ? game.p1.score : game.p2.score,
        color: game.winner === plrId ? '#87bc45' : '#ea5545',
      })),
    }],
  };

  columnOptions.series[0].data.push({ color: '#666', y: 0 });

  const lineOptions = {
    chart: {
      type: 'line',
      backgroundColor: 'transparent',
    },
    title: {
      text: 'Rating'
    },
    xAxis: {
      title: {
        enabled:  false,
      },
      labels: {
        enabled:  false,
      },
    },
    yAxis: {
      title: {
        enabled:  false,
      }
    },
    series: [{
      showInLegend: false,
      data: games.map((game, index) => ({
        y: userElo[index],
        color: game.winner === plrId ? '#87bc45' : '#ea5545',
      })),
    }],
  }

  lineOptions.series[0].data.push({ color: '#666', y: currentElo });

  return (
    <Box>
      <DrawerToggle label={currentPlrName} onChange={setPlrId} options={drawerOptions} value={plrId} />
      <GridRow label="ELO" value={ currentElo }/>
      <PlayerCard id={ plrId }/>
      <Typography variant="h6" sx={{ mt: 2}}>Last { slice } games</Typography>
      <Divider sx={ { my: 2 } }/>
      <HighchartsReact
        highcharts={Highcharts}
        options={columnOptions}
      />
      <Divider sx={ { my: 2 } }/>
      <HighchartsReact
        highcharts={Highcharts}
        options={lineOptions}
      />
      <Divider sx={ { my: 2 } }/>
      { games.map((log, index) => (
        <GameScore key={ `${ log.date }-game-${ index }` } log={ log } index={ index + 1 }/>
      )) }
    </Box>
  )
}

export default PlayersPage;