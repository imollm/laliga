import { expect, test, describe } from "vitest";
import NotionRepository, {
  type NotionResultArray,
} from "../models/repositories/NotionRepository.ts";
import * as localNotionDatabse from "./db.notion.json";
import type { IPlayerData } from "../models/repositories/Repository.js";
require("dotenv").config();

const notionRepository = new NotionRepository();

describe("NotionRepository tests", () => {
  describe("NotionRepository::getPlayersData", () => {
    test("should return non empty response body", async () => {
      notionRepository.results = localNotionDatabse.default
        .results as NotionResultArray;
      expect(typeof notionRepository.results).toBe("object");

      const response = await notionRepository.getPlayersData();
      expect(response).not.toBe(undefined);
      expect(response).not.toBe(null);
      expect(response).not.toBe("");
      expect(response).not.toBe({});
      expect(response).not.toBe([]);
      expect(typeof response).toBe("object");
    });

    test('should return a response body with a property named "results" with a length greater than 0', async () => {
      const response = await notionRepository.getPlayersData();
      expect(response.length).toBeGreaterThan(0);
    });

    test("should return a response body with an array of players and its data", async () => {
      const response = await notionRepository.getPlayersData();
      expect(response.length).toBeGreaterThan(0);
      for (let i = 0; i < response.length; i++) {
        expect(response[i]).toHaveProperty("id");
        expect(typeof response[i].id).toBe("string");
        expect(response[i]).toHaveProperty("name");
        expect(typeof response[i].name).toBe("string");
        expect(response[i]).toHaveProperty("position");
        expect(typeof response[i].position).toBe("string");
        expect(response[i]).toHaveProperty("matchesPlayed");
        expect(typeof response[i].matchesPlayed).toBe("number");
        expect(response[i]).toHaveProperty("matchesWon");
        expect(typeof response[i].matchesWon).toBe("number");
        expect(response[i]).toHaveProperty("matchesLost");
        expect(typeof response[i].matchesLost).toBe("number");
        expect(response[i]).toHaveProperty("setsWon");
        expect(typeof response[i].setsWon).toBe("number");
        expect(response[i]).toHaveProperty("setsLost");
        expect(typeof response[i].setsLost).toBe("number");
        expect(response[i]).toHaveProperty("gamesWon");
        expect(typeof response[i].gamesWon).toBe("number");
      }
    });

    test("should have a MVP player", async () => {
      const response = await notionRepository.getPlayersData();
      expect(response.length).toBeGreaterThan(0);
      for (let i = 0; i < response.length; i++) {
        expect(response[i]).toHaveProperty("isMVP");
        expect(typeof response[i].isMVP).toBe("boolean");
      }
      expect(
        response.filter((player: IPlayerData) => player.isMVP).length
      ).toBe(1);
    });
  });

  describe("NotionRepository::getLeagueData", () => {
    test("should return non empty response body", async () => {
      notionRepository.results = localNotionDatabse.default
        .results as NotionResultArray;
      expect(typeof notionRepository.results).toBe("object");

      const response = await notionRepository.getLeagueData();
      expect(response).not.toBe(undefined);
      expect(response).not.toBe(null);
      expect(response).not.toBe("");
      expect(response).not.toBe({});
      expect(response).not.toBe([]);
      expect(typeof response).toBe("object");
    });

    test("should return a league object with its data", async () => {
      notionRepository.results = localNotionDatabse.default.results as NotionResultArray;
      const response = await notionRepository.getLeagueData();

      expect(response).toHaveProperty("name");
      expect(typeof response.name).toBe("string");
      expect(response).toHaveProperty("description");
      expect(typeof response.description).toBe("string");
      expect(response).toHaveProperty("days");
      expect(response.days).toBeInstanceOf(Array);
      expect(response).toHaveProperty("players");
      expect(response.players).toBeInstanceOf(Array);
    });

    test("should return the same information for Day 1 as Notion's database", async () => {
        notionRepository.results = localNotionDatabse.default
            .results as NotionResultArray;
        const league = await notionRepository.getLeagueData();

        expect(league.name).toBe("La Liga Connecta Balear 2024");
        expect(league.description).toBe("Liga de padel en Menorca");
        expect(league.days.length).toBeGreaterThan(0);

        // Day 1 - Round 1 - Match 1
        const dayOneRoundOneMatchOne = league.days[0];
        expect(dayOneRoundOneMatchOne.description).toBe("Jornada 1");
        expect(dayOneRoundOneMatchOne.round.name).toBe("Ronda 1");
        expect(dayOneRoundOneMatchOne.round.match.id).toBe(1);
        expect(dayOneRoundOneMatchOne.round.match).toHaveProperty("localTeam");
        expect(dayOneRoundOneMatchOne.round.match).toHaveProperty("rivalTeam");
        expect(dayOneRoundOneMatchOne.round.match.localTeam?.name).toBe("Panxes Rotges");
        expect(dayOneRoundOneMatchOne.round.match.localTeam?.players?.length).toBe(2);
        expect(dayOneRoundOneMatchOne.round.match.localTeam?.players?.[0]?.name).toBe("Ivan Moll");
        expect(dayOneRoundOneMatchOne.round.match.localTeam?.players?.[0]?.position).toBe("reves");
        expect(dayOneRoundOneMatchOne.round.match.localTeam?.players?.[1]?.name).toBe("Marc Pons");
        expect(dayOneRoundOneMatchOne.round.match.localTeam?.players?.[1]?.position).toBe("drive");
        expect(dayOneRoundOneMatchOne.round.match.localTeam?.sets[0].games).toBe(6);
        expect(dayOneRoundOneMatchOne.round.match.localTeam?.sets[1].games).toBe(0);
        expect(dayOneRoundOneMatchOne.round.match.localTeam?.sets[2].games).toBe(1);
        expect(dayOneRoundOneMatchOne.round.match.rivalTeam?.sets[0].games).toBe(3);
        expect(dayOneRoundOneMatchOne.round.match.rivalTeam?.sets[1].games).toBe(6);
        expect(dayOneRoundOneMatchOne.round.match.rivalTeam?.sets[2].games).toBe(6);

        // Day 1 - Round 1 - Match 2
        const dayOneRoundOneMatchTwo = league.days[1];
        expect(dayOneRoundOneMatchTwo.description).toBe("Jornada 1");
        expect(dayOneRoundOneMatchTwo.round.name).toBe("Ronda 1");
        expect(dayOneRoundOneMatchTwo.round.match.id).toBe(2);
        expect(dayOneRoundOneMatchTwo.round.match).toHaveProperty("localTeam");
        expect(dayOneRoundOneMatchTwo.round.match).toHaveProperty("rivalTeam");
        expect(dayOneRoundOneMatchTwo.round.match.localTeam?.name).toBe("Panxes Rotges");
        expect(dayOneRoundOneMatchTwo.round.match.localTeam?.players?.length).toBe(2);
        expect(dayOneRoundOneMatchTwo.round.match.localTeam?.players?.[0]?.name).toBe("Pedro Bermudez");
        expect(dayOneRoundOneMatchTwo.round.match.localTeam?.players?.[0]?.position).toBe("reves");
        expect(dayOneRoundOneMatchTwo.round.match.localTeam?.players?.[1]?.name).toBe("Toni Quintana");
        expect(dayOneRoundOneMatchTwo.round.match.localTeam?.players?.[1]?.position).toBe("drive");
        expect(dayOneRoundOneMatchTwo.round.match.localTeam?.sets[0].games).toBe(6);
        expect(dayOneRoundOneMatchTwo.round.match.localTeam?.sets[1].games).toBe(6);
        expect(dayOneRoundOneMatchTwo.round.match.localTeam?.sets[2].games).toBe(0);
        expect(dayOneRoundOneMatchTwo.round.match.rivalTeam?.sets[0].games).toBe(2);
        expect(dayOneRoundOneMatchTwo.round.match.rivalTeam?.sets[1].games).toBe(4);
        expect(dayOneRoundOneMatchTwo.round.match.rivalTeam?.sets[2].games).toBe(0);

        // Day 1 - Round 1 - Match 3
        const dayOneRoundOneMatchThree = league.days[2];
        expect(dayOneRoundOneMatchThree.description).toBe("Jornada 1");
        expect(dayOneRoundOneMatchThree.round.name).toBe("Ronda 1");
        expect(dayOneRoundOneMatchThree.round.match.id).toBe(3);
        expect(dayOneRoundOneMatchThree.round.match).toHaveProperty("localTeam");
        expect(dayOneRoundOneMatchThree.round.match).toHaveProperty("rivalTeam");
        expect(dayOneRoundOneMatchThree.round.match.localTeam?.name).toBe("Panxes Rotges");
        expect(dayOneRoundOneMatchThree.round.match.localTeam?.players?.length).toBe(2);
        expect(dayOneRoundOneMatchThree.round.match.localTeam?.players?.[0]?.name).toBe("Bia Barber");
        expect(dayOneRoundOneMatchThree.round.match.localTeam?.players?.[0]?.position).toBe("reves");
        expect(dayOneRoundOneMatchThree.round.match.localTeam?.players?.[1]?.name).toBe("Xavi Barber");
        expect(dayOneRoundOneMatchThree.round.match.localTeam?.players?.[1]?.position).toBe("drive");
        expect(dayOneRoundOneMatchThree.round.match.localTeam?.sets[0].games).toBe(6);
        expect(dayOneRoundOneMatchThree.round.match.localTeam?.sets[1].games).toBe(6);
        expect(dayOneRoundOneMatchThree.round.match.localTeam?.sets[2].games).toBe(0);
        expect(dayOneRoundOneMatchThree.round.match.rivalTeam?.sets[0].games).toBe(2);
        expect(dayOneRoundOneMatchThree.round.match.rivalTeam?.sets[1].games).toBe(1);
        expect(dayOneRoundOneMatchThree.round.match.rivalTeam?.sets[2].games).toBe(0);

        // Day 1 - Round 2 - Match 1
        const dayOneRoundTwoMatchOne = league.days[3];
        expect(dayOneRoundTwoMatchOne.description).toBe("Jornada 1");
        expect(dayOneRoundTwoMatchOne.round.name).toBe("Ronda 2");
        expect(dayOneRoundTwoMatchOne.round.match.id).toBe(1);
        expect(dayOneRoundTwoMatchOne.round.match).toHaveProperty("localTeam");
        expect(dayOneRoundTwoMatchOne.round.match).toHaveProperty("rivalTeam");
        expect(dayOneRoundTwoMatchOne.round.match.localTeam?.name).toBe("Panxes Rotges");
        expect(dayOneRoundTwoMatchOne.round.match.localTeam?.players?.length).toBe(2);
        expect(dayOneRoundTwoMatchOne.round.match.localTeam?.players?.[0]?.name).toBe("Miquel Febrer");
        expect(dayOneRoundTwoMatchOne.round.match.localTeam?.players?.[0]?.position).toBe("reves");
        expect(dayOneRoundTwoMatchOne.round.match.localTeam?.players?.[1]?.name).toBe("Manu Caballo");
        expect(dayOneRoundTwoMatchOne.round.match.localTeam?.players?.[1]?.position).toBe("drive");
        expect(dayOneRoundTwoMatchOne.round.match.localTeam?.sets[0].games).toBe(6);
        expect(dayOneRoundTwoMatchOne.round.match.localTeam?.sets[1].games).toBe(6);
        expect(dayOneRoundTwoMatchOne.round.match.localTeam?.sets[2].games).toBe(0);
        expect(dayOneRoundTwoMatchOne.round.match.rivalTeam?.sets[0].games).toBe(4);
        expect(dayOneRoundTwoMatchOne.round.match.rivalTeam?.sets[1].games).toBe(2);
        expect(dayOneRoundTwoMatchOne.round.match.rivalTeam?.sets[2].games).toBe(0);

        // Day 1 - Round 2 - Match 2
        const dayOneRoundTwoMatchTwo = league.days[4];
        expect(dayOneRoundTwoMatchTwo.description).toBe("Jornada 1");
        expect(dayOneRoundTwoMatchTwo.round.name).toBe("Ronda 2");
        expect(dayOneRoundTwoMatchTwo.round.match.id).toBe(2);
        expect(dayOneRoundTwoMatchTwo.round.match).toHaveProperty("localTeam");
        expect(dayOneRoundTwoMatchTwo.round.match).toHaveProperty("rivalTeam");
        expect(dayOneRoundTwoMatchTwo.round.match.localTeam?.name).toBe("Panxes Rotges");
        expect(dayOneRoundTwoMatchTwo.round.match.localTeam?.players?.length).toBe(2);
        expect(dayOneRoundTwoMatchTwo.round.match.localTeam?.players?.[0]?.name).toBe("Josep Franco");
        expect(dayOneRoundTwoMatchTwo.round.match.localTeam?.players?.[0]?.position).toBe("reves");
        expect(dayOneRoundTwoMatchTwo.round.match.localTeam?.players?.[1]?.name).toBe("Joan Planells");
        expect(dayOneRoundTwoMatchTwo.round.match.localTeam?.players?.[1]?.position).toBe("drive");
        expect(dayOneRoundTwoMatchTwo.round.match.localTeam?.sets[0].games).toBe(6);
        expect(dayOneRoundTwoMatchTwo.round.match.localTeam?.sets[1].games).toBe(0);
        expect(dayOneRoundTwoMatchTwo.round.match.localTeam?.sets[2].games).toBe(0);
        expect(dayOneRoundTwoMatchTwo.round.match.rivalTeam?.sets[0].games).toBe(7);
        expect(dayOneRoundTwoMatchTwo.round.match.rivalTeam?.sets[1].games).toBe(6);
        expect(dayOneRoundTwoMatchTwo.round.match.rivalTeam?.sets[2].games).toBe(0);

        // Day 1 - Round 2 - Match 3
        const dayOneRoundTwoMatchThree = league.days[5];
        expect(dayOneRoundTwoMatchThree.description).toBe("Jornada 1");
        expect(dayOneRoundTwoMatchThree.round.name).toBe("Ronda 2");
        expect(dayOneRoundTwoMatchThree.round.match.id).toBe(3);
        expect(dayOneRoundTwoMatchThree.round.match).toHaveProperty("localTeam");
        expect(dayOneRoundTwoMatchThree.round.match).toHaveProperty("rivalTeam");
        expect(dayOneRoundTwoMatchThree.round.match.localTeam?.name).toBe("Panxes Rotges");
        expect(dayOneRoundTwoMatchThree.round.match.localTeam?.players?.length).toBe(2);
        expect(dayOneRoundTwoMatchThree.round.match.localTeam?.players?.[0]?.name).toBe("Bia Barber");
        expect(dayOneRoundTwoMatchThree.round.match.localTeam?.players?.[0]?.position).toBe("reves");
        expect(dayOneRoundTwoMatchThree.round.match.localTeam?.players?.[1]?.name).toBe("Isaac Saurina");
        expect(dayOneRoundTwoMatchThree.round.match.localTeam?.players?.[1]?.position).toBe("drive");
        expect(dayOneRoundTwoMatchThree.round.match.localTeam?.sets[0].games).toBe(6);
        expect(dayOneRoundTwoMatchThree.round.match.localTeam?.sets[1].games).toBe(6);
        expect(dayOneRoundTwoMatchThree.round.match.localTeam?.sets[2].games).toBe(0);
        expect(dayOneRoundTwoMatchThree.round.match.rivalTeam?.sets[0].games).toBe(3);
        expect(dayOneRoundTwoMatchThree.round.match.rivalTeam?.sets[1].games).toBe(2);
        expect(dayOneRoundTwoMatchThree.round.match.rivalTeam?.sets[2].games).toBe(0);
    });

    test("should return the same information for Day 2 as Notion's database", async () => {
        notionRepository.results = localNotionDatabse.default
            .results as NotionResultArray;
        const league = await notionRepository.getLeagueData();

        expect(league.name).toBe("La Liga Connecta Balear 2024");
        expect(league.description).toBe("Liga de padel en Menorca");
        expect(league.days.length).toBeGreaterThan(0);

        // Day 2 - Round 1 - Match 1
        const dayTwoRoundOneMatchOne = league.days[6];
        expect(dayTwoRoundOneMatchOne.description).toBe("Jornada 2");
        expect(dayTwoRoundOneMatchOne.round.name).toBe("Ronda 1");
        expect(dayTwoRoundOneMatchOne.round.match.id).toBe(1);
        expect(dayTwoRoundOneMatchOne.round.match).toHaveProperty("localTeam");
        expect(dayTwoRoundOneMatchOne.round.match).toHaveProperty("rivalTeam");
        expect(dayTwoRoundOneMatchOne.round.match.localTeam?.name).toBe("Panxes Rotges");
        expect(dayTwoRoundOneMatchOne.round.match.localTeam?.players?.length).toBe(2);
        expect(dayTwoRoundOneMatchOne.round.match.localTeam?.players?.[0]?.name).toBe("Ivan Moll");
        expect(dayTwoRoundOneMatchOne.round.match.localTeam?.players?.[0]?.position).toBe("reves");
        expect(dayTwoRoundOneMatchOne.round.match.localTeam?.players?.[1]?.name).toBe("Isaac Saurina");
        expect(dayTwoRoundOneMatchOne.round.match.localTeam?.players?.[1]?.position).toBe("drive");
        expect(dayTwoRoundOneMatchOne.round.match.localTeam?.sets[0].games).toBe(6);
        expect(dayTwoRoundOneMatchOne.round.match.localTeam?.sets[1].games).toBe(6);
        expect(dayTwoRoundOneMatchOne.round.match.localTeam?.sets[2].games).toBe(0);
        expect(dayTwoRoundOneMatchOne.round.match.rivalTeam?.sets[0].games).toBe(1);
        expect(dayTwoRoundOneMatchOne.round.match.rivalTeam?.sets[1].games).toBe(1);
        expect(dayTwoRoundOneMatchOne.round.match.rivalTeam?.sets[2].games).toBe(0);

        // Day 2 - Round 1 - Match 2
        const dayTwoRoundOneMatchTwo = league.days[7];
        expect(dayTwoRoundOneMatchTwo.description).toBe("Jornada 2");
        expect(dayTwoRoundOneMatchTwo.round.name).toBe("Ronda 1");
        expect(dayTwoRoundOneMatchTwo.round.match.id).toBe(2);
        expect(dayTwoRoundOneMatchTwo.round.match).toHaveProperty("localTeam");
        expect(dayTwoRoundOneMatchTwo.round.match).toHaveProperty("rivalTeam");
        expect(dayTwoRoundOneMatchTwo.round.match.localTeam?.name).toBe("Panxes Rotges");
        expect(dayTwoRoundOneMatchTwo.round.match.localTeam?.players?.length).toBe(2);
        expect(dayTwoRoundOneMatchTwo.round.match.localTeam?.players?.[0]?.name).toBe("Alex Juan");
        expect(dayTwoRoundOneMatchTwo.round.match.localTeam?.players?.[0]?.position).toBe("reves");
        expect(dayTwoRoundOneMatchTwo.round.match.localTeam?.players?.[1]?.name).toBe("Xavi Barber");
        expect(dayTwoRoundOneMatchTwo.round.match.localTeam?.players?.[1]?.position).toBe("drive");
        expect(dayTwoRoundOneMatchTwo.round.match.localTeam?.sets[0].games).toBe(6);
        expect(dayTwoRoundOneMatchTwo.round.match.localTeam?.sets[1].games).toBe(6);
        expect(dayTwoRoundOneMatchTwo.round.match.localTeam?.sets[2].games).toBe(0);
        expect(dayTwoRoundOneMatchTwo.round.match.rivalTeam?.sets[0].games).toBe(1);
        expect(dayTwoRoundOneMatchTwo.round.match.rivalTeam?.sets[1].games).toBe(0);
        expect(dayTwoRoundOneMatchTwo.round.match.rivalTeam?.sets[2].games).toBe(0);
        
        // Day 2 - Round 1 - Match 3
        const dayTwoRoundOneMatchThree = league.days[8];
        expect(dayTwoRoundOneMatchThree.description).toBe("Jornada 2");
        expect(dayTwoRoundOneMatchThree.round.name).toBe("Ronda 1");
        expect(dayTwoRoundOneMatchThree.round.match.id).toBe(3);
        expect(dayTwoRoundOneMatchThree.round.match).toHaveProperty("localTeam");
        expect(dayTwoRoundOneMatchThree.round.match).toHaveProperty("rivalTeam");
        expect(dayTwoRoundOneMatchThree.round.match.localTeam?.name).toBe("Panxes Rotges");
        expect(dayTwoRoundOneMatchThree.round.match.localTeam?.players?.length).toBe(2);
        expect(dayTwoRoundOneMatchThree.round.match.localTeam?.players?.[0]?.name).toBe("Pedro Bermudez");
        expect(dayTwoRoundOneMatchThree.round.match.localTeam?.players?.[0]?.position).toBe("reves");
        expect(dayTwoRoundOneMatchThree.round.match.localTeam?.players?.[1]?.name).toBe("Toni Quintana");
        expect(dayTwoRoundOneMatchThree.round.match.localTeam?.players?.[1]?.position).toBe("drive");
        expect(dayTwoRoundOneMatchThree.round.match.localTeam?.sets[0].games).toBe(0);
        expect(dayTwoRoundOneMatchThree.round.match.localTeam?.sets[1].games).toBe(3);
        expect(dayTwoRoundOneMatchThree.round.match.localTeam?.sets[2].games).toBe(0);
        expect(dayTwoRoundOneMatchThree.round.match.rivalTeam?.sets[0].games).toBe(6);
        expect(dayTwoRoundOneMatchThree.round.match.rivalTeam?.sets[1].games).toBe(6);
        expect(dayTwoRoundOneMatchThree.round.match.rivalTeam?.sets[2].games).toBe(0);

        // Day 2 - Round 2 - Match 1
        const dayTwoRoundTwoMatchOne = league.days[9];
        expect(dayTwoRoundTwoMatchOne.description).toBe("Jornada 2");
        expect(dayTwoRoundTwoMatchOne.round.name).toBe("Ronda 2");
        expect(dayTwoRoundTwoMatchOne.round.match.id).toBe(1);
        expect(dayTwoRoundTwoMatchOne.round.match).toHaveProperty("localTeam");
        expect(dayTwoRoundTwoMatchOne.round.match).toHaveProperty("rivalTeam");
        expect(dayTwoRoundTwoMatchOne.round.match.localTeam?.name).toBe("Panxes Rotges");
        expect(dayTwoRoundTwoMatchOne.round.match.localTeam?.players?.length).toBe(2);
        expect(dayTwoRoundTwoMatchOne.round.match.localTeam?.players?.[0]?.name).toBe("Bia Barber");
        expect(dayTwoRoundTwoMatchOne.round.match.localTeam?.players?.[0]?.position).toBe("reves");
        expect(dayTwoRoundTwoMatchOne.round.match.localTeam?.players?.[1]?.name).toBe("Marc Pons");
        expect(dayTwoRoundTwoMatchOne.round.match.localTeam?.players?.[1]?.position).toBe("drive");
        expect(dayTwoRoundTwoMatchOne.round.match.localTeam?.sets[0].games).toBe(6);
        expect(dayTwoRoundTwoMatchOne.round.match.localTeam?.sets[1].games).toBe(6);
        expect(dayTwoRoundTwoMatchOne.round.match.localTeam?.sets[2].games).toBe(0);
        expect(dayTwoRoundTwoMatchOne.round.match.rivalTeam?.sets[0].games).toBe(2);
        expect(dayTwoRoundTwoMatchOne.round.match.rivalTeam?.sets[1].games).toBe(1);
        expect(dayTwoRoundTwoMatchOne.round.match.rivalTeam?.sets[2].games).toBe(0);

        // Day 2 - Round 2 - Match 2
        const dayTwoRoundTwoMatchTwo = league.days[10];
        expect(dayTwoRoundTwoMatchTwo.description).toBe("Jornada 2");
        expect(dayTwoRoundTwoMatchTwo.round.name).toBe("Ronda 2");
        expect(dayTwoRoundTwoMatchTwo.round.match.id).toBe(2);
        expect(dayTwoRoundTwoMatchTwo.round.match).toHaveProperty("localTeam");
        expect(dayTwoRoundTwoMatchTwo.round.match).toHaveProperty("rivalTeam");
        expect(dayTwoRoundTwoMatchTwo.round.match.localTeam?.name).toBe("Panxes Rotges");
        expect(dayTwoRoundTwoMatchTwo.round.match.localTeam?.players?.length).toBe(2);
        expect(dayTwoRoundTwoMatchTwo.round.match.localTeam?.players?.[0]?.name).toBe("Pedro Bermudez");
        expect(dayTwoRoundTwoMatchTwo.round.match.localTeam?.players?.[0]?.position).toBe("reves");
        expect(dayTwoRoundTwoMatchTwo.round.match.localTeam?.players?.[1]?.name).toBe("Toni Quintana");
        expect(dayTwoRoundTwoMatchTwo.round.match.localTeam?.players?.[1]?.position).toBe("drive");
        expect(dayTwoRoundTwoMatchTwo.round.match.localTeam?.sets[0].games).toBe(6);
        expect(dayTwoRoundTwoMatchTwo.round.match.localTeam?.sets[1].games).toBe(4);
        expect(dayTwoRoundTwoMatchTwo.round.match.localTeam?.sets[2].games).toBe(6);
        expect(dayTwoRoundTwoMatchTwo.round.match.rivalTeam?.sets[0].games).toBe(4);
        expect(dayTwoRoundTwoMatchTwo.round.match.rivalTeam?.sets[1].games).toBe(6);
        expect(dayTwoRoundTwoMatchTwo.round.match.rivalTeam?.sets[2].games).toBe(4);

        // Day 2 - Round 2 - Match 3
        const dayTwoRoundTwoMatchThree = league.days[11];
        expect(dayTwoRoundTwoMatchThree.description).toBe("Jornada 2");
        expect(dayTwoRoundTwoMatchThree.round.name).toBe("Ronda 2");
        expect(dayTwoRoundTwoMatchThree.round.match.id).toBe(3);
        expect(dayTwoRoundTwoMatchThree.round.match).toHaveProperty("localTeam");
        expect(dayTwoRoundTwoMatchThree.round.match).toHaveProperty("rivalTeam");
        expect(dayTwoRoundTwoMatchThree.round.match.localTeam?.name).toBe("Panxes Rotges");
        expect(dayTwoRoundTwoMatchThree.round.match.localTeam?.players?.length).toBe(2);
        expect(dayTwoRoundTwoMatchThree.round.match.localTeam?.players?.[0]?.name).toBe("Josep Franco");
        expect(dayTwoRoundTwoMatchThree.round.match.localTeam?.players?.[0]?.position).toBe("reves");
        expect(dayTwoRoundTwoMatchThree.round.match.localTeam?.players?.[1]?.name).toBe("Manu Caballo");
        expect(dayTwoRoundTwoMatchThree.round.match.localTeam?.players?.[1]?.position).toBe("drive");
        expect(dayTwoRoundTwoMatchThree.round.match.localTeam?.sets[0].games).toBe(3);
        expect(dayTwoRoundTwoMatchThree.round.match.localTeam?.sets[1].games).toBe(6);
        expect(dayTwoRoundTwoMatchThree.round.match.localTeam?.sets[2].games).toBe(4);
        expect(dayTwoRoundTwoMatchThree.round.match.rivalTeam?.sets[0].games).toBe(6);
        expect(dayTwoRoundTwoMatchThree.round.match.rivalTeam?.sets[1].games).toBe(4);
        expect(dayTwoRoundTwoMatchThree.round.match.rivalTeam?.sets[2].games).toBe(6);
    });
  });
});
