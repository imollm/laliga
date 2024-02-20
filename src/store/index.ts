import { create } from "zustand";
import type { IPlayerData, MenuOption } from "../types/index.js";

export type IStore = {
  optionChoosed: MenuOption;
  setOptionChoosed: (option: MenuOption) => void;
  playersData: Array<IPlayerData>;
  fetchPlayersData: () => void;
  playerData: IPlayerData;
  fetchPlayerData: (id: string) => void;
}

const useStore = create<IStore>((set: any, get: any) => ({
  optionChoosed: 'players',
  setOptionChoosed: (option: MenuOption) => set({ optionChoosed: option }),
  playersData: [] as Array<IPlayerData>,
  fetchPlayersData: async () => {
    if (get().playersData.length === 0) {
      try {
        const data = await fetch('/players.json');
        set({ playersData: await data.json() });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  },
  playerData: {} as IPlayerData,
  fetchPlayerData: async (id: string) => {
    try {
      const data = await fetch(`/players/${id}.json`);
      set({ playerData: await data.json() });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}));

export default useStore;
