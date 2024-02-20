import type { APIRoute } from "astro";
import NotionRepository from "../../models/repositories/NotionRepository.js";
import type { IPlayerData } from "../../types/index.js";

export const GET: APIRoute = async ({ params }): Promise<Response> => {
    let playerData: IPlayerData | undefined;
    const id = params.id as string;
    let statusCode = 200;

    try {
        if (!id) {
            statusCode = 400;
            throw new Error('No id provided');
        }

        playerData = await new NotionRepository().getPlayerData(id);
        
        if (!playerData) statusCode = 404;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    
    return new Response(
        JSON.stringify(playerData as IPlayerData), {
            status: statusCode,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}