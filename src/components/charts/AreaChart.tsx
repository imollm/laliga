import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { IChartData, IPlayerStats } from '@/types/index.ts';
import { mapPlayerStats } from '@/utils/index.ts';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

interface Props {
    playerStats: IPlayerStats;
    title: 'Partidos' | 'Sets' | 'Juegos';
}

const AreaChart = ({ playerStats, title }: Props) => {
    const [stats, setStats] = useState<IChartData>({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        setStats(mapPlayerStats({ playerStats, fill: true }));
    }, []);

    return (
        <div className='w-full'>
            <Line data={stats} options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top' as const,
                    },
                    title: {
                        display: true,
                        text: title,
                    },
                },
            }}
            />
        </div>
    );
}

export default AreaChart;
