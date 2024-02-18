import { APIRoute } from "astro";
import NotionRepository from "../models/repositories/NotionRepository.ts";
import { IPlayerData } from "../models/repositories/Repository.js";

export const GET: APIRoute = async (): Promise<Response> => {
    let playersData: IPlayerData[] = [];

    try {
        playersData = await new NotionRepository().getPlayersData();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    
    return new Response(
        JSON.stringify(playersData as IPlayerData[]), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}