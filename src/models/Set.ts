import { randomUUID } from "node:crypto";

export interface ISet {
  id: string;
  games: number;
  getGames: () => number;
  setGames: (games: number) => void;
}

export class SetGame implements ISet {
  id: string;
  games: number;

  constructor(games: number) {
    this.id = randomUUID();
    this.games = games;
  }

  getGames = (): number => {
    return this.games;
  };

  setGames = (games: number): void => {
    this.games = games;
  };
}
