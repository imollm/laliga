import { create } from "zustand";
import { IPlayersData, MenuOption } from "../types/index.js";
import { IStore } from '../types/index.js';

const useStore = create<IStore>((set: any, get: any) => ({
  optionChoosed: 'players',
  setOptionChoosed: (option: MenuOption) => set({ optionChoosed: option }),
  playersData: [] as Array<IPlayersData>,
  fetchPlayersData: async () => {
    if (get().playersData.length === 0) {
      try {
        const playersData = await fetch('/players.json');
        set({ playersData: await playersData.json() });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
}));

export default useStore;
