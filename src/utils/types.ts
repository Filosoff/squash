import { Players } from "./statics";

export type Score = number;
export type Date = string;

export type Game = [number, number];
export type GameHistory = { [date: string]: Game[] }
