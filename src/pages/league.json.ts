import type { APIRoute } from "astro";
import NotionRepository from "../models/repositories/NotionRepository.ts";

export const GET: APIRoute = async (): Promise<Response> => {
    let leagueData: any = {};

    try {
        leagueData = await new NotionRepository().getLeagueData();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    
    return new Response(
        JSON.stringify(leagueData as any), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}