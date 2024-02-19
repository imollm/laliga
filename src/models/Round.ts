import { randomUUID } from 'node:crypto';
import type { IMatch } from './Match.ts';

export interface IRound {
    id: string;
    name: string;
    match: IMatch;
    rival: string;
    getId: () => string;
    getName: () => string;
    getMatch: () => IMatch;
    setMatch: (match: IMatch) => void;
    getRival: () => string;
    setRival: (rival: string) => void;
    toJSON: () => any;
}

export class Round implements IRound {
    id: string;
    name: string;
    match: IMatch;
    rival: string;

    constructor(name: string, rival: string) {
        this.id = randomUUID();
        this.name = name;
        this.match = {} as IMatch;
        this.rival = rival;
    }

    getId = (): string => {
        return this.id;
    }

    getName = (): string => {
        return this.name;
    }

    getMatch = (): IMatch => {
        return this.match;
    }

    setMatch = (match: IMatch): void => {
        this.match = match;
    }

    getRival = (): string => {
        return this.rival;
    }

    setRival = (rival: string): void => {
        this.rival = rival;
    }

    toJSON = (): any => {
        return {
            id: this.id,
            name: this.name,
            match: this.match.toJSON(),
            rival: this.rival
        }
    }
}