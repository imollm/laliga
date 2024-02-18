import React from "react";
import type { IPlayersData } from "../types/index.ts";
import UserIcon from "./UserIcon.tsx";
import mvpIcon from "/src/mvp.png";

const PlayerCard = ({ player }: { player: IPlayersData }) => {
    return (
        <div key={player.id} className={`relative w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}>
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
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white pt-3">
                    {player.name}
                </h5>
                <div className="flex flex-col gap-3 text-lg text-gray-500 dark:pt-4">
                    <div className="text-gray-900 dark:text-white">
                        <span className="font-bold">Posición </span>
                        <span className='dark:text-gray-400'>{player.position[0].toUpperCase() + player.position.slice(1, player.position.length)}</span>
                    </div>
                    <div className="flex flex-row gap-5 justify-between">
                        <div className="dark:text-white">
                            <span className="font-bold">PJ <span className="dark:text-gray-400">{player.matchesPlayed}</span></span>
                        </div>
                        <div className="dark:text-white">
                            <span className="font-bold">PG <span className="dark:text-gray-400">{player.matchesWon}</span></span>
                        </div>
                        <div className="dark:text-white">
                            <span className="font-bold">PP <span className="dark:text-gray-400">{player.matchesLost}</span></span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-5 justify-start">
                        <div className="dark:text-white">
                            <span className="font-bold">SG <span className="dark:text-gray-400">{player.setsWon}</span></span>
                        </div>
                        <div className="dark:text-white">
                            <span className="font-bold">SP <span className="dark:text-gray-400">{player.setsLost}</span></span>
                        </div>
                    </div>
                    <div className="dark:text-white">
                        <span className="font-bold">JG <span className='dark:text-gray-400'>{player.gamesWon}</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayerCard;