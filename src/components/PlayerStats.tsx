import React, { useEffect } from 'react';
import useStore from '@/store/index.js';
import UserIcon from './UserIcon.tsx';
import { capitalize } from '@/utils/index.ts';
import Separator from './Separator.tsx';
import MatchesChart from './MatchesChart.tsx';

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
        <main className='w-full flex justify-center'>
            <div className='w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] flex flex-col justify-center items-center'>
                <figure className="m-0 p-0 pt-8 w-36">
                    <UserIcon />
                </figure>
                <section className='w-full'>
                    <h1 className='text-3xl font-medium text-white pt-3 text-center'>
                        {playerData.name}
                    </h1>
                    <p className='text-white text-center pt-1'>
                        {capitalize(playerData.position)}
                    </p>
                    <Separator />
                    <div className='grid grid-cols-2 gap-4'>
                        <p className='text-white rounded flex flex-col items-center justify-center ring-white ring-2 h-20 text-xl'>
                            <span className='font-bold'>PJ </span>
                            <span className='text-gray-400'>{playerData.matchesPlayed}</span>
                        </p>
                        <p className='text-white rounded flex flex-col items-center justify-center ring-white ring-2 h-20 text-xl'>
                            <span className='font-bold'>PG </span>
                            <span className='text-gray-400'>{playerData.matchesWon}</span>
                        </p>
                        <p className='text-white rounded flex flex-col items-center justify-center ring-white ring-2 h-20 text-xl'>
                            <span className='font-bold'>PP </span>
                            <span className='text-gray-400'>{playerData.matchesLost}</span>
                        </p>
                        <p className='text-white rounded flex flex-col items-center justify-center ring-white ring-2 h-20 text-xl'>
                            <span className='font-bold'>SG </span>
                            <span className='text-gray-400'>{playerData.setsWon}</span>
                        </p>
                        <p className='text-white rounded flex flex-col items-center justify-center ring-white ring-2 h-20 text-xl'>
                            <span className='font-bold'>SP </span>
                            <span className='text-gray-400'>{playerData.setsLost}</span>
                        </p>
                        <p className='text-white rounded flex flex-col items-center justify-center ring-white ring-2 h-20 text-xl'>
                            <span className='font-bold'>JG </span>
                            <span className='text-gray-400'>{playerData.gamesWon}</span>
                        </p>
                    </div>
                </section>
                <Separator />
                <section className='w-full'>
                    <h2 className='text-2xl font-medium text-white text-center'>
                        Estadísticas
                    </h2>
                    <MatchesChart playerData={playerData} />
                    <h3 className='w-full text-left'>Sets</h3>
                    <h3 className='w-full text-left'>Juegos</h3>
                </section>
                <section>
                    <h2 className='text-xl font-medium text-white text-center'>
                        ¿Con quien tengo más química?
                    </h2>
                </section>
            </div>
        </main>
    );
}

export default PlayerStats;
