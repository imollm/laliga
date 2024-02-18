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
                <ul className="flex flex-col gap-3 text-lg text-gray-500 dark:pt-4">
                    <li className="text-gray-900 dark:text-white">
                        <span className="font-bold">Posición </span>
                        <span className='dark:text-gray-400'>{player.position[0].toUpperCase() + player.position.slice(1, player.position.length)}</span>
                    </li>
                    <li className="dark:text-white">
                        <span className="font-bold">PJ: <span className="dark:text-gray-400">{player.matchesPlayed}</span></span>
                    </li>
                    <li className="dark:text-white">
                        <span className="font-bold">PG: <span className="dark:text-gray-400">{player.matchesWon}</span></span>
                    </li>
                    <li className="dark:text-white">
                        <span className="font-bold">PP: <span className="dark:text-gray-400">{player.matchesLost}</span></span>
                    </li>
                    <li className="dark:text-white">
                        <span className="font-bold">SG: <span className="dark:text-gray-400">{player.setsWon}</span></span>
                    </li>
                    <li className="dark:text-white">
                        <span className="font-bold">SP: <span className="dark:text-gray-400">{player.setsLost}</span></span>
                    </li>
                    <li className="dark:text-white">
                        <span className="font-bold">JG: <span className='dark:text-gray-400'>{player.gamesWon}</span></span></li>
                </ul>
            </div>
        </div>
    );
}

export default PlayerCard;