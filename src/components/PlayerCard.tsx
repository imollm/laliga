import React from "react";
import UserIcon from "./UserIcon.tsx";
import mvpIcon from "/src/mvp.png";
import type { IPlayerData } from "../types/index.ts";
import { capitalize } from "../utils/index.ts";

const PlayerCard = ({ player }: { player: IPlayerData }) => {
    return (
        <a key={player.id} href={`/player/${player.id}`}>
            <div className="relative w-full rounded-lg shadow bg-gray-800 border-gray-700 ring-gray-200 hover:ring">
                {
                    player.isMVP && (
                        <figure className="absolute top-2 right-3">
                            <img src={mvpIcon.src} alt="MVP icon" />
                        </figure>
                    )
                }
                <div className="flex flex-col items-center pt-8 pb-10">
                    <figure className="m-0 p-0 w-20">
                        <UserIcon />
                    </figure>
                    <h5 className="mb-1 text-xl font-mediu text-white pt-3">
                        {player.name}
                    </h5>
                    <div className="flex flex-col gap-3 text-lg text-gray-500 pt-4">
                        <div className="text-white">
                            <span className="font-bold">Posición </span>
                            <span className='text-gray-400'>{capitalize(player.position)}</span>
                        </div>
                        <div className="flex flex-row gap-5 justify-between">
                            <div className="text-white">
                                <span className="font-bold">PJ <span className="text-gray-400">{player.matchesPlayed}</span></span>
                            </div>
                            <div className="text-white">
                                <span className="font-bold">PG <span className="text-gray-400">{player.matchesWon}</span></span>
                            </div>
                            <div className="text-white">
                                <span className="font-bold">PP <span className="text-gray-400">{player.matchesLost}</span></span>
                            </div>
                        </div>
                        <div className="flex flex-row gap-5 justify-start">
                            <div className="text-white">
                                <span className="font-bold">SG <span className="text-gray-400">{player.setsWon}</span></span>
                            </div>
                            <div className="text-white">
                                <span className="font-bold">SP <span className="text-gray-400">{player.setsLost}</span></span>
                            </div>
                        </div>
                        <div className="text-white">
                            <span className="font-bold">JG <span className='text-gray-400'>{player.gamesWon}</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default PlayerCard;