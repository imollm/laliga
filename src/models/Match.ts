import { ITeam, Team } from "./Team.ts";

export interface IMatch {
  id: number;
  localTeam: ITeam;
  rivalTeam: ITeam;
  getLocalTeam: () => ITeam;
  setLocalTeam: (team: ITeam) => void;
  getRivalTeam: () => ITeam;
  setRivalTeam: (team: ITeam) => void;
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
}
