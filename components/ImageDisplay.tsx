import React from 'react';
import { Spinner } from './Spinner';
import { ImageIcon } from './Icon';

interface ImageDisplayProps {
  imageData: string | null;
  isLoading: boolean;
  operation: string | null;
  placeholderTitle: string;
  placeholderDescription: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageData, isLoading, operation, placeholderTitle, placeholderDescription }) => {
  return (
    <div className="w-full aspect-square bg-black/50 rounded-lg flex items-center justify-center relative border-2 border-dashed border-yellow-500/30 overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10 backdrop-blur-sm">
          <Spinner className="h-12 w-12 text-yellow-400" />
          <p className="text-white mt-4 text-lg font-semibold">{operation || 'Processing...'}</p>
        </div>
      )}
      {imageData ? (
        <img
          src={`data:image/png;base64,${imageData}`}
          alt="Generated or edited visual"
          className="object-contain w-full h-full"
        />
      ) : (
        <div className="text-center text-gray-400 flex flex-col items-center">
          <ImageIcon className="w-20 h-20 mb-4" />
          <h3 className="text-xl font-semibold text-white">{placeholderTitle}</h3>
          <p className="mt-1">{placeholderDescription}</p>
        </div>
      )}
    </div>
  );
};