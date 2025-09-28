
import React from 'react';
import { DownloadIcon, SparklesIcon } from './icons';

interface ResultDisplayProps {
  isLoading: boolean;
  imageUrl: string | null;
  onDownload: () => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-slate-300">
        <SparklesIcon className="w-16 h-16 text-amber-400 animate-pulse" />
        <p className="mt-4 text-lg font-semibold animate-pulse">AI is crafting your look...</p>
        <p className="text-sm text-slate-400 mt-1">This may take a moment.</p>
    </div>
);

const Placeholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 p-8">
        <div className="w-24 h-24 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-slate-400">Your Masterpiece Awaits</h3>
        <p className="mt-2 max-w-sm">Upload images and click 'Create Try-On' to see the magic happen here.</p>
    </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, imageUrl, onDownload }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 shadow-2xl h-full flex flex-col">
      <h2 className="text-2xl font-semibold font-display text-amber-200 mb-4 text-center">Generated Image</h2>
      <div className="flex-grow aspect-w-1 aspect-h-1 bg-slate-900/50 rounded-lg flex items-center justify-center overflow-hidden">
        {isLoading ? <LoadingSpinner /> : imageUrl ? (
          <img src={imageUrl} alt="Virtual Try-On Result" className="w-full h-full object-contain" />
        ) : <Placeholder />}
      </div>
      {imageUrl && !isLoading && (
        <div className="mt-6 text-center">
            <button
                onClick={onDownload}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-800 bg-amber-300 rounded-full shadow-md hover:bg-amber-200 transition-colors duration-300"
            >
                <DownloadIcon />
                Download Image
            </button>
        </div>
      )}
    </div>
  );
};
