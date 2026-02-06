import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAngkatan, setFilterAngkatan] = useState('');
  const [filterSatuan, setFilterSatuan] = useState('');
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 20;

  const angkatanOptions = ['2023', '2024', '2025'];
  const satuanOptions = ['Terminal Purwokerto', 'Terminal Banjarnegara', 'Terminal Purbalingga'];

  useEffect(() => {
    fetchMembers();
  }, [searchQuery, filterAngkatan, filterSatuan, offset]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const params = {
        limit,
        offset,
        ...(searchQuery && { q: searchQuery }),
        ...(filterAngkatan && { angkatan: filterAngkatan }),
        ...(filterSatuan && { satuan_terminal: filterSatuan })
      };
      
      const response = await api.getMembers(params);
      setMembers(response.data || []);
      setTotal(response.total || 0);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setOffset(0);
  };

  const handleFilterAngkatan = (e) => {
    setFilterAngkatan(e.target.value);
    setOffset(0);
  };

  const handleFilterSatuan = (e) => {
    setFilterSatuan(e.target.value);
    setOffset(0);
  };

  const handleNextPage = () => {
    if (offset + limit < total) {
      setOffset(offset + limit);
    }
  };

  const handlePrevPage = () => {
    if (offset > 0) {
      setOffset(Math.max(0, offset - limit));
    }
  };

  if (loading && members.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600 dark:text-gray-400">Memuat data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 card-shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Cari nama atau nomor induk..."
            value={searchQuery}
            onChange={handleSearch}
            className="px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-tni-green dark:bg-gray-700 dark:text-white"
          />
          
          <select
            value={filterAngkatan}
            onChange={handleFilterAngkatan}
            className="px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-tni-green dark:bg-gray-700 dark:text-white"
          >
            <option value="">Semua Angkatan</option>
            {angkatanOptions.map(ang => (
              <option key={ang} value={ang}>{ang}</option>
            ))}
          </select>
          
          <select
            value={filterSatuan}
            onChange={handleFilterSatuan}
            className="px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-tni-green dark:bg-gray-700 dark:text-white"
          >
            <option value="">Semua Satuan</option>
            {satuanOptions.map(sat => (
              <option key={sat} value={sat}>{sat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Members grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map(member => (
          <Link
            key={member.id}
            to={`/member/${member.id}`}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden card-shadow hover:shadow-lg transition"
          >
            <div className="bg-gradient-to-r from-tni-green to-tni-green/80 text-white p-4">
              <h3 className="font-bold text-lg">{member.nama}</h3>
              <p className="text-sm opacity-90">{member.nomor_induk}</p>
            </div>
            <div className="p-4">
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Jabatan:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{member.jabatan}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Satuan:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{member.satuan_terminal}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Angkatan:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{member.angkatan}</span>
                </div>
              </div>
              {member.average_score > 0 && (
                <div className="mt-3 pt-3 border-t dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Rata-rata:</span>
                    <span className="text-lg font-bold text-tni-green dark:text-tni-gold">
                      {member.average_score}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {total > limit && (
        <div className="flex justify-center items-center gap-4 bg-white dark:bg-gray-800 rounded-lg p-4 card-shadow">
          <button
            onClick={handlePrevPage}
            disabled={offset === 0}
            className="px-4 py-2 bg-tni-green text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-tni-green/90"
          >
            ← Sebelumnya
          </button>
          <span className="text-gray-600 dark:text-gray-400">
            Menampilkan {offset + 1}-{Math.min(offset + limit, total)} dari {total}
          </span>
          <button
            onClick={handleNextPage}
            disabled={offset + limit >= total}
            className="px-4 py-2 bg-tni-green text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-tni-green/90"
          >
            Selanjutnya →
          </button>
        </div>
      )}
    </div>
  );
};

export default MemberList;
