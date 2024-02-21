import type { ILeagueData, IPlayerData } from "@/types/index.ts";
import { ILeague } from "@/models/League.ts";

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
