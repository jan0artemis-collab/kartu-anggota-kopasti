import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = ({ url, size = 150 }) => {
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url || !canvasRef.current) return;

    QRCode.toCanvas(
      canvasRef.current,
      url,
      {
        width: size,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      },
      (err) => {
        if (err) setError(err.message);
      }
    );
  }, [url, size]);

  if (error) {
    return <div className="text-red-500 text-sm">Error: {error}</div>;
  }

  return <canvas ref={canvasRef} className="mx-auto" />;
};

export default QRCodeGenerator;
