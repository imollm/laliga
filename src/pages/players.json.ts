import { APIRoute } from "astro";
import { NotionRepository } from "../models/repositories/NotionRepository.ts";

export const GET: APIRoute = async (): Promise<Response> => {
    let playersData = {};

    try {
        playersData = await new NotionRepository().getPlayersData();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    
    return new Response(
        JSON.stringify(playersData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}