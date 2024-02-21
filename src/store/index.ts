import { create } from "zustand";
import type { IPlayerData, MenuOption } from "@/types/index.js";

export type IStore = {
  optionChoosed: MenuOption;
  setOptionChoosed: (option: MenuOption) => void;
  playersData: Array<IPlayerData>;
  fetchPlayersData: () => void;
  playerData: IPlayerData;
  fetchPlayerData: (id: string) => void;
}

const getPlayerDataFromLocalStorage = (): IPlayerData | undefined => {
  if (localStorage.getItem('playerData')) {
    return JSON.parse(localStorage.getItem('playerData') as string);
  }

  return undefined;
}

const setPlayerDataFromLocalStorage = (playerData: IPlayerData): void => {
  localStorage.setItem('playerData', JSON.stringify(playerData));
}

const removePlayerDataFromLocalStorage = (): void => {
  localStorage.removeItem('playerData');
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
    if (id !== getPlayerDataFromLocalStorage()?.id) {
      try {
        const data = await fetch(`/player/${id}.json`);
        const playerData = await data.json();

        removePlayerDataFromLocalStorage();
        setPlayerDataFromLocalStorage(playerData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    set({ playerData: getPlayerDataFromLocalStorage() as IPlayerData });
  }
}));

export default useStore;
