import moment from 'moment';
import { GameLog } from "./types";
import { PlayerID, playersData } from "./static";

const random = (min: number = 0, max: number = 99): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const emulateMatch = (p1: PlayerID, p2: PlayerID) => {
  const skill1 = random(playersData[p1].min, playersData[p1].max);
  const skill2 = random(playersData[p2].min, playersData[p2].max);

  let s1 = 0;
  let s2 = 0;
  while ((s1 < 11 && s2 < 11) || (Math.abs(s1 - s2) < 2)) {
    const dice1 = random(0, skill1);
    const dice2 = random(0, skill2);
    if (dice1 === dice2) {
      continue;
    }
    if (dice1 > dice2) {
      s1++;
    } else {
      s2++;
    }
  }
  return [
    s1,
    s2,
  ]
}

export const generateGames = (numGames: number = 150): GameLog[] => {
  const playerIds = Object.values(PlayerID);
  const shuffledPlayers = shuffleArray(playerIds);
  const gameLogs: GameLog[] = [];

  let gamesPerDay = random(20, 25);
  let date = moment('17-11-2023', 'DD-MM-YYYY');
  let playedToday = 0;

  for (let i = 0; i < numGames; i++) {
    const p1 = shuffledPlayers[i % playerIds.length];
    const p2 = shuffledPlayers[(i + 1) % playerIds.length];
    const score = emulateMatch(p1, p2);
    const gameLog: GameLog = {
      date: moment(date).format('DD-MM-YYYY'),
      p1: {
        id: p1,
        score: score[0],
      },
      p2: {
        id: p2,
        score: score[1],
      },
      winner: score[0] > score[1] ? p1 : p2,
    };

    gameLogs.push(gameLog);
    playedToday++;

    if (playedToday >= gamesPerDay) {
      date.add(7, 'days');
      gamesPerDay = random(20, 25);
      playedToday = 0;
    }
  }

  return gameLogs;
}