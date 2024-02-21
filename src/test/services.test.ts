import { expect, test, describe, beforeAll } from 'vitest';
import NotionService from '@/models/services/NotionService.ts';
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints.js';

require('dotenv').config();

const notionService = new NotionService();
let fetchDataBaseInfoResponse: QueryDatabaseResponse;
let fetchAllDatabaseRowsResponse: QueryDatabaseResponse;

beforeAll(async () => {
  notionService.apiKey = process.env.NOTION_APIKEY as string;
  notionService.databaseId = process.env.NOTION_MATCHES_DATABASE_ID as string;
  fetchDataBaseInfoResponse = await notionService.fetchDataBaseInfo();
  fetchAllDatabaseRowsResponse = await notionService.fetchAllDatabaseRows();
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
