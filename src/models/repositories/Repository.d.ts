import type { IDay } from "../Day.ts";
import { ILeague } from "../League.ts";

export interface IRepository {
    league: ILeague;
    getClasificationData: () => any;
    getMatchesData: () => any;
    getStatsData: () => any;
    getPlayersData: () => Promise<Array<IPlayerData>>;
    getPlayerData: (id: string) => Promise<IPlayerData>;
    getLeagueData: () => Promise<ILeagueData>;
    setMVP: (id: string) => void;
}

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

type IPlayerStatsValues = {
    count: number;
    percentage: number;
    percentageLabel: string;
};

type IPLayerStats = {
    won: IPlayerStatsValues;
    lost: IPlayerStatsValues;
    matchCount: number;
}

type IPlayerMatchStats = {
    colleague: IPlayerData;
    matches: IPLayerStats;
};

type IPlayerSetStats = {
    colleague: IPlayerData;
    sets: IPLayerStats;
};

type IPlayerGameStats = {
    colleague: IPlayerData;
    games: IPLayerStats;
};

export interface IPlayerStats extends IPlayerData {
    stats: {
        matches: Array<IPlayerMatchStats>;
        sets: Array<IPlayerSetStats>;
        games: Array<IPlayerGameStats>;
    }
}
