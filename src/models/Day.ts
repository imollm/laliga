import { randomUUID } from "node:crypto";
import { IRound } from "./Round.ts";

export interface IDay {
    id: string;
    description: string;
    rounds: Array<IRound> | undefined;
    getDescription: () => string;
    setRound: (round: IRound) => void;
    getRound: (id: string) => IRound | undefined;
    getRounds: () => Array<IRound>;
}

export class Day implements IDay {
    id: string;
    description: string;
    rounds: Array<IRound> | undefined;

    constructor(description: string) {
        this.id = randomUUID();
        this.description = description;
        this.rounds = new Array<IRound>();
    }

    getDescription = (): string => {
        return this.description;
    }

    setRound = (round: IRound): void => {
        this.rounds?.push(round);
    }

    getRound = (id: string): IRound | undefined => {
        return this.rounds?.find(round => round.id === id);
    }

    getRounds = (): Array<IRound> => {
        return this.rounds || [];
    }
}
