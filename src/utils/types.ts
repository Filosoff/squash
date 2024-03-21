import { Players } from "./statics";

export type Score = number;
export type Date = string;

export type Game = {
  date: Date;
  winner: Players;
  score: {
    win: Score;
    lose: Score;
  }
}