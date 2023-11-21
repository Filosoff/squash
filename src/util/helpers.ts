import _ from 'lodash';
import { PlayerID, playersData } from "./static";
import { BasicRating, EloRatings, GameLog, PlayerStats } from "./types";

const getInitialRatings = (): EloRatings => Object.values(PlayerID).reduce((acc, id) => {
  acc[id] = [1200];
  return acc;
}, {} as EloRatings);

export const IdToName = (id: PlayerID) => playersData[id].name;

const calculateMean = (numbers: number[]): number => {
  if (numbers.length === 0) {
    return 0;
  }

  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};

/// ratings

const calculateEloRating = (playerRating: number, opponentRating: number, plrWon: boolean): number => {
  const K_FACTOR = 16;
  const expectedOutcome = 1 / (1 + 10 ** ((opponentRating - playerRating) / 400));
  const ratingChange = K_FACTOR * (+plrWon - expectedOutcome);
  return Math.round(playerRating + ratingChange);
};

export const getEloRatings = (games: GameLog[]): EloRatings => {
  const updatedRatings: EloRatings = getInitialRatings();

  games.forEach((game) => {
    const playerRating = updatedRatings[game.p1.id].slice(-1)[0];
    const opponentRating = updatedRatings[game.p2.id].slice(-1)[0];
    const plrWon = game.p1.id === game.winner;

    updatedRatings[game.p1.id].push(calculateEloRating(playerRating, opponentRating, plrWon));
    updatedRatings[game.p2.id].push(calculateEloRating(opponentRating, playerRating, !plrWon));
  });

  return updatedRatings;
};

export const eloToBasicRating = (elo: EloRatings): BasicRating[] => {
  const unsorted = _.map(elo, (ratings, id) => ({ name: IdToName(id as PlayerID), value: ratings.slice(-1)[0] }));
  return _.orderBy(unsorted, 'value', 'desc');
}


// stats

export const getGamesPerId = (id: PlayerID, games: GameLog[]) => games.filter(game => (game.p1.id === id || game.p2.id === id));

export const getPlayerStats = (id: PlayerID, games: GameLog[]): PlayerStats => {
  let curStreak = 0;
  const points: number[] = [];

  const participated = getGamesPerId(id, games);
  const stats: PlayerStats = {
    id,
    name: IdToName(id),
    plays: 0,
    wins: 0,
    loss: 0,
    winsPercent: 0,
    lossPercent: 0,
    ratio: 0,
    streak: 0,
    avgPoints: 0,
  }

  participated.forEach(game => {
    stats.plays++;
    points.push(game.p1.id === id ? game.p1.score : game.p2.score);
    if (game.winner === id) {
      stats.wins++;
      curStreak++;
    } else {
      stats.streak = Math.max(stats.streak, curStreak);
      curStreak = 0;
      stats.loss++;
    }
  });

  stats.streak = Math.max(stats.streak, curStreak);
  stats.winsPercent = stats.wins / stats.plays * 100;
  stats.lossPercent = stats.loss / stats.plays * 100;
  stats.ratio = stats.wins / stats.loss;
  stats.avgPoints = calculateMean(points);

  return stats;
}

export const getAllPlayersStats = (games: GameLog[]) => Object.values(PlayerID).map(id => getPlayerStats(id, games));
export const ratePlayersByField = (allStats: PlayerStats[], field: keyof PlayerStats): BasicRating[] => {
  const stats = allStats.map(stats => ({ name: stats.name, value: stats[field] }));
  return _.orderBy(stats, 'value', 'desc');
}

export const getGamesPerDate = (date: string, log: GameLog[]) => {
  const games = log.filter(g => g.date === date);
  const all = getAllPlayersStats(games);
  const byWin = ratePlayersByField(all, 'wins');
  const byStreak = ratePlayersByField(all, 'streak');
  const stats = {
    games: games.length,
    wins: `${byWin[0].name} (${byWin[0].value})`,
    streak: `${byStreak[0].name} (${byStreak[0].value})`,
    byWin: byWin,
  }
  return stats;
}