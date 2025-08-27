
import React from 'react';

interface IconProps {
    className?: string;
}

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

export const GenerateIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

export const EditIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);


export const UploadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export const ImageIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

export const HistoryIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const AspectRatioSquareIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
);

export const AspectRatioWideIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect></svg>
);

export const AspectRatioTallIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="7" y="2" width="10" height="20" rx="2" ry="2"></rect></svg>
);

export const AspectRatioStandardIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect></svg>
);

export const AspectRatioVerticalIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="6" y="2" width="12" height="20" rx="2" ry="2"></rect></svg>
);

export const BananaIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 200 200">
      <g stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path fill="#795548" d="M91.4 23.8c-2.3-2-5.9-2.5-8.7-.9-6.3 3.6-7.8 11.2-5.4 17.5l14 15.6c2.4 6.3.9 13.9-5.4 17.5-2.8 1.6-6.4 1.1-8.7-.9l-5-4.4c-2.3-2-2.8-5.5-.9-8.2l14-23c2-2.7 1.4-6.6-1.3-8.6l-2.6-2.2z"/>
        <path fill="#FFF8E1" d="M125.8 49.3c-1.1-7.8-15.3-25.5-21.7-29.3-15.6-9.2-28.5-4.3-33.8 2.3-13.8 16.9-4.3 46.8-4.3 46.8s15.3 12.1 27.5-2.8c12.1-14.8-1-31 6.3-36.1 7.4-5.1 23.3-1.6 26 19.3z"/>
        <path fill="#FFF8E1" d="M165.7 89.1c-9.1-8.7-27-21.2-34.8-26.6-18.9-13.2-32.9-1.6-32.9-1.6s2.6 15.8 19.8 29.8C135.1 104 158.3 114 158.3 114s16.6-12.7 7.4-24.9z"/>
        <path fill="#FFF8E1" d="M47.7 83.3c7.8-10.8 24.9-22.7 34.3-27.1 22.9-10.8 36.6 2.1 36.6 2.1s-7.8 15.8-26.5 24.4c-18.7 8.7-41.5 13.8-41.5 13.8s-11-2.6-2.9-13.2z"/>
        <path fill="#FFF8E1" d="M153.9 140.9c-11.4-8.7-27-14.3-34.8-13.2-18.9 2.6-26 21.2-26 21.2s16.1 10.3 33.3-2.6c17.2-12.7-2.6-28.2 8.2-33.4 10.8-5.1 40.5 12.1 19.3 28z"/>
        <path fill="#FFC107" d="M174 106.8c-14.8-13.2-30.6-24.9-50.9-26-30.1-1.6-53.7 20.2-64.4 34.8-22.3 30.6-2.1 73.7 5.1 82.3 7.3 8.7 52.9 14.8 77.4-12.1 24.4-27.1 23.9-63.7 23.9-63.7s-8.7-12.7-15.1-14.3c-6.3-1.5-12.7 1-16.1 3.6z"/>
        <path fill="#795548" d="M47.1 189.9a11.5 11.5 0 01-1.3 16.3 11.5 11.5 0 01-16.3-1.3 11.5 11.5 0 011.3-16.3 11.5 11.5 0 0116.3 1.3z"/>
      </g>
    </svg>
);

export const ModelIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15V12.5C5 10.0147 7.01472 8 9.5 8H14.5C16.9853 8 19 10.0147 19 12.5V15M12 18V15M9 21H15M12 3V6M21 12H18M6 12H3M5.63604 5.63604L7.75736 7.75736M16.2426 16.2426L18.364 18.364M18.364 5.63604L16.2426 7.75736M7.75736 16.2426L5.63604 18.364" />
    </svg>
);

export const AddImageIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const ImageToTextIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6h.008v.008h-.008V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 12.75l3.75-3.75-3.75-3.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 9H12" />
    </svg>
);