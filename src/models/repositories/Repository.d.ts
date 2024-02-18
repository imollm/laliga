import { ILeague } from "../League.ts";

export interface IRepository {
    league: ILeague | undefined;
    getClasificationData: () => any;
    getMatchesData: () => any;
    getStatsData: () => any;
    getPlayersData: () => Promise<Array<IPlayerData>>;
}

export interface IPlayerData {
    id: string;
    name: string;
    position: string;
    matchesPlayed: number;
    matchesWon: number;
    matchesLost: number;
    setsWon: number;
    setsLost: number;
    gamesWon: number;
    isMVP: boolean;
}
