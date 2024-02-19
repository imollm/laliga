import { randomUUID } from "node:crypto";

export interface ISet {
  id: string;
  games: number | undefined;
  getGames: () => number | undefined;
  setGames: (games: number | undefined) => void;
  toJSON: () => any;
}

export class SetGame implements ISet {
  id: string;
  games: number | undefined;

  constructor(games: number | undefined = undefined) {
    this.id = randomUUID();
    this.games = games;
  }

  getGames = (): number | undefined => {
    return this.games;
  };

  setGames = (games: number | undefined): void => {
    this.games = games;
  };

  toJSON = (): any => {
    return {
      id: this.id,
      games: this.games,
    };
  };
}
