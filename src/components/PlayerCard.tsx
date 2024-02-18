import React from "react";
import { IPlayersData } from "../types/index.ts";
import UserIcon from "./UserIcon.tsx";
import mvpIcon from "/src/mvp.png";

const PlayerCard = ({ player }: { player: IPlayersData }) => {
    return (
        <div key={player.id} className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <figure className="w-full flex justify-center pt-4">
                <img src={mvpIcon.src} alt="MVP icon" />
            </figure>
            <div className="flex flex-col items-center pt-8 pb-10">
                <figure className="m-0 p-0 w-20">
                    <UserIcon />
                </figure>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {player.name}
                </h5>
                <ul className="flex flex-col gap-3 text-sm text-gray-500 dark:text-gray-400 pt-4">
                    <li className="text-gray-900 dark:text-white">
                        <span className="font-bold">Posición </span>
                        <span className='dark:text-gray-400'>{player.position[0].toUpperCase() + player.position.slice(1, player.position.length)}</span>
                    </li>
                    <li className="text-gray-900 dark:text-white">
                        <span className="font-bold">Partidos {player.matchesPlayed}</span>
                        <ul className="indent-3">
                            <li className='dark:text-gray-400'>Ganados {player.matchesWon}</li>
                            <li className='dark:text-gray-400'>Perdidos {player.matchesLost}</li>
                        </ul>
                    </li>
                    <li className="text-gray-900 dark:text-white">
                        <span className="font-bold">Sets</span>
                        <ul className="indent-3">
                            <li className='dark:text-gray-400'>Ganados {player.setsWon}</li>
                            <li className='dark:text-gray-400'>Perdidos {player.setsLost}</li>
                        </ul>
                    </li>
                    <li className="text-gray-900 dark:text-white">Juegos ganados <span className='dark:text-gray-400'>{player.gamesWon}</span></li>
                </ul>
            </div>
        </div>
    );
}

export default PlayerCard;