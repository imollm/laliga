import type { IDay } from "@/models/Day.ts";
import type { IMatch } from "@/models/Match.ts";
import type { IPlayer } from "@/models/Player.ts";

export interface ILeague {
    name: string;
    description: string;
    days: Array<IDay>;
    players: Array<IPlayer>;
    getName: () => string;
    setDay: (day: IDay) => void;
    getDay: (id: string) => IDay | undefined;
    getDays: () => Array<IDay>;
    getPlayers: () => Array<IPlayer>;
    getPlayer: (id: string) => IPlayer | undefined;
    setPlayer: (player: IPlayer) => void;
    getPlayerByName: (name: string) => IPlayer | undefined;
    getMatchesByPlayerId: (id: string) => Array<IMatch>;
    toJSON: () => any;
  }

export class League implements ILeague {
    name: string;
    description: string;
    days: Array<IDay>;
    players: Array<IPlayer>;

    constructor() {
        this.name = `La Liga Connecta Balear ${new Date().getFullYear()}`;
        this.description = 'Liga de padel en Menorca';
        this.days = new Array<IDay>();
        this.players = new Array<IPlayer>();
    }

    getName = (): string => {
        return this.name;
    }

    setDay = (day: IDay): void => {
        this.days.push(day);
    }

    getDay = (id: string): IDay | undefined => {
        return this.days.find((day: IDay) => day.id === id);
    }

    getDays = (): Array<IDay> => {
        return this.days;
    }

    getPlayers = (): Array<IPlayer> => {
        return this.players;
    }

    getPlayer = (id: string): IPlayer | undefined => {
        return this.players.find((player: IPlayer) => player.id === id);
    }

    setPlayer = (player: IPlayer): void => {
        if (this.players.find((p: IPlayer) => p.id === player.id)) {
            this.players = this.players.filter((p: IPlayer) => p.id !== player.id);
        }

        this.players.push(player);
    }

    getPlayerByName = (name: string): IPlayer | undefined => {
        return this.players.find((player: IPlayer) => player.name.toLowerCase() === name.toLowerCase());
    }

    getMatchesByPlayerId = (id: string): Array<IMatch> => {
        const matchesFound: Array<IMatch> = new Array<IMatch>();

        this.days.forEach((day: IDay) => {
            const match: IMatch = day.getRound().getMatch();
            const players: Array<IPlayer> = match.getLocalTeam().getPlayers();

            if (players?.find((player: IPlayer) => player.id === id)) {
                matchesFound.push(match);
            }
        });

        return matchesFound;
    }

    toJSON = (): any => {
        return {
            name: this.name,
            description: this.description,
            days: this.days.map((day: IDay) => day.toJSON()),
            players: this.players.map((player: IPlayer) => player.toJSON())
        };
    }
}