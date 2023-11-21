import { PlayerID } from "./static";
import { Moment } from "moment";

export type Theme = 'dark' | 'light';

export type DrawerOptions = { label: string; value: any; }

export type GroupedGames = { [date: string]: GameLog[] };
export type EloRatings = { [playerId in PlayerID]: number[] };
export type BasicRating = { name: string, value: number | string };

export type PlayerStats = {
  id: PlayerID;
  name: string;
  plays: number;
  wins: number;
  loss: number;
  winsPercent: number;
  lossPercent: number;
  ratio: number;
  streak: number;
  avgPoints: number;
}

export type PlayersData = {
  [key in PlayerID]: {
    id: PlayerID;
    name: string;
    skill: number;
    min?: number;
    max?: number;
  }
}

export interface GameLogPlr {
  id: PlayerID;
  score: number;
}

export interface GameLog {
  date: string;
  p1: GameLogPlr;
  p2: GameLogPlr;
  winner: PlayerID;
}