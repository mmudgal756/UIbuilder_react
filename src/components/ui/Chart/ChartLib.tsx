import React from 'react';
import {
  Bar,
  Line,
  Pie,
  Chart as ChartJS,
} from 'react-chartjs-2';
import {
  Chart as ChartJSCore,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';

ChartJSCore.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

export interface ChartLibProps {
  type: 'bar' | 'line' | 'pie';
  data: any[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export const ChartLib: React.FC<ChartLibProps> = ({ type, data, title, xAxisLabel, yAxisLabel }) => {
  // Prepare data for Chart.js
  const labels = data.map((d) => d.x);
  const values = data.map((d) => d.y);
  const chartData = {
    labels,
    datasets: [
      {
        label: title || '',
        data: values,
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' as const },
      title: {
        display: !!title,
        text: title,
        font: { size: 24, weight: 'bold' as const },
      },
    },
    scales: {
      x: {
        title: {
          display: !!xAxisLabel,
          text: xAxisLabel,
          font: { size: 16 },
        },
      },
      y: {
        title: {
          display: !!yAxisLabel,
          text: yAxisLabel,
          font: { size: 16 },
        },
        beginAtZero: true,
      },
    },
  };

  if (type === 'bar') return <Bar data={chartData} options={options} />;
  if (type === 'line') return <Line data={chartData} options={options} />;
  if (type === 'pie') return <Pie data={chartData} options={options} />;
  return null;
};
