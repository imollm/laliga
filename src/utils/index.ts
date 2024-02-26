import type {
  IChartData,
  IPlayerMatchStats,
  IPlayerStats,
} from "@/types/index.ts";

/**
 * Map player stats to chart data
 * @param {Object} { playerStats, fill } Player stats and fill the chart
 * - {IPlayerStats} playerStats.stats Player stats
 * - {boolean} fill Fill the chart
 * @returns {IChartData} Chart data
 */
export const mapPlayerStats = ({ playerStats, fill = false }: { playerStats: IPlayerStats, fill: boolean }): IChartData => {
  const labels = playerStats.stats.matches.map(
    (match: IPlayerMatchStats) => match.colleague.name
  );
  const won = playerStats.stats.matches.map(
    (match: IPlayerMatchStats) => match.matches.won.percentage
  );
  const lost = playerStats.stats.matches.map(
    (match: IPlayerMatchStats) => match.matches.lost.percentage
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Ganados",
        data: won,
        backgroundColor: "rgba(58, 196, 58, 0.2)",
        borderColor: "#ccc",
        borderWidth: 1,
      },
      {
        label: "Perdidos",
        data: lost,
        backgroundColor: "rgba(222, 47, 47, 0.2)",
        borderColor: "#ccc",
        borderWidth: 1,
      },
    ],
  } as IChartData;

    if (fill) {
        data.datasets[0].fill = true;
        data.datasets[1].fill = true;
    }

  return data;
};
