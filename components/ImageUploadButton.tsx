import React, { useRef } from 'react';
import { UploadIcon } from './Icon';

interface ImageUploadButtonProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  buttonText: string;
}

export const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({ onChange, disabled, buttonText }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        onChange={onChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        disabled={disabled}
      />
      <button
        onClick={handleClick}
        disabled={disabled}
        className="w-full bg-transparent hover:bg-yellow-500/10 text-yellow-400 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 border border-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <UploadIcon className="w-5 h-5" />
        {buttonText}
      </button>
    </>
  );
};
