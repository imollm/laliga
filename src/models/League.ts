import { IDay } from "./Day.ts";
import { IPlayer } from "./Player.ts";

export interface ILeague {
    name: string;
    description: string;
    days: Array<IDay>;
    players: Array<IPlayer>;
    setDay: (day: IDay) => void;
    getDay: (id: string) => IDay | undefined;
    getDays: () => Array<IDay>;
    getPlayers: () => Array<IPlayer>;
    getPlayer: (id: string) => IPlayer | undefined;
    setPlayer: (player: IPlayer) => void;
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
}