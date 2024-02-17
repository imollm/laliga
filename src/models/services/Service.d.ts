export interface IService {
    apiKey: string;
    databaseId: string;
    fetchDataBaseInfo(): Promise<any>;
    fetchAllDatabaseRows(): Promise<any>;
}