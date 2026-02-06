import { PERFORMANCE_LEVELS } from '../constants';

export const getPerformanceLevel = (score) => {
  if (score === null || score === undefined || isNaN(score)) {
    return 'N/A';
  }
  
  if (score <= PERFORMANCE_LEVELS.LOW.threshold) {
    return PERFORMANCE_LEVELS.LOW.label;
  }
  if (score <= PERFORMANCE_LEVELS.MEDIUM.threshold) {
    return PERFORMANCE_LEVELS.MEDIUM.label;
  }
  return PERFORMANCE_LEVELS.HIGH.label;
};

export const getPerformanceColor = (score) => {
  if (score === null || score === undefined || isNaN(score)) {
    return 'text-gray-400 dark:text-gray-500';
  }
  
  if (score <= PERFORMANCE_LEVELS.LOW.threshold) {
    return `${PERFORMANCE_LEVELS.LOW.color} dark:text-red-400`;
  }
  if (score <= PERFORMANCE_LEVELS.MEDIUM.threshold) {
    return `${PERFORMANCE_LEVELS.MEDIUM.color} dark:text-yellow-400`;
  }
  return `${PERFORMANCE_LEVELS.HIGH.color} dark:text-green-400`;
};

export const getPerformanceBgColor = (score) => {
  if (score === null || score === undefined || isNaN(score)) {
    return 'bg-gray-100 dark:bg-gray-700';
  }
  
  if (score <= PERFORMANCE_LEVELS.LOW.threshold) {
    return 'bg-red-50 dark:bg-red-900/20';
  }
  if (score <= PERFORMANCE_LEVELS.MEDIUM.threshold) {
    return 'bg-yellow-50 dark:bg-yellow-900/20';
  }
  return 'bg-green-50 dark:bg-green-900/20';
};

export const getPerformanceDescription = (score) => {
  if (score === null || score === undefined || isNaN(score)) {
    return 'Belum ada penilaian';
  }
  
  if (score <= 40) return 'Perlu peningkatan signifikan';
  if (score <= 50) return 'Perlu ditingkatkan';
  if (score <= 60) return 'Cukup';
  if (score <= 70) return 'Memuaskan';
  if (score <= 80) return 'Baik';
  if (score <= 90) return 'Sangat baik';
  return 'Luar biasa';
};

export const getPerformancePercentage = (score, maxScore = 100) => {
  if (score === null || score === undefined || isNaN(score)) {
    return 0;
  }
  return Math.round((score / maxScore) * 100);
};

export const validateScore = (score) => {
  return score !== null && 
         score !== undefined && 
         !isNaN(score) && 
         score >= 0 && 
         score <= 100;
};
