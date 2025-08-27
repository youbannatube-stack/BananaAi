
import React from 'react';
import { BananaIcon } from './Icon';

interface HeaderProps {
    title: string;
    description: string;
}

export const Header: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <header className="w-full max-w-7xl text-center">
      <div className="inline-flex items-center gap-4">
        <BananaIcon className="w-10 h-10 text-yellow-400"/>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-300">
          {title}
        </h1>
      </div>
      <p className="mt-4 text-lg text-white">
        {description}
      </p>
    </header>
  );
};
