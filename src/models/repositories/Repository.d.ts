import { ILeague } from "../League.ts";

export interface IRepository {
    league: ILeague;
    getClasificationData: () => any;
    getMatchesData: () => any;
    getStatsData: () => any;
    getPlayersData: () => Promise<Array<IPlayerData>>;
    getLeagueData: () => Promise<ILeagueData>;

export interface ILeagueData {
    id: string;
    name: string;
    description: string;
    days: Array<IDay>;
    players: Array<IPlayerData>;
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
