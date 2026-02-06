import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

const QRScanner = ({ onScan, onClose }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(false);
  const codeReaderRef = useRef(null);

  useEffect(() => {
    startScanning();
    return () => {
      stopScanning();
    };
  }, []);

  const startScanning = async () => {
    try {
      setScanning(true);
      const codeReader = new BrowserMultiFormatReader();
      codeReaderRef.current = codeReader;

      const videoInputDevices = await codeReader.listVideoInputDevices();
      
      if (videoInputDevices.length === 0) {
        setError('Tidak ada kamera yang ditemukan');
        return;
      }

      const selectedDeviceId = videoInputDevices[0].deviceId;

      await codeReader.decodeFromVideoDevice(
        selectedDeviceId,
        videoRef.current,
        (result, err) => {
          if (result) {
            onScan(result.getText());
            stopScanning();
          }
          if (err && !(err.name === 'NotFoundException')) {
            console.error(err);
          }
        }
      );
    } catch (err) {
      setError(`Error: ${err.message}`);
      setScanning(false);
    }
  };

  const stopScanning = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }
    setScanning(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold dark:text-white">Scan QR Code</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        
        {error ? (
          <div className="text-red-500 mb-4">{error}</div>
        ) : (
          <div className="relative">
            <video
              ref={videoRef}
              className="w-full rounded"
              autoPlay
              playsInline
            />
            {scanning && (
              <div className="absolute inset-0 border-2 border-tni-green rounded">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-tni-gold"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-tni-gold"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-tni-gold"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-tni-gold"></div>
              </div>
            )}
          </div>
        )}
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
          Arahkan kamera ke QR code
        </p>
      </div>
    </div>
  );
};

export default QRScanner;
