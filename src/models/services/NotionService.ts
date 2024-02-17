import { IService } from "./Service.js";
import { Client as NotionClient } from "@notionhq/client";

class NotionService implements IService {
    apiKey: string = import.meta.env.NOTION_APIKEY;
    databaseId: string = import.meta.env.NOTION_MATCHES_DATABASE_ID;

    async fetchDataBaseInfo() {
        try {
            const client = new NotionClient({ auth: this.apiKey })
            const response = await client.databases.query({
                database_id: this.databaseId
            });
            return response;
        } catch (error) {
            throw new Error('Failed to fetch data : NotionService.fetchDataBaseInfo()');
        }
    }

    async fetchAllDatabaseRows() {
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
            throw new Error('Failed to fetch data : NotionService.fetchAllDatabaseRows()');
        }
    }
}

export default NotionService;
