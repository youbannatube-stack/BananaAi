import React, { useRef } from 'react';
import { GenerateIcon, EditIcon, ImageToTextIcon } from './Icon';
import { Spinner } from './Spinner';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  placeholder: string;
  buttonText: string;
  disabled: boolean;
  onImageToText?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isAnalyzingImage?: boolean;
  imageToTextButtonText?: string;
}

export const PromptForm: React.FC<PromptFormProps> = ({ 
  prompt, 
  setPrompt, 
  onSubmit, 
  placeholder, 
  buttonText, 
  disabled,
  onImageToText,
  isAnalyzingImage,
  imageToTextButtonText
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleImageToTextClick = () => {
    fileInputRef.current?.click();
  };

  const isEdit = buttonText.toLowerCase().includes('edit') || buttonText.toLowerCase().includes('تعديل');
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        {onImageToText && (
          <>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onImageToText}
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
              disabled={disabled || isAnalyzingImage}
            />
            <button
              type="button"
              onClick={handleImageToTextClick}
              disabled={disabled || isAnalyzingImage}
              className="absolute top-2 left-2 rtl:left-auto rtl:right-2 p-2 rounded-lg bg-black/70 hover:bg-black/90 text-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed z-10"
              aria-label={imageToTextButtonText}
              title={imageToTextButtonText}
            >
              {isAnalyzingImage ? <Spinner className="w-5 h-5 text-yellow-400" /> : <ImageToTextIcon className="w-5 h-5" />}
            </button>
          </>
        )}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={3}
          className={`w-full p-3 bg-black/50 border-2 border-yellow-500/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200 ease-in-out resize-none disabled:opacity-50 ${onImageToText ? 'pl-14 rtl:pl-3 rtl:pr-14' : ''}`}
        />
      </div>
      <button
        type="submit"
        disabled={disabled}
        className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center gap-2
          bg-yellow-500 hover:bg-yellow-600 text-black
          disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-yellow-500/50`}
      >
        {isEdit ? <EditIcon className="w-5 h-5" /> : <GenerateIcon className="w-5 h-5" />}
        {buttonText}
      </button>
    </form>
  );
};