import React, { useEffect } from 'react';
import useStore from '../store/index.js';

interface Props {
    id: string | undefined;
}

const PlayerStats = ({ id }: Props) => {
    const { fetchPlayerData, playerData } = useStore();

    useEffect(() => {
        if (id && playerData.id !== id) {
            const fetchData = (async () => fetchPlayerData(id));
            fetchData();
        }
    }, []);

    return (
        <div>
            <h1>{playerData.name}</h1>
            <p>{playerData.position}</p>
            <p>{playerData.matchesPlayed}</p>
            <p>{playerData.matchesWon}</p>
            <p>{playerData.matchesLost}</p>
            <p>{playerData.setsWon}</p>
            <p>{playerData.setsLost}</p>
            <p>{playerData.gamesWon}</p>
        </div>
    );
}

export default PlayerStats;
