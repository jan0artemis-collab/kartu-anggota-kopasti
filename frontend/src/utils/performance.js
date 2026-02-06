export const getPerformanceLevel = (score) => {
  if (score === null || score === undefined) return 'N/A';
  if (score <= 40) return 'Rendah';
  if (score <= 70) return 'Sedang';
  return 'Baik';
};

export const getPerformanceColor = (score) => {
  if (score === null || score === undefined) return 'text-gray-400';
  if (score <= 40) return 'text-red-600';
  if (score <= 70) return 'text-yellow-600';
  return 'text-green-600';
};

export const getPerformanceDescription = (score) => {
  if (score === null || score === undefined) return 'Belum ada penilaian';
  if (score <= 40) return 'Perlu peningkatan signifikan';
  if (score <= 60) return 'Cukup, perlu ditingkatkan';
  if (score <= 70) return 'Memuaskan';
  if (score <= 85) return 'Baik';
  return 'Sangat baik';
};
