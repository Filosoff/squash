import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import getStats from "../utils/getStats";
import { Card, CardContent, Typography } from "@mui/material";


const HomeComponent = () => {
  const stats = getStats();
  if (!stats) {
    return <div>No data</div>
  }

  const getStatBar = (v1: number, v2: number, v1p: number, v2p: number) => {
    const green = '#3f853f';
    const red = '#892e2e';
    const getBar = (value: number, percent: number, color: string, align: any = 'left') => <div style={{ width: `${percent}%`, background: color, padding: '0 4px', textAlign: align }}>{value}</div>
    return (
      <div style={{ display: 'flex', width: '100%', height: '24px', color: 'white' }}>
        { getBar(v1, v1p, v1 >= v2 ? green : red) }
        { getBar(v2, v2p, v1 < v2 ? green : red, 'right') }
      </div>
    )
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={6}>
          <Typography variant="h2" sx={{ textAlign: 'left', mb: 3 }}>Alfa</Typography>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h1" sx={{ textAlign: 'center' }}>{ stats.alfaGames }</Typography>
              <Typography variant="h4" sx={{ textAlign: 'center' }}>{ stats.alfaScore }</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={6}>
          <Typography variant="h2" sx={{ textAlign: 'right', mb: 3 }}>Delta</Typography>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h1" sx={{ textAlign: 'center' }}>{ stats.deltaGames }</Typography>
              <Typography variant="h4" sx={{ textAlign: 'center' }}>{ stats.deltaScore }</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <p>Total games: {stats.gamesTotal}</p>
      { getStatBar(stats.alfaGames, stats.deltaGames, stats.alfaGamesPercent, stats.deltaGamesPercent)}
      <p>Total score: {stats.scoreTotal}</p>
      { getStatBar(stats.alfaScore, stats.deltaScore, stats.alfaScorePercent, stats.deltaScorePercent)}

      <p>Sessions: { stats.sessions.length}. Games per session: ±{stats.gamesPerSession}</p>

      <HighchartsReact
        highcharts={Highcharts}
        options={{
          legend: {
            enabled: false,
          },
          chart: {
            height: 150,
          },
          title: {
            text: '',
          },
          series: [{
            name: '',
            data: stats.sessions,
          }],
          yAxis: {
            title: {
              enabled: false,
            }
          },
          xAxis: {
            labels: {
              enabled: false
            }
          }
        }}
      />
    </div>
  );
}

export default HomeComponent;