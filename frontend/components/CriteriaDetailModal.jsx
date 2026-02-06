import React from 'react';
import { getPerformanceLevel, getPerformanceColor, getPerformanceDescription } from '../utils/performance';

const CriteriaDetailModal = ({ criterion, onClose, spreadsheetId }) => {
  if (!criterion) return null;

  const percentage = criterion.value !== null ? ((criterion.value / 100) * 100).toFixed(0) : 'N/A';
  const level = getPerformanceLevel(criterion.value);
  const colorClass = getPerformanceColor(criterion.value);
  const description = getPerformanceDescription(criterion.value);

  const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit#gid=0&range=${criterion.cellRef}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 no-print">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6 card-shadow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {criterion.label}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Skor</span>
              <span className={`text-3xl font-bold ${colorClass}`}>
                {criterion.value !== null ? criterion.value : 'N/A'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Persentase</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {percentage}%
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Tingkat Performa
            </h4>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colorClass} bg-opacity-10`}>
              {level}
            </span>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Penilaian
            </h4>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
          </div>

          <div className="border-t dark:border-gray-600 pt-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Sumber Data
            </h4>
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded px-3 py-2">
              <code className="text-sm text-gray-700 dark:text-gray-300">
                {criterion.cellRef}
              </code>
              <a
                href={spreadsheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-tni-green hover:text-tni-gold font-medium"
              >
                Lihat di Spreadsheet →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full bg-tni-green hover:bg-tni-green/90 text-white font-semibold py-2 px-4 rounded transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default CriteriaDetailModal;
