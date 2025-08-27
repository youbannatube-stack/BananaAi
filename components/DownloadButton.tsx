import React from 'react';
import { DownloadIcon } from './Icon';

interface DownloadButtonProps {
  imageData: string | null;
  mimeType: string | null;
  disabled: boolean;
  buttonText: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ imageData, mimeType, disabled, buttonText }) => {
  const handleDownload = () => {
    if (!imageData || !mimeType) return;

    const link = document.createElement('a');
    link.href = `data:${mimeType};base64,${imageData}`;
    const fileExtension = mimeType.split('/')[1] || 'png';
    link.download = `gemini-image.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={disabled || !imageData}
      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      <DownloadIcon className="w-5 h-5" />
      {buttonText}
    </button>
  );
};
