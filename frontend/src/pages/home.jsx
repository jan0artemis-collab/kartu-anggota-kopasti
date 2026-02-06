import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberList from '../components/MemberList';
import QRScanner from '../components/QRScanner';

const Home = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleScan = (text) => {
    try {
      const url = new URL(text);
      const pathParts = url.pathname.split('/');
      const memberIndex = pathParts.indexOf('member');
      if (memberIndex !== -1 && pathParts[memberIndex + 1]) {
        const memberId = pathParts[memberIndex + 1];
        navigate(`/member/${memberId}`);
      } else {
        alert('QR Code tidak valid');
      }
    } catch (err) {
      alert('QR Code tidak valid');
    }
    setShowScanner(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-tni-green to-tni-green/80 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">KOPASTI YPIC</h1>
              <p className="text-sm md:text-base opacity-90">Kartu Anggota Digital - Banjarnegara</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowScanner(true)}
                className="bg-tni-gold hover:bg-tni-gold/90 text-tni-green font-semibold px-4 py-2 rounded transition"
              >
                📷 Scan QR
              </button>
              <button
                onClick={toggleDarkMode}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded transition"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <MemberList />
      </main>

      {/* Scanner modal */}
      {showScanner && (
        <QRScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
};

export default Home;
