const MenuOptions = ['players', 'clasification', 'matches', 'stats'] as const;

export type MenuOption = (typeof MenuOptions)[number];

export interface IMenu {
  id: MenuOption;
  name: string;
}

export type IPlayersData = {
  id: string;
  name: string;
  position: 'reves' | 'drive' | string;
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
  setsWon: number;
  setsLost: number;
  gamesWon: number;
};

export type IStore = {
  optionChoosed: MenuOption;
  setOptionChoosed: (option: MenuOption) => void;
  playersData: Array<IPlayersData>;
  fetchPlayersData: () => void;
}
