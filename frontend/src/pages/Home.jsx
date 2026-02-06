import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberList from '../components/MemberList';
import QRScanner from '../components/QRScanner';
import { useDarkMode } from '../hooks/useCommon';
import { ERROR_MESSAGES } from '../constants';

const Home = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [darkMode, toggleDarkMode] = useDarkMode();
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
        alert(ERROR_MESSAGES.INVALID_QR);
      }
    } catch (err) {
      alert(ERROR_MESSAGES.INVALID_QR);
    }
    setShowScanner(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-tni-green to-tni-green/80 text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl md:text-3xl font-bold">KOPASTI YPIC</h1>
              <p className="text-sm md:text-base opacity-90">
                Kartu Anggota Digital - Banjarnegara
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowScanner(true)}
                className="bg-tni-gold hover:bg-tni-gold/90 text-tni-green font-semibold px-4 py-2 rounded transition flex items-center gap-2"
                aria-label="Scan QR Code"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                Scan QR
              </button>
              <button
                onClick={toggleDarkMode}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded transition"
                aria-label={darkMode ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
                title={darkMode ? 'Mode Terang' : 'Mode Gelap'}
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <MemberList />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2024 KOPASTI YPIC Banjarnegara. All rights reserved.</p>
        </div>
      </footer>

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
