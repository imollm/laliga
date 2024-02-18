import React, { useEffect } from 'react';
import { IPlayerData } from '../models/repositories/Repository.js';
import useStore from '../store/index.ts';
import PlayerCard from './PlayerCard.tsx';

const PlayersGrid = () => {
    const { playersData, fetchPlayersData } = useStore();

    useEffect(() => {
        const fetchData = async () => await fetchPlayersData();
        fetchData();
    }, []);

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-[90%]'>
            {
                playersData?.map((player: IPlayerData) => (
                    PlayerCard({ player })
                ))
            }
        </div>
    );
};

export default PlayersGrid;
