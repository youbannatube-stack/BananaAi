import React, { useRef } from 'react';
import { AddImageIcon, CloseIcon } from './Icon';
import { ReferenceImage } from '../types';

interface MultiImageUploaderProps {
  images: ReferenceImage[];
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
  disabled: boolean;
  translations: {
    title: string;
    cta: string;
    limit: string;
  };
}

const MAX_IMAGES = 4;

export const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({ images, onUpload, onRemove, disabled, translations }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCtaClick = () => {
    inputRef.current?.click();
  };

  const canUploadMore = images.length < MAX_IMAGES;

  return (
    <div className="my-6">
       <input
        type="file"
        ref={inputRef}
        onChange={onUpload}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        multiple
        disabled={disabled || !canUploadMore}
      />
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {translations.title}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={`data:${image.mimeType};base64,${image.base64}`}
              alt={image.name}
              className="w-full h-24 object-cover rounded-lg"
            />
            <button
              onClick={() => onRemove(index)}
              disabled={disabled}
              className="absolute top-1 right-1 rtl:right-auto rtl:left-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
              aria-label={`Remove ${image.name}`}
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
        {canUploadMore && (
           <button
            type="button"
            onClick={handleCtaClick}
            disabled={disabled}
            className="w-full h-24 bg-black/50 border-2 border-dashed border-yellow-500/30 rounded-lg flex flex-col items-center justify-center text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <AddImageIcon className="w-8 h-8" />
            <span className="text-xs mt-1">{translations.cta}</span>
          </button>
        )}
      </div>
      {images.length > 0 && (
        <p className="text-xs text-gray-400 mt-2">
          {images.length} / {MAX_IMAGES} {translations.limit.split(' ').slice(5).join(' ')}
        </p>
      )}
    </div>
  );
};
