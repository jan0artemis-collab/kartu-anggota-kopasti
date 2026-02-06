import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMember } from '../hooks/useMembers';
import MemberCard from '../components/MemberCard';
import RadarChart from '../components/RadarChart';
import CriteriaDetailModal from '../components/CriteriaDetailModal';
import { LoadingScreen, SkeletonMemberCard } from '../components/Loading';
import { getPerformanceLevel, getPerformanceColor } from '../utils/performance';
import { SPREADSHEET_ID } from '../constants';

const MemberPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { member, loading, error } = useMember(id);
  const [selectedCriterion, setSelectedCriterion] = useState(null);

  const handleSegmentClick = useCallback((criterion) => {
    setSelectedCriterion(criterion);
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-gradient-to-r from-tni-green to-tni-green/80 text-white shadow-lg no-print">
          <div className="container mx-auto px-4 py-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <span className="text-xl">←</span>
              <span className="font-semibold">Kembali</span>
            </button>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SkeletonMemberCard />
            <SkeletonMemberCard />
          </div>
        </main>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="text-center max-w-md p-8">
          <svg className="w-20 h-20 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Data Tidak Ditemukan
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || 'Anggota dengan ID tersebut tidak ditemukan di sistem.'}
          </p>
          <button
            onClick={handleBack}
            className="bg-tni-green text-white px-6 py-2 rounded hover:bg-tni-green/90 transition"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const cardUrl = `${window.location.origin}/member/${member.id}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-tni-green to-tni-green/80 text-white shadow-lg no-print">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 hover:opacity-80 transition"
              aria-label="Kembali ke beranda"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-semibold">Kembali</span>
            </button>
            <button
              onClick={handlePrint}
              className="bg-tni-gold hover:bg-tni-gold/90 text-tni-green font-semibold px-4 py-2 rounded transition flex items-center gap-2"
              aria-label="Cetak kartu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak Kartu
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Member Card */}
          <div>
            <MemberCard member={member} cardUrl={cardUrl} />
          </div>

          {/* Performance Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 card-shadow no-print">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Grafik Performa
            </h2>
            
            <RadarChart
              criteria={member.criteria_list}
              onSegmentClick={handleSegmentClick}
            />

            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
              Klik pada titik grafik untuk melihat detail
            </p>
          </div>
        </div>

        {/* Criteria Table */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 card-shadow no-print">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Rincian Kriteria Penilaian
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">
                    Kriteria
                  </th>
                  <th className="text-center py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">
                    Skor
                  </th>
                  <th className="text-center py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">
                    Tingkat
                  </th>
                  <th className="text-center py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">
                    Referensi
                  </th>
                  <th className="text-center py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {member.criteria_list.map((criterion, index) => (
                  <tr
                    key={index}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      {criterion.label}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`font-bold ${getPerformanceColor(criterion.value)}`}>
                        {criterion.value !== null ? criterion.value : 'N/A'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getPerformanceColor(criterion.value)} bg-opacity-10`}>
                        {getPerformanceLevel(criterion.value)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
                        {criterion.cellRef}
                      </code>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleSegmentClick(criterion)}
                        className="text-tni-green hover:text-tni-gold font-semibold text-sm transition"
                        aria-label={`Detail ${criterion.label}`}
                      >
                        Detail →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-6 bg-tni-green/5 dark:bg-tni-green/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300 font-semibold">
                Rata-rata Keseluruhan:
              </span>
              <span className="text-3xl font-bold text-tni-green dark:text-tni-gold">
                {member.average_score}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {selectedCriterion && (
        <CriteriaDetailModal
          criterion={selectedCriterion}
          onClose={() => setSelectedCriterion(null)}
          spreadsheetId={SPREADSHEET_ID}
        />
      )}
    </div>
  );
};

export default MemberPage;
