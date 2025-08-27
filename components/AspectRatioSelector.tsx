import React from 'react';
import { 
  AspectRatioSquareIcon, 
  AspectRatioWideIcon, 
  AspectRatioTallIcon,
  AspectRatioStandardIcon,
  AspectRatioVerticalIcon
} from './Icon';

interface AspectRatioSelectorProps {
  selectedRatio: string;
  onSelectRatio: (ratio: string) => void;
  disabled: boolean;
  label: string;
}

const ratios = [
  { value: '1:1', icon: AspectRatioSquareIcon },
  { value: '16:9', icon: AspectRatioWideIcon },
  { value: '9:16', icon: AspectRatioTallIcon },
  { value: '4:3', icon: AspectRatioStandardIcon },
  { value: '3:4', icon: AspectRatioVerticalIcon },
];

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selectedRatio, onSelectRatio, disabled, label }) => {
  return (
    <div className="mb-6">
      <label id="aspect-ratio-label" className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <div role="radiogroup" aria-labelledby="aspect-ratio-label" className="grid grid-cols-5 gap-2 sm:gap-3">
        {ratios.map(({ value, icon: IconComponent }) => {
          const isSelected = selectedRatio === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectRatio(value)}
              disabled={disabled}
              className={`p-2 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-yellow-500
                ${isSelected 
                  ? 'bg-yellow-500 text-black' 
                  : 'bg-gray-900 text-yellow-400 hover:bg-gray-800 hover:text-yellow-300'
                }
                disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label={`Aspect ratio ${value}`}
            >
              <IconComponent className="w-6 h-6 mx-auto mb-1" />
              <span className="block text-xs font-mono">{value}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
