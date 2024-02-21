import { randomUUID } from "node:crypto";
import { type ISet, SetGame } from "@/models/Set.ts";
import Player from "@/models/Player.ts";

export interface ITeam {
    id: string;
    name: string;
    players: Array<Player>;
    sets: Array<ISet>;
    getId: () => string;
    getName: () => string;
    getPlayers: () => Array<Player>;
    setPlayers: (players: Array<Player>) => void;
    getSets: () => Array<ISet>;
    getFirstSet: () => ISet;
    getSecondSet: () => ISet;
    getThirdSet: () => ISet;
    setGamesFirstSet: (games: number) => void;
    setGamesSecondSet: (games: number) => void;
    setGamesThirdSet: (games: number) => void;
    getColleague: (player: Player) => Player;
    toJSON: () => any;
}

export class Team implements ITeam {
    id: string;
    name: string;
    players: Array<Player>;
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

    getId = (): string => {
        return this.id;
    }

    getName = (): string => {
        return this.name;
    }

    getPlayers = (): Array<Player> => {
        return this.players || [];
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

    setGamesThirdSet = (games: number | undefined): void => {
        this.sets?.[2].setGames(games || undefined);
    }

    getColleague = (player: Player): Player => {
        return this.players?.find(p => p.id !== player.id) || {} as Player;
    }

    toJSON = (): any => {
        return {
            id: this.id,
            name: this.name,
            players: this.players?.map(player => player.toJSON()),
            sets: this.sets?.map(set => set.toJSON())
        }
    }
}