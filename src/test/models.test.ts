import { expect, test, describe } from 'vitest';
import Player, { type IPlayer } from '@/models/Player.ts';
import { League } from '@/models/League.ts';
import { Day, type IDay } from '@/models/Day.ts';
import { Round } from '@/models/Round.ts';
import { Match } from '@/models/Match.ts';
import { Team } from '@/models/Team.ts';
import { type ISet, SetGame } from '@/models/Set.ts';
require('dotenv').config();

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
            expect(day).toHaveProperty('round');
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
      expect(round).toHaveProperty('match');
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
      const player = new Player('1', 'John Doe', 'Reves');
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
      expect(player).toHaveProperty('isMVP');
      expect(player.getIsMVP()).toBe(false);
  });
});
