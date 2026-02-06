import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import MemberCard from '../components/MemberCard';
import RadarChart from '../components/RadarChart';
import CriteriaDetailModal from '../components/CriteriaDetailModal';
import { getPerformanceLevel, getPerformanceColor } from '../utils/performance';

const SPREADSHEET_ID = '1Qz8V11JuwdI32oOmMxbyizRulFKKCJqB2njC0FW-xIk';

const MemberPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCriterion, setSelectedCriterion] = useState(null);

  useEffect(() => {
    fetchMember();
  }, [id]);

  const fetchMember = async () => {
    try {
      setLoading(true);
      const data = await api.getMemberById(id);
      if (!data || !data.id) {
        setError('Anggota tidak ditemukan');
      } else {
        setMember(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSegmentClick = (criterion) => {
    setSelectedCriterion(criterion);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="text-gray-600 dark:text-gray-400">Memuat data...</div>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error || 'Data tidak ditemukan'}</div>
          <button
            onClick={() => navigate('/')}
            className="bg-tni-green text-white px-6 py-2 rounded hover:bg-tni-green/90"
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
              onClick={() => navigate('/')}
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <span className="text-xl">←</span>
              <span className="font-semibold">Kembali</span>
            </button>
            <button
              onClick={handlePrint}
              className="bg-tni-gold hover:bg-tni-gold/90 text-tni-green font-semibold px-4 py-2 rounded transition"
            >
              🖨️ Cetak Kartu
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
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Kriteria</th>
                  <th className="text-center py-3 px-4 text-gray-700 dark:text-gray-300">Skor</th>
                  <th className="text-center py-3 px-4 text-gray-700 dark:text-gray-300">Tingkat</th>
                  <th className="text-center py-3 px-4 text-gray-700 dark:text-gray-300">Referensi</th>
                  <th className="text-center py-3 px-4 text-gray-700 dark:text-gray-300">Aksi</th>
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
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getPerformanceColor(criterion.value)}`}>
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
                        className="text-tni-green hover:text-tni-gold font-semibold text-sm"
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
