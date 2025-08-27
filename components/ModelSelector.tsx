import React from 'react';
import { ModelIcon } from './Icon';

interface ModelSelectorProps {
  selectedModel: string;
  onSelectModel: (model: string) => void;
  disabled: boolean;
  label: string;
  models: { id: string; name: string }[];
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onSelectModel, disabled, label, models }) => {
  return (
    <div className="mb-6">
      <label id="model-selector-label" className="block text-sm font-medium text-white mb-2">
        {label}
      </label>
      <div className="grid grid-cols-1 gap-2">
        {models.map(({ id, name }) => {
          const isSelected = selectedModel === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectModel(id)}
              disabled={disabled}
              className={`w-full p-3 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-yellow-500 text-left flex items-center gap-3
                ${isSelected 
                  ? 'bg-yellow-500 text-black' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'
                }
                disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label={`Select model ${name}`}
            >
              <ModelIcon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};