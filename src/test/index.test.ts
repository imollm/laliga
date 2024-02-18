import { expect, test, describe, beforeAll } from 'vitest';
import NotionService from '../models/services/NotionService.ts';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints.js';
import NotionRepository, { NotionResultArray } from '../models/repositories/NotionRepository.ts';
import * as localNotionDatabse from './db.notion.json';
import Player, { IPlayer } from '../models/Player.ts';
import { League } from '../models/League.ts';
import { Day, IDay } from '../models/Day.ts';
import { IRound, Round } from '../models/Round.ts';
import { IMatch, Match } from '../models/Match.ts';
import { Team } from '../models/Team.ts';
import { ISet, SetGame } from '../models/Set.ts';
require('dotenv').config();

const notionService = new NotionService();
const notionRepository = new NotionRepository();
let fetchDataBaseInfoResponse: QueryDatabaseResponse;
let fetchAllDatabaseRowsResponse: QueryDatabaseResponse;

beforeAll(async () => {
  notionService.apiKey = process.env.NOTION_APIKEY as string;
  notionService.databaseId = process.env.NOTION_MATCHES_DATABASE_ID as string;
  fetchDataBaseInfoResponse = await notionService.fetchDataBaseInfo();
  fetchAllDatabaseRowsResponse = await notionService.fetchAllDatabaseRows();

  notionRepository.results = fetchAllDatabaseRowsResponse.results;
});

describe('NotionService tests', () => {
  describe('NotionService::fetchDataBaseInfo', () => {
    test('should return none empty response body', async () => {
      expect(fetchDataBaseInfoResponse).not.toBe(undefined);
      expect(fetchDataBaseInfoResponse).not.toBe(null);
      expect(fetchDataBaseInfoResponse).not.toBe('');
      expect(fetchDataBaseInfoResponse).not.toBe({});
      expect(fetchDataBaseInfoResponse).not.toBe([]);
      expect(typeof fetchDataBaseInfoResponse).toBe('object');
    });
    
    test('should return a response body with a property named "results" with a length greater than 0', async () => {
      expect(fetchDataBaseInfoResponse).toHaveProperty('results');
      expect(fetchDataBaseInfoResponse.results.length).toBeGreaterThan(0);
    });
  });

  describe('NotionService::fetchAllDatabaseRows', () => {
    test('should return non empty response body [NotionService::fetchAllDAtabaseRows]', async () => {
      expect(fetchAllDatabaseRowsResponse).not.toBe(undefined);
      expect(fetchAllDatabaseRowsResponse).not.toBe(null);
      expect(fetchAllDatabaseRowsResponse).not.toBe('');
      expect(fetchAllDatabaseRowsResponse).not.toBe({});
      expect(fetchAllDatabaseRowsResponse).not.toBe([]);
      expect(typeof fetchAllDatabaseRowsResponse).toBe('object');
    });
    
    test('should return a response body with a property named "results" with a length greater than 0', async () => {
      expect(fetchAllDatabaseRowsResponse).toHaveProperty('results');
      expect(fetchAllDatabaseRowsResponse.results.length).toBeGreaterThan(0);
    });
  });
});

describe('NotionRepository tests', () => {
  describe('NotionRepository::getPlayersData', () => {
    test('should return non empty response body', async () => {
      notionRepository.results = localNotionDatabse.default.results as NotionResultArray;
      expect(typeof notionRepository.results).toBe('object');

      const response = await notionRepository.getPlayersData();
      expect(response).not.toBe(undefined);
      expect(response).not.toBe(null);
      expect(response).not.toBe('');
      expect(response).not.toBe({});
      expect(response).not.toBe([]);
      expect(typeof response).toBe('object');
    });
    
    test('should return a response body with a property named "results" with a length greater than 0', async () => {
      const response = await notionRepository.getPlayersData();
      expect(response.length).toBeGreaterThan(0);
    });

    test('should return a response body with an array of players and its data', async () => {
      const response = await notionRepository.getPlayersData();
      expect(response.length).toBeGreaterThan(0);
      for (let i = 0; i < response.length; i++) {
        expect(response[i]).toHaveProperty('id');
        expect(typeof response[i].id).toBe('string');
        expect(response[i]).toHaveProperty('name');
        expect(typeof response[i].name).toBe('string');
        expect(response[i]).toHaveProperty('position');
        expect(typeof response[i].position).toBe('string');
        expect(response[i]).toHaveProperty('matchesPlayed');
        expect(typeof response[i].matchesPlayed).toBe('number');
        expect(response[i]).toHaveProperty('matchesWon');
        expect(typeof response[i].matchesWon).toBe('number');
        expect(response[i]).toHaveProperty('matchesLost');
        expect(typeof response[i].matchesLost).toBe('number');
        expect(response[i]).toHaveProperty('setsWon');
        expect(typeof response[i].setsWon).toBe('number');
        expect(response[i]).toHaveProperty('setsLost');
        expect(typeof response[i].setsLost).toBe('number');
        expect(response[i]).toHaveProperty('gamesWon');
        expect(typeof response[i].gamesWon).toBe('number');
      }
    });
  });
});

describe('League model tests', () => {
  test('should create a new instance of League', async () => {
      const league = new League();
      expect(league).toBeInstanceOf(League);
      expect(league).toHaveProperty('name');
      expect(typeof league.getName()).toBe('string');
      expect(league).toHaveProperty('description');
      expect(typeof league.getName()).toBe('string');
      expect(league).toHaveProperty('days');
      expect(league.getDays()).toBeInstanceOf(Array<IDay>);
      expect(league).toHaveProperty('players');
      expect(league.getPlayers()).toBeInstanceOf(Array<IPlayer>);
  });
});

describe('Day model tests', () => {
  test('should create a new instance of Day', async () => {
      const day = new Day('This is the description of the day');
      expect(day).toBeInstanceOf(Day);
      expect(day).toHaveProperty('id');
      expect(typeof day.getId()).toBe('string');
      expect(day).toHaveProperty('description');
      expect(typeof day.getDescription()).toBe('string');
      expect(day).toHaveProperty('rounds');
      expect(day.getRounds()).toBeInstanceOf(Array<IRound>);
  });
});

describe('Round model tests', () => {
  test('should create a new instance of Round', async () => {
      const round = new Round('This is the description of the round', 'Rival name');
      expect(round).toBeInstanceOf(Round);
      expect(round).toHaveProperty('id');
      expect(typeof round.getId()).toBe('string');
      expect(round).toHaveProperty('name');
      expect(typeof round.getName()).toBe('string');
      expect(round).toHaveProperty('matches');
      expect(round.getMatches()).toBeInstanceOf(Array<IMatch>);
      expect(round).toHaveProperty('rival');
      expect(typeof round.getRival()).toBe('string');
  });
});

describe('Match model tests', () => {
  test('should create a new instance of Match', async () => {
      const match = new Match(0, 'Rival name');
      expect(match).toBeInstanceOf(Match);
      expect(match).toHaveProperty('id');
      expect(typeof match.getId()).toBe('number');
      expect(match).toHaveProperty('localTeam');
      expect(match.getLocalTeam()).toBeInstanceOf(Team);
      expect(match).toHaveProperty('rivalTeam');
      expect(match.getRivalTeam()).toBeInstanceOf(Team);
  });
});

describe('Team model tests', () => {
  test('should create a new instance of Team', async () => {
      const team = new Team('Rival name');
      expect(team).toBeInstanceOf(Team);
      expect(team).toHaveProperty('id');
      expect(typeof team.getId()).toBe('string');
      expect(team).toHaveProperty('name');
      expect(typeof team.getName()).toBe('string');
      expect(team).toHaveProperty('players');
      expect(team.getPlayers()).toBeInstanceOf(Array<IPlayer>);
      expect(team).toHaveProperty('sets');
      expect(team.getSets()).toBeInstanceOf(Array<ISet>);
      expect(team.getSets().length).toBe(3);
      expect(team.getSets()[0]).toBeInstanceOf(SetGame);
      expect(team.getSets()[1]).toBeInstanceOf(SetGame);
      expect(team.getSets()[2]).toBeInstanceOf(SetGame);
      expect(team.getSets()[0].getGames()).toBe(0);
      expect(team.getSets()[1].getGames()).toBe(0);
      expect(team.getSets()[2].getGames()).toBe(0);
  });
});

describe('Set model tests', () => {
  test('should create a new instance of SetGame', async () => {
      const set = new SetGame(0);
      expect(set).toBeInstanceOf(SetGame);
      expect(set).toHaveProperty('games');
      expect(set.getGames()).toBe(0);
  });
});

describe('Player model tests', () => {
  test('should create a new instance of Player', async () => {
      const player = new Player('1', 'John Doe', 'reves');
      expect(player).toBeInstanceOf(Player);
      expect(player).toHaveProperty('id');
      expect(typeof player.getId()).toBe('string');
      expect(player).toHaveProperty('name');
      expect(typeof player.getName()).toBe('string');
      expect(player).toHaveProperty('position');
      expect(typeof player.getPosition()).toBe('string');
      expect(player).toHaveProperty('matchesPlayed');
      expect(player.getMatchesPlayed()).toBe(0);
      expect(player).toHaveProperty('matchesWon');
      expect(player.getMatchesWon()).toBe(0);
      expect(player).toHaveProperty('matchesLost');
      expect(player.getMatchesLost()).toBe(0);
      expect(player).toHaveProperty('matchesLost');
      expect(player.getMatchesLost()).toBe(0);
      expect(player).toHaveProperty('setsWon');
      expect(player.getSetsWon()).toBe(0);
      expect(player).toHaveProperty('setsLost');
      expect(player.getSetsLost()).toBe(0);
      expect(player).toHaveProperty('gamesWon');
      expect(player.getGamesWon()).toBe(0);
  });
});
