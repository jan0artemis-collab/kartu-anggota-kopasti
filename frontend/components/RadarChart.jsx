import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ criteria, onSegmentClick }) => {
  const chartRef = useRef(null);

  const validCriteria = criteria.filter(c => c.value !== null && c.value !== undefined);

  if (validCriteria.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Tidak ada data kriteria yang valid
      </div>
    );
  }

  const data = {
    labels: validCriteria.map(c => c.label),
    datasets: [
      {
        label: 'Skor',
        data: validCriteria.map(c => c.value),
        backgroundColor: 'rgba(45, 80, 22, 0.2)',
        borderColor: 'rgba(45, 80, 22, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(212, 175, 55, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(45, 80, 22, 1)',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          backdropColor: 'transparent'
        },
        pointLabels: {
          font: {
            size: 12
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed.r || 0;
            const percentage = ((value / 100) * 100).toFixed(0);
            return `${context.label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const criterion = validCriteria[index];
        if (onSegmentClick) {
          onSegmentClick(criterion);
        }
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Radar ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default RadarChart;
