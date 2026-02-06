import React, { useRef, useMemo } from 'react';
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
import { CHART_CONFIG } from '../constants';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = React.memo(({ criteria, onSegmentClick }) => {
  const chartRef = useRef(null);

  const validCriteria = useMemo(() => {
    return criteria.filter(c => c.value !== null && c.value !== undefined && !isNaN(c.value));
  }, [criteria]);

  const chartData = useMemo(() => {
    if (validCriteria.length === 0) return null;

    return {
      labels: validCriteria.map(c => c.label),
      datasets: [
        {
          label: 'Skor',
          data: validCriteria.map(c => c.value),
          backgroundColor: CHART_CONFIG.backgroundColor,
          borderColor: CHART_CONFIG.borderColor,
          borderWidth: 2,
          pointBackgroundColor: CHART_CONFIG.pointColor,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: CHART_CONFIG.borderColor,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  }, [validCriteria]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        suggestedMin: CHART_CONFIG.minValue,
        suggestedMax: CHART_CONFIG.maxValue,
        ticks: {
          stepSize: CHART_CONFIG.stepSize,
          backdropColor: 'transparent'
        },
        pointLabels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: function(context) {
            const value = context.parsed.r || 0;
            const percentage = ((value / CHART_CONFIG.maxValue) * 100).toFixed(0);
            return `${context.label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    onClick: (event, elements) => {
      if (elements.length > 0 && onSegmentClick) {
        const index = elements[0].index;
        const criterion = validCriteria[index];
        onSegmentClick(criterion);
      }
    },
    interaction: {
      mode: 'point',
      intersect: true
    }
  }), [validCriteria, onSegmentClick]);

  if (!chartData || validCriteria.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p>Tidak ada data kriteria yang valid</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Radar ref={chartRef} data={chartData} options={options} />
    </div>
  );
});

RadarChart.displayName = 'RadarChart';

export default RadarChart;
