import type { IDay } from "@/models/Day.ts";

const MenuOptions = ['players', 'clasification', 'matches', 'stats'] as const;

export type MenuOption = (typeof MenuOptions)[number];

export interface IMenu {
  id: MenuOption;
  name: string;
}

export type IPlayerData = {
  id: string;
  name: string;
  position: 'reves' | 'drive' | string;
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
  setsWon: number;
  setsLost: number;
  gamesWon: number;
  isMVP: boolean;
}

export type IPlayerStatsValues = {
  count: number;
  percentage: number;
  percentageLabel: string;
};

export type IPLayerStats = {
  won: IPlayerStatsValues;
  lost: IPlayerStatsValues;
  matchCount: number;
}

export type IPlayerMatchStats = {
  colleague: IPlayerData;
  matches: IPLayerStats;
};

export type IPlayerSetStats = {
  colleague: IPlayerData;
  sets: IPLayerStats;
};

export type IPlayerGameStats = {
  colleague: IPlayerData;
  games: IPLayerStats;
};

export type IPlayerStats = IPlayerData & {
  stats: {
      matches: Array<IPlayerMatchStats>;
      sets: Array<IPlayerSetStats>;
      games: Array<IPlayerGameStats>;
  }
}

export interface ILeagueData {
  id: string;
  name: string;
  description: string;
  days: Array<IDay>;
  players: Array<IPlayerData>;
}

export type IChartData = {
  labels: Array<string>;
  datasets: Array<{
    fill?: boolean;
    label: string;
    data: Array<number>;
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }>;
};
