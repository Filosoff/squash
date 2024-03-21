import { Players } from "./statics";
import { Game } from "./types";

const getStats = () => {
  const games: Game[] = JSON.parse(localStorage.getItem("games")!) || [];

  if (!games.length) {
    return false;
  }
  const alfaGames = games.filter(g => g.winner === Players.alfa);
  const deltaGames = games.filter(g => g.winner === Players.delta);

  const calcScore = (player: Players) => {
    let score = 0;
    games.forEach(game => {
      const s = game.winner === player ? game.score.win : game.score.lose;
      score += s;
    });
    return score;
  }

  const result: any = {
    gamesTotal: games.length,
    scoreTotal: games.reduce((acc: number, game) => {
      acc += game.score.win;
      acc += game.score.lose;
      return acc;
    }, 0),
    alfaGames: alfaGames.length,
    deltaGames: deltaGames.length,
  };

  result.alfaScore = calcScore(Players.alfa);
  result.deltaScore = calcScore(Players.delta);

  result.alfaGamesPercent = Math.round(alfaGames.length / games.length * 100);
  result.alfaScorePercent = Math.round(result.alfaScore / result.scoreTotal * 100);
  result.deltaGamesPercent = 100 - result.alfaGamesPercent;
  result.deltaScorePercent = 100 - result.alfaScorePercent;

  const groupedByDate: Record<string, number[]> = Object.groupBy(games, g => g.date);
  result.sessions = Object.values(groupedByDate).map(games => games.length);
  result.gamesPerSession = Math.round(result.gamesTotal / result.sessions.length);

  return result;
}



export default getStats;