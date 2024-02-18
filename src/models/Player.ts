import type { IPlayerData } from "./repositories/Repository.ts";

export type Position = "drive" | "reves";

export interface IPlayer extends IPlayerData {
    id: string;
    name: string;
    position: Position;
    matchesPlayed: number;
    matchesWon: number;
    matchesLost: number;
    setsWon: number;
    setsLost: number;
    gamesWon: number;
    isMVP: boolean;
    getId: () => string;
    setId: (value: string) => void;
    getName: () => string;
    setName: (value: string) => void;
    getPosition: () => Position;
    setPosition: (value: Position) => void;
    getMatchesPlayed: () => number;
    incrementMatchesPlayed: () => void;
    getMatchesWon: () => number;
    incrementMatchesWon: () => void;
    getMatchesLost: () => number;
    incrementMatchesLost: () => void;
    getSetsWon: () => number;
    incrementSetsWon: () => void;
    getSetsLost: () => number;
    incrementSetsLost: () => void;
    getGamesWon: () => number;
    setGamesWon: (games: number) => void;
    setIsMVP: (value: boolean) => void;
    getIsMVP: () => boolean;
    toJSON: () => IPlayerData;
}   

class Player implements IPlayer {
    id: string;
    name: string;
    position: Position;
    matchesPlayed: number;
    matchesWon: number;
    matchesLost: number;
    setsWon: number;
    setsLost: number;
    gamesWon: number;
    isMVP: boolean;
    
    constructor(id: string, name: string, position: Position) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.matchesPlayed = 0;
        this.matchesWon = 0;
        this.matchesLost = 0;
        this.setsWon = 0;
        this.setsLost = 0;
        this.gamesWon = 0;
        this.isMVP = false;
    }

    getId(): string {
        return this.id;
    }

    setId(value: string) {
        this.id = value;
    }

    getName(): string {
        return this.name;
    }

    setName(value: string) {
        this.name = value;
    }

    getPosition(): Position {
        return this.position;
    }

    setPosition(value: Position) {
        this.position = value;
    }

    getMatchesPlayed(): number {
        return this.matchesPlayed;
    }

    incrementMatchesPlayed() {
        this.matchesPlayed = this.getMatchesPlayed() + 1;
    }

    getMatchesWon(): number {
        return this.matchesWon;
    }

    incrementMatchesWon() {
        this.matchesWon = this.getMatchesWon() + 1;
    }

    getMatchesLost(): number {
        return this.matchesLost;
    }

    incrementMatchesLost() {
        this.matchesLost = this.getMatchesLost() + 1;
    }

    getSetsWon(): number {
        return this.setsWon;
    }

    incrementSetsWon() {
        this.setsWon = this.getSetsWon() + 1;
    }

    getSetsLost(): number {
        return this.setsLost;
    }

    incrementSetsLost() {
        this.setsLost = this.getSetsLost() + 1;
    }

    getGamesWon(): number {
        return this.gamesWon;
    }

    setGamesWon(games: number) {
        this.gamesWon = this.getGamesWon() + games;
    }

    setIsMVP(value: boolean) {
        this.isMVP = value;
    }

    getIsMVP(): boolean {
        return this.isMVP;
    }

    toJSON = (): IPlayerData => {
        return {
            id: this.id,
            name: this.name,
            position: this.position,
            matchesPlayed: this.matchesPlayed,
            matchesWon: this.matchesWon,
            matchesLost: this.matchesLost,
            setsWon: this.setsWon,
            setsLost: this.setsLost,
            gamesWon: this.gamesWon,
            isMVP: this.isMVP
        }
    }
}

export default Player;
