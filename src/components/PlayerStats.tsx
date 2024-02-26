import React, { useEffect } from 'react';
import useStore from '@/store/index.js';
import UserIcon from './UserIcon.tsx';
import Separator from './Separator.tsx';
import AreaChart from './charts/AreaChart.tsx';
import RadarChart from './charts/RadarChart.tsx';

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
    }, [playerData]);

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
                        {playerData.position}
                    </p>
                    <Separator />
                    <div className='grid grid-cols-2 gap-4 mx-auto max-w-xl'>
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
                <section className='w-full mx-auto'>
                    <h2 className='text-2xl font-medium text-white text-center'>
                        Estadísticas
                    </h2>
                    {playerData.stats && (
                        <div className='flex flex-col justify-center items-center xl:grid grid-cols-2 gap-4'>
                            {/* MATCH CHART */}
                            {playerData.stats.matches.filter(({ matches }) => matches.won.count > 0 || matches.lost.count > 0).length < 4 ? (
                                <AreaChart
                                    playerStats={playerData}
                                    title='Partidos'
                                />
                            ): (
                                <RadarChart
                                    playerStats={playerData}
                                    title='Partidos'
                                />
                            )}

                            {/* SETS CHART */}
                            {playerData.stats.sets.filter(({ sets }) => sets.won.count > 0 || sets.lost.count).length < 4 ? (
                                <AreaChart
                                    playerStats={playerData}
                                    title='Sets'
                                />
                            ): (
                                <RadarChart
                                    playerStats={playerData}
                                    title='Sets'
                                />
                            )}

                            {/* GAMES CHART */}
                            {playerData.stats.games.filter(({ games }) => games.won.count > 0 || games.lost.count > 0).length < 4 ? (
                                <AreaChart
                                    playerStats={playerData}
                                    title='Juegos'
                                />
                            ): (
                                <RadarChart
                                    playerStats={playerData}
                                    title='Juegos'
                                />
                            )}
                        </div>
                    )}
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
