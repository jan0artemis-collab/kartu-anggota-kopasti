import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMembers } from '../hooks/useMembers';
import { useDebounce } from '../hooks/useCommon';
import { SkeletonList } from './Loading';
import { DEFAULT_LIMIT, ANGKATAN_OPTIONS, SATUAN_OPTIONS } from '../constants';

const MemberList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAngkatan, setFilterAngkatan] = useState('');
  const [filterSatuan, setFilterSatuan] = useState('');
  const [offset, setOffset] = useState(0);

  // Debounce search query
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Memoize params to prevent unnecessary re-renders
  const params = useMemo(() => ({
    limit: DEFAULT_LIMIT,
    offset,
    ...(debouncedSearch && { q: debouncedSearch }),
    ...(filterAngkatan && { angkatan: filterAngkatan }),
    ...(filterSatuan && { satuan_terminal: filterSatuan })
  }), [offset, debouncedSearch, filterAngkatan, filterSatuan]);

  const { data: members, loading, error, total } = useMembers(params);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setOffset(0); // Reset to first page
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
    if (offset + DEFAULT_LIMIT < total) {
      setOffset(offset + DEFAULT_LIMIT);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (offset > 0) {
      setOffset(Math.max(0, offset - DEFAULT_LIMIT));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilterAngkatan('');
    setFilterSatuan('');
    setOffset(0);
  };

  const hasActiveFilters = searchQuery || filterAngkatan || filterSatuan;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-red-500 mb-4 text-center">
          <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-semibold">Error: {error}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Pastikan koneksi internet Anda stabil dan API sudah dikonfigurasi dengan benar.
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-tni-green text-white rounded hover:bg-tni-green/90 transition"
        >
          Muat Ulang
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 card-shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Cari nama atau nomor induk..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-tni-green focus:border-transparent dark:bg-gray-700 dark:text-white transition"
              aria-label="Pencarian anggota"
            />
          </div>
          
          <select
            value={filterAngkatan}
            onChange={handleFilterAngkatan}
            className="px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-tni-green focus:border-transparent dark:bg-gray-700 dark:text-white transition"
            aria-label="Filter angkatan"
          >
            <option value="">Semua Angkatan</option>
            {ANGKATAN_OPTIONS.map(ang => (
              <option key={ang} value={ang}>Angkatan {ang}</option>
            ))}
          </select>
          
          <select
            value={filterSatuan}
            onChange={handleFilterSatuan}
            className="px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-tni-green focus:border-transparent dark:bg-gray-700 dark:text-white transition"
            aria-label="Filter satuan"
          >
            <option value="">Semua Satuan</option>
            {SATUAN_OPTIONS.map(sat => (
              <option key={sat} value={sat}>{sat}</option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Menampilkan {members.length} dari {total} hasil
            </p>
            <button
              onClick={handleClearFilters}
              className="text-sm text-tni-green hover:text-tni-gold font-medium transition"
            >
              Hapus Filter
            </button>
          </div>
        )}
      </div>

      {/* Members grid */}
      {loading && members.length === 0 ? (
        <SkeletonList count={6} />
      ) : members.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-gray-600 dark:text-gray-400">
            {hasActiveFilters ? 'Tidak ada hasil yang ditemukan' : 'Belum ada data anggota'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map(member => (
            <Link
              key={member.id}
              to={`/member/${member.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden card-shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
              aria-label={`Lihat profil ${member.nama}`}
            >
              <div className="bg-gradient-to-r from-tni-green to-tni-green/80 text-white p-4">
                <h3 className="font-bold text-lg truncate" title={member.nama}>
                  {member.nama}
                </h3>
                <p className="text-sm opacity-90">{member.nomor_induk}</p>
              </div>
              <div className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Jabatan:</span>
                    <span className="text-gray-900 dark:text-white font-medium truncate ml-2" title={member.jabatan}>
                      {member.jabatan}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Satuan:</span>
                    <span className="text-gray-900 dark:text-white font-medium truncate ml-2" title={member.satuan_terminal}>
                      {member.satuan_terminal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Angkatan:</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {member.angkatan}
                    </span>
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
      )}

      {/* Pagination */}
      {total > DEFAULT_LIMIT && (
        <div className="flex justify-center items-center gap-4 bg-white dark:bg-gray-800 rounded-lg p-4 card-shadow">
          <button
            onClick={handlePrevPage}
            disabled={offset === 0 || loading}
            className="px-4 py-2 bg-tni-green text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-tni-green/90 transition"
            aria-label="Halaman sebelumnya"
          >
            ← Sebelumnya
          </button>
          <span className="text-gray-600 dark:text-gray-400">
            {offset + 1}-{Math.min(offset + DEFAULT_LIMIT, total)} dari {total}
          </span>
          <button
            onClick={handleNextPage}
            disabled={offset + DEFAULT_LIMIT >= total || loading}
            className="px-4 py-2 bg-tni-green text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-tni-green/90 transition"
            aria-label="Halaman selanjutnya"
          >
            Selanjutnya →
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(MemberList);
