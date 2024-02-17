import { randomUUID } from "node:crypto";
import { ISet, SetGame } from "./Set.ts";
import Player from "./Player.ts";

export interface ITeam {
    id: string;
    name: string;
    players: Array<Player> | undefined;
    getPlayers: () => Array<string>;
    setPlayers: (players: Array<Player>) => void;
    getSets: () => Array<ISet>;
    getFirstSet: () => ISet;
    getSecondSet: () => ISet;
    getThirdSet: () => ISet;
    setGamesFirstSet: (games: number) => void;
    setGamesSecondSet: (games: number) => void;
    setGamesThirdSet: (games: number) => void;
}

export class Team implements ITeam {
    id: string;
    name: string;
    players: Array<Player> | undefined;
    sets: Array<ISet>;

    constructor(name: string) {
        this.id = randomUUID();
        this.name = name;
        this.players = new Array<Player>();
        this.sets = new Array<ISet>(
            new SetGame(0),
            new SetGame(0),
            new SetGame(0)
        );
    }

    getPlayers = (): Array<string> => {
        return this.players?.map(player => player.name) || [];
    }

    setPlayers = (players: Array<Player>): void => {
        this.players = players;
    }

    getSets = (): Array<ISet> => {
        return this.sets || [];
    }

    getFirstSet = (): ISet => {
        return this.sets?.[0];
    }

    getSecondSet = (): ISet => {
        return this.sets?.[1];
    }

    getThirdSet = (): ISet => {
        return this.sets?.[2];
    }

    setGamesFirstSet = (games: number): void => {
        this.sets?.[0].setGames(games);
    }

    setGamesSecondSet = (games: number): void => {
        this.sets?.[1].setGames(games);
    }

    setGamesThirdSet = (games: number): void => {
        this.sets?.[2].setGames(games);
    }
}