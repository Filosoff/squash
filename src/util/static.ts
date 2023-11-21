import { PlayersData } from "./types";
import React from "react";
import { generateGames } from "./mock";

export enum PlayerID {
  AC = 'AC',
  AS = 'AS',
  SK = 'SK',
  KS = 'LS',
  DB = 'DB',
}

export const playersData: PlayersData = {
  [PlayerID.AC]: {
    id: PlayerID.AC,
    min: 75,
    max: 95,
    skill: 100,
    name: 'Винни-пух',
  },
  [PlayerID.AS]: {
    id: PlayerID.AS,
    min: 80,
    max: 90,
    skill: 80,
    name: 'Пятачок',
  },
  [PlayerID.SK]: {
    id: PlayerID.SK,
    min: 60,
    max: 90,
    skill: 60,
    name: 'Балбес',
  },
  [PlayerID.KS]: {
    id: PlayerID.KS,
    min: 50,
    max: 100,
    skill: 40,
    name: 'Буратино',
  },
  [PlayerID.DB]: {
    id: PlayerID.DB,
    skill: 40,
    min: 60,
    max: 70,
    name: 'Лохматый',
  },
}

export const GlobalContext = React.createContext({
  gamesLog: generateGames(),
});