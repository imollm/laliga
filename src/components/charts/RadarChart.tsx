import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import type { IChartData, IPlayerStats } from '@/types/index.ts';
import { mapPlayerStats } from '@/utils/index.ts';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface Props {
    playerStats: IPlayerStats;
    title: 'Partidos' | 'Sets' | 'Juegos';
}

const RadarChart = ({ playerStats, title }: Props) => {
    const [stats, setStats] = useState<IChartData>({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        setStats(mapPlayerStats({ playerStats, fill: false }));
    }, []);

    return (
        <div className='w-full'>
            <h3 className='w-full text-left'>{title}</h3>
            <Radar data={stats} />
        </div>
    );
};

export default RadarChart;