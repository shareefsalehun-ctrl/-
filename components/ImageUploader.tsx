
import React, { useRef } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  onFileChange: (file: File) => void;
  previewUrl: string | null;
  ctaText: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ id, title, icon, onFileChange, previewUrl, ctaText }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 shadow-2xl h-full flex flex-col">
      <h2 className="text-2xl font-semibold font-display text-amber-200 mb-4 text-center">{title}</h2>
      <div 
        className="flex-grow aspect-w-1 aspect-h-1 bg-slate-900/50 rounded-lg flex items-center justify-center cursor-pointer group relative overflow-hidden border-2 border-dashed border-slate-600 hover:border-amber-400 transition-colors duration-300"
        onClick={handleClick}
      >
        <input
          type="file"
          id={id}
          ref={inputRef}
          onChange={handleFileSelect}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
        />
        {previewUrl ? (
          <>
            <img src={previewUrl} alt={title} className="w-full h-full object-contain" />
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-center text-white p-4">
                <UploadIcon className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Change Image</p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-slate-400">
            <div className="w-16 h-16 mx-auto text-slate-500 group-hover:text-amber-400 transition-colors duration-300">
                {icon}
            </div>
            <p className="mt-2 font-medium">{ctaText}</p>
            <p className="text-sm text-slate-500">Click to browse</p>
          </div>
        )}
      </div>
    </div>
  );
};
