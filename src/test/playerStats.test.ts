import type { IPlayer } from "@/models/Player.ts";
import { beforeAll, describe, test } from "vitest";

// This tests will test the player Ivan Moll's match stats for the first three days of the tournament

import statsJson from "./playerStats.json";
import type { IPlayerMatchStats } from "@/types/index.ts";
const playerId = "c153e48f-1b8d-4bfa-91a3-c9b36ba48502"; // Ivan Moll
let allPlayers: Array<IPlayerMatchStats> = [];

// beforeAll(() => {
//     allPlayers = statsJson.stats.matches.map((matchStats: IPlayerMatchStats) => matchStats.colleague);
// });

describe("Player Stats", () => {
    test("should return the player's stats", () => {
        // ...
    });
    
    test("should return the player's stats", () => {
        // ...
    });
});