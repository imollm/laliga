import type { IService } from "@/models/services/Service.js";
import { Client as NotionClient } from "@notionhq/client";

/**
 * Service class for interacting with Notion API.
 */
class NotionService implements IService {
    apiKey: string = import.meta.env.NOTION_APIKEY;
    databaseId: string = import.meta.env.NOTION_MATCHES_DATABASE_ID;

    /**
     * Fetches information about the Notion database.
     * @returns {Promise<any>} The response from the API.
     * @throws {Error} If the data fetching fails.
     */
    async fetchDataBaseInfo(): Promise<any> {
        try {
            const client = new NotionClient({ auth: this.apiKey })
            const response = await client.databases.query({
                database_id: this.databaseId
            });
            return response;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch data : NotionService.fetchDataBaseInfo()');
        }
    }

    /**
     * Fetches all rows from the Notion database.
     * @returns {Promise<any>} The response from the API.
     * @throws {Error} If the data fetching fails.
     */
    async fetchAllDatabaseRows(): Promise<any> {
        try {
            const client = new NotionClient({ auth: this.apiKey })
            const response = await client.databases.query({
                database_id: this.databaseId,
                filter: {
                    property: 'ID',
                    title: {
                        is_not_empty: true
                    }
                }
            });
            return response;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch data : NotionService.fetchAllDatabaseRows()');
        }
    }
}

export default NotionService;
