import React from 'react';

interface LanguageSelectorProps {
  language: 'en' | 'ar';
  onLanguageChange: (lang: 'en' | 'ar') => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onLanguageChange }) => {
  const baseClasses = 'px-4 py-1 rounded-md text-sm font-medium transition-colors';
  const activeClasses = 'bg-yellow-500 text-black';
  const inactiveClasses = 'text-gray-300 hover:bg-gray-700';

  return (
    <div className="flex items-center space-x-2 bg-gray-800 p-1 rounded-lg">
      <button
        onClick={() => onLanguageChange('en')}
        className={`${baseClasses} ${language === 'en' ? activeClasses : inactiveClasses}`}
        aria-pressed={language === 'en'}
      >
        English
      </button>
      <button
        onClick={() => onLanguageChange('ar')}
        className={`${baseClasses} ${language === 'ar' ? activeClasses : inactiveClasses}`}
        aria-pressed={language === 'ar'}
      >
        العربية
      </button>
    </div>
  );
};
