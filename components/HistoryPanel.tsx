import React from 'react';
import { HistoryItem } from '../types';
import { HistoryIcon } from './Icon';

interface HistoryPanelProps {
  history: HistoryItem[];
  onItemClick: (item: HistoryItem) => void;
  translations: {
    title: string;
    empty: string;
    generated: string;
    edited: string;
  }
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onItemClick, translations }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <HistoryIcon className="w-6 h-6 text-gray-300" />
        {translations.title}
      </h3>
      {history.length === 0 ? (
        <p className="text-gray-400 text-sm bg-gray-900/50 p-4 rounded-lg text-center">
          {translations.empty}
        </p>
      ) : (
        <ul className="space-y-3 max-h-96 overflow-y-auto pr-2 -mr-2 rtl:pr-0 rtl:-mr-0 rtl:pl-2 rtl:-ml-2">
          {history.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onItemClick(item)}
                className="w-full flex items-center gap-4 p-3 rounded-lg bg-gray-900/50 hover:bg-gray-800 transition-colors duration-200 text-left focus:outline-none focus:ring-2 focus:ring-yellow-500"
                aria-label={`Load image from prompt: ${item.prompt}`}
              >
                <img
                  src={`data:${item.mimeType};base64,${item.imageData}`}
                  alt={item.prompt}
                  className="w-16 h-16 rounded-md object-cover bg-black flex-shrink-0"
                />
                <div className="flex-grow overflow-hidden">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    item.type === 'generate' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {item.type === 'generate' ? translations.generated : translations.edited}
                  </span>
                  <p className="text-sm text-white mt-2 truncate" title={item.prompt}>
                    {item.prompt}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
