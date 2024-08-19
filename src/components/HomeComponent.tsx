import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import getStats from "../utils/getStats";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { useReadLocalStorage } from "usehooks-ts";

const alfaColor = '#ffaaaa';
const betaColor = '#8ab2ff';

const HomeComponent = () => {
  const alfaName = useReadLocalStorage("alfaName") as string;
  const betaName = useReadLocalStorage("betaName") as string;
  const stats = getStats();

  if (!stats) {
    return <div>No data</div>
  }

  const getStatBar = (v1: number, v2: number, v1p: number, v2p: number) => {
    const getBar = (value: number, percent: number, color: string, align: any = 'left') => <div style={{ width: `${percent}%`, background: color, padding: '0 4px', textAlign: align }}>{value}</div>
    return (
      <div style={{ display: 'flex', width: '100%', height: '24px', color: 'white' }}>
        { getBar(v1, v1p, v1 >= v2 ? alfaColor : betaColor) }
        { getBar(v2, v2p, v1 < v2 ? alfaColor : betaColor, 'right') }
      </div>
    )
  }

  return (
    <div>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid xs={6}>
          <Typography variant="h4" sx={{ textAlign: 'left', mb: 1, color: alfaColor }}>{ alfaName }</Typography>
          <Card variant="outlined" sx={{ background: alfaColor, color: '#fff' }}>
            <CardContent>
              <Typography variant="h3" sx={{ textAlign: 'center' }}>{ stats.alfaGames }</Typography>
              <Typography variant="h5" sx={{ textAlign: 'center' }}>{ stats.alfaScore }</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={6} sx={{ color: betaColor }}>
          <Typography variant="h4" sx={{ textAlign: 'right', mb: 1 }}>{ betaName }</Typography>
          <Card variant="outlined" sx={{ background: betaColor, color: '#fff' }}>
            <CardContent>
              <Typography variant="h3" sx={{ textAlign: 'center' }}>{ stats.betaGames }</Typography>
              <Typography variant="h5" sx={{ textAlign: 'center' }}>{ stats.betaScore }</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <HighchartsReact
        highcharts={Highcharts}
        options={{
          legend: {
            enabled: false,
          },
          chart: {
            height: 140,
            type: 'spline',
          },
          title: {
            text: '',
          },
          series: [{
            name: alfaName,
            data: stats.alfaScoreLog.slice(-20),
            color: alfaColor,
            marker: { enabled: false },
          },{
            name: betaName,
            data: stats.betaScoreLog.slice(-20),
            color: betaColor,
            marker: { enabled: false },
          }],
          yAxis: {
            title: {
              enabled: false,
            },
            tickAmount: 6,
          },
          xAxis: {
            labels: {
              enabled: false
            }
          }
        }}
      />

      <Divider sx={{ my: 2}}>Total games: {stats.gamesTotal}</Divider>
      { getStatBar(stats.alfaGames, stats.betaGames, stats.alfaRateGames, stats.betaRateGames)}
      <Divider sx={{ my: 2}}>Total score: {stats.scoreTotal}</Divider>
      { getStatBar(stats.alfaScore, stats.betaScore, stats.alfaRateScore, stats.betaRateScore)}
      <Divider sx={{ my: 2 }}>Sessions: { stats.sessionsTotal}. Games per session: ±{stats.gamesPerSession.toFixed(1)}</Divider>

      <HighchartsReact
        highcharts={Highcharts}
        options={{
          legend: {
            enabled: false,
          },
          chart: {
            height: 100,
          },
          title: {
            text: '',
          },
          series: [{
            name: 'Games played',
            data: stats.sessionsLengthLog,
            color: '#8d9db6',
          }],
          yAxis: {
            title: {
              enabled: false,
            },
            tickAmount: 5,
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