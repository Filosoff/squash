import { Players } from "./statics";
import { GameHistory } from "./types";

const getWinnerScore = (loserScore: number) => Math.max(11, loserScore + 2);

const getStats = () => {
  let games: GameHistory;
  try {
    games = JSON.parse(localStorage.getItem("games") || "{}");
  } catch {
    games = {};
  }
  const stats = {
    sessionsTotal: 0,
    gamesTotal: 0,
    gamesPerSession: 0,
    scoreTotal: 0,
    alfaGames: 0,
    alfaScore: 0,
    alfaRateGames: 0,
    alfaRateScore: 0,
    betaGames: 0,
    betaScore: 0,
    betaRateGames: 0,
    betaRateScore: 0,
    alfaScoreLog: [] as number[],
    betaScoreLog: [] as number[],
    sessionsLengthLog: [] as number[],
  }

  if (!Object.keys(games).length) {
    return stats;
  }

  stats.sessionsTotal = Object.keys(games).length;
  for (const [date, log] of Object.entries(games)) {
    stats.sessionsLengthLog.push(log.length);
    log.forEach(g => {
      stats.gamesTotal++;
      const loserScore = g[1];
      const winnerScore = getWinnerScore(loserScore);
      if (g[0] === Players.alfa) {
        stats.alfaScore += winnerScore;
        stats.betaScore += loserScore;
        stats.alfaGames++;
        stats.alfaScoreLog.push(winnerScore);
        stats.betaScoreLog.push(loserScore);
      } else {
        stats.alfaScore += loserScore;
        stats.betaScore += winnerScore;
        stats.betaGames++;
        stats.alfaScoreLog.push(loserScore);
        stats.betaScoreLog.push(winnerScore);
      }
    });
  }

  stats.scoreTotal = stats.alfaScore + stats.betaScore;
  stats.alfaRateGames = (stats.alfaGames / stats.gamesTotal) * 100;
  stats.betaRateGames = (stats.betaGames / stats.gamesTotal) * 100;
  stats.alfaRateScore = (stats.alfaScore / stats.scoreTotal) * 100;
  stats.betaRateScore = (stats.betaScore / stats.scoreTotal) * 100;

  stats.gamesPerSession = stats.sessionsLengthLog.reduce((a, b) => a + b, 0) / stats.sessionsLengthLog.length;

  return stats;
}



export default getStats;