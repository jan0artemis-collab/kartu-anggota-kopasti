import React from 'react';
import QRCodeGenerator from './QRCodeGenerator';

const MemberCard = ({ member, cardUrl }) => {
  const photoUrl = member.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.nama)}&size=200&background=2D5016&color=fff`;

  return (
    <div className="print-card bg-white dark:bg-gray-800 rounded-lg overflow-hidden card-shadow max-w-sm mx-auto">
      {/* Header with TNI-style design */}
      <div className="bg-gradient-to-r from-tni-green to-tni-green/80 text-white p-4">
        <div className="text-center mb-2">
          <h2 className="text-lg font-bold tracking-wide">KOPASTI YPIC</h2>
          <p className="text-xs">BANJARNEGARA</p>
        </div>
        <div className="border-t border-tni-gold/30 pt-2">
          <p className="text-center text-sm font-semibold">KARTU ANGGOTA</p>
        </div>
      </div>

      {/* Main content */}
      <div className="p-4">
        <div className="flex gap-4 mb-4">
          {/* Photo */}
          <div className="flex-shrink-0">
            <img
              src={photoUrl}
              alt={member.nama}
              className="w-24 h-24 object-cover rounded border-2 border-tni-gold"
            />
          </div>

          {/* Member info */}
          <div className="flex-1 text-sm">
            <div className="mb-2">
              <div className="text-xs text-gray-500 dark:text-gray-400">Nomor Induk</div>
              <div className="font-bold text-tni-green dark:text-tni-gold">{member.nomor_induk}</div>
            </div>
            <div className="mb-2">
              <div className="text-xs text-gray-500 dark:text-gray-400">Nama</div>
              <div className="font-semibold text-gray-900 dark:text-white">{member.nama}</div>
            </div>
            <div className="mb-2">
              <div className="text-xs text-gray-500 dark:text-gray-400">Jabatan</div>
              <div className="text-gray-700 dark:text-gray-300">{member.jabatan}</div>
            </div>
          </div>
        </div>

        {/* Additional info */}
        <div className="border-t dark:border-gray-700 pt-3 mb-3 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Satuan</div>
              <div className="text-gray-700 dark:text-gray-300 text-xs">{member.satuan_terminal}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Angkatan</div>
              <div className="text-gray-700 dark:text-gray-300 text-xs">{member.angkatan}</div>
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div className="border-t dark:border-gray-700 pt-3 flex flex-col items-center">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Scan untuk detail performa</div>
          <QRCodeGenerator url={cardUrl} size={120} />
        </div>

        {/* Average score badge */}
        {member.average_score > 0 && (
          <div className="mt-3 text-center">
            <div className="inline-block bg-tni-green text-white px-4 py-1 rounded-full">
              <span className="text-xs font-semibold">Rata-rata: {member.average_score}</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-100 dark:bg-gray-700 py-2 text-center">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Kartu anggota resmi KOPASTI YPIC Banjarnegara
        </p>
      </div>
    </div>
  );
};

export default MemberCard;
