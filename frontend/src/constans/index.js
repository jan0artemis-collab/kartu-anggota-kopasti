// API Configuration
export const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbx5jXv2kE_w6lvryNWJixZ4AUvj9FxeU_nUV9Mk1RqoEGugmOKFhMAewaYISAYivirXRA/exec';
export const SPREADSHEET_ID = '1Qz8V11JuwdI32oOmMxbyizRulFKKCJqB2njC0FW-xIk';

// Pagination
export const DEFAULT_LIMIT = 20;
export const DEFAULT_OFFSET = 0;

// Cache duration (milliseconds)
export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Performance levels
export const PERFORMANCE_LEVELS = {
  LOW: { threshold: 40, label: 'Rendah', color: 'text-red-600' },
  MEDIUM: { threshold: 70, label: 'Sedang', color: 'text-yellow-600' },
  HIGH: { threshold: 100, label: 'Baik', color: 'text-green-600' }
};

// Criteria configuration
export const CRITERIA_CONFIG = [
  { key: 'kedisiplinan', label: 'Kedisiplinan' },
  { key: 'kepemimpinan', label: 'Kepemimpinan' },
  { key: 'kerajinan', label: 'Kerajinan' },
  { key: 'public_speaking', label: 'Public Speaking' },
  { key: 'teamwork', label: 'Teamwork' },
  { key: 'teknis_kopasti', label: 'Teknis KOPASTI' },
  { key: 'pengambilan_keputusan', label: 'Pengambilan Keputusan' },
  { key: 'kreativitas', label: 'Kreativitas' }
];

// Filter options
export const ANGKATAN_OPTIONS = ['2023', '2024', '2025'];
export const SATUAN_OPTIONS = [
  'Terminal Purwokerto',
  'Terminal Banjarnegara',
  'Terminal Purbalingga'
];

// Card dimensions (print)
export const CARD_DIMENSIONS = {
  width: '105mm',
  height: '148mm'
};

// QR Code configuration
export const QR_CONFIG = {
  size: 150,
  margin: 1,
  errorCorrectionLevel: 'M'
};

// Chart configuration
export const CHART_CONFIG = {
  minValue: 0,
  maxValue: 100,
  stepSize: 20,
  backgroundColor: 'rgba(45, 80, 22, 0.2)',
  borderColor: 'rgba(45, 80, 22, 1)',
  pointColor: 'rgba(212, 175, 55, 1)'
};

// Routes
export const ROUTES = {
  HOME: '/',
  MEMBER: '/member/:id'
};

// Local storage keys
export const STORAGE_KEYS = {
  DARK_MODE: 'kopasti_dark_mode',
  LAST_SEARCH: 'kopasti_last_search'
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
  NOT_FOUND: 'Data tidak ditemukan.',
  INVALID_QR: 'QR Code tidak valid.',
  CAMERA_ERROR: 'Tidak dapat mengakses kamera.',
  GENERIC_ERROR: 'Terjadi kesalahan. Silakan coba lagi.'
};
