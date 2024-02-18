import React, { useEffect } from 'react';
import type { IPlayerData } from '../models/repositories/Repository.js';
import useStore from '../store/index.ts';
import PlayerCard from './PlayerCard.tsx';

const PlayersGrid = () => {
    const { playersData, fetchPlayersData } = useStore();

    useEffect(() => {
        const fetchData = async () => fetchPlayersData();
        fetchData();
    }, []);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:w-[90%] md:w-[80%%] lg:w-[75%] w-[65%]'>
            {
                playersData?.map((player: IPlayerData) => (
                    PlayerCard({ player })
                ))
            }
        </div>
    );
};

export default PlayersGrid;
