import { randomUUID } from "node:crypto";
import type { IRound } from "@/models/Round.ts";

export interface IDay {
    id: string;
    description: string;
    round: IRound;
    getId: () => string;
    getDescription: () => string;
    setRound: (round: IRound) => void;
    getRound: () => IRound;
    toJSON: () => any;
}

export class Day implements IDay {
    id: string;
    description: string;
    round: IRound;

    constructor(description: string) {
        this.id = randomUUID();
        this.description = description;
        this.round = {} as IRound;
    }

    getId = (): string => {
        return this.id;
    }

    getDescription = (): string => {
        return this.description;
    }

    setRound = (round: IRound): void => {
        this.round = round;
    }

    getRound = (): IRound => {
        return this.round;
    }

    toJSON = (): any => {
        return {
            id: this.id,
            description: this.description,
            round: this.round?.toJSON(),
        }
    }
}
