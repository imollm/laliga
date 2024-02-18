import { randomUUID } from 'node:crypto';
import { IMatch } from './Match.ts';

export interface IRound {
    id: string;
    name: string;
    matches: Array<IMatch>;
    rival: string;
    getId: () => string;
    getName: () => string;
    getMatches: () => Array<IMatch>;
    getMatch: (id: number) => IMatch | undefined;
    setMatch: (match: IMatch) => void;
    getRival: () => string;
    setRival: (rival: string) => void;
}

export class Round implements IRound {
    id: string;
    name: string;
    matches: Array<IMatch>;
    rival: string;

    constructor(name: string, rival: string) {
        this.id = randomUUID();
        this.name = name;
        this.matches = new Array<IMatch>();
        this.rival = rival;
    }

    getId = (): string => {
        return this.id;
    }

    getName = (): string => {
        return this.name;
    }
    
    getMatches = (): Array<IMatch> => {
        return this.matches;
    }

    getMatch = (id: number): IMatch | undefined => {
        return this.matches.find(match => match.id === id);
    }

    setMatch = (match: IMatch): void => {
        this.matches.push(match);
    }

    getRival = (): string => {
        return this.rival;
    }

    setRival = (rival: string): void => {
        this.rival = rival;
    }
}