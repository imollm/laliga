import React from 'react';
import { IPlayerData } from '../models/repositories/Repository.js';
import useStore from '../store/index.ts';

const TablePlayers = () => {
    const { playersData } = useStore();

    return (
        <div>
            <h1>Table Players</h1>
            <table>
                <thead>
                    <tr>
                        <th>Jugador</th>
                        <th>Posición</th>
                        <th>Partidos jugados</th>
                        <th>Partidos ganados</th>
                        <th>Partidos perdidos</th>
                        <th>Sets ganados</th>
                        <th>Sets perdidos</th>
                        <th>Puntos totales</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        playersData?.map((player: IPlayerData) => (
                            <tr key={player.id}>
                                <td>{player.name}</td>
                                <td>{player.position}</td>
                                <td>{player.matchesPlayed}</td>
                                <td>{player.matchesWon}</td>
                                <td>{player.matchesLost}</td>
                                <td>{player.setsWon}</td>
                                <td>{player.setsLost}</td>
                                <td>{player.gamesWon}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default TablePlayers;