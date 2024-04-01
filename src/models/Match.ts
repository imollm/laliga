import { type ITeam, Team } from "@/models/Team.ts";

export interface IMatch {
  id: number;
  localTeam: ITeam;
  rivalTeam: ITeam;
  getId: () => number;
  getLocalTeam: () => ITeam;
  setLocalTeam: (team: ITeam) => void;
  getRivalTeam: () => ITeam;
  setRivalTeam: (team: ITeam) => void;
  isItWon: () => boolean;
  isSetWon: (setNumber: number) => boolean;
  toJSON: () => any;
}

export class Match implements IMatch {
  id: number;
  localTeam: ITeam;
  rivalTeam: ITeam;

  constructor(id: number, rivalName: string) {
    this.id = id;
    this.localTeam = new Team("Panxes Rotges");
    this.rivalTeam = new Team(rivalName);
  }

  getId = (): number => {
    return this.id;
  }

  getLocalTeam = (): ITeam => {
    return this.localTeam;
  };

  setLocalTeam = (team: ITeam): void => {
    this.localTeam = team;
  };

  getRivalTeam = (): ITeam => {
    return this.rivalTeam;
  };

  setRivalTeam = (team: ITeam): void => {
    this.rivalTeam = team;
  };

  isItWon = (): boolean => {
    let localCount = 0;
    let rivalCount = 0;

    for (let i = 0; i < 3; i++) {
      const localSetGames = this.localTeam.getSets().at(i)?.getGames();
      const rivalSetGames = this.rivalTeam.getSets().at(i)?.getGames();

      if (localSetGames && rivalSetGames && localSetGames > rivalSetGames) {
        localCount++;
      } else if (localSetGames && rivalSetGames && localSetGames < rivalSetGames) {
        rivalCount++;
      }
    }

    const isItWon = localCount > rivalCount;

    return isItWon;
  }

  isSetWon = (setNumber: number): boolean => {
    const localSetGames = this.localTeam.getSets().at(setNumber)?.getGames();
    const rivalSetGames = this.rivalTeam.getSets().at(setNumber)?.getGames();

    if (localSetGames && rivalSetGames && localSetGames > rivalSetGames) {
      return true;
    }

    return false;
  }

  toJSON = (): any => {
    return {
      id: this.id,
      localTeam: this.localTeam.toJSON(),
      rivalTeam: this.rivalTeam.toJSON()
    }
  }
}
