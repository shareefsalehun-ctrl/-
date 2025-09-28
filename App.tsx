
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { PersonIcon, DressIcon, SparklesIcon } from './components/icons';
import { generateTryOnImage } from './services/geminiService';

const App: React.FC = () => {
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [dressImage, setDressImage] = useState<File | null>(null);
  const [modelPreview, setModelPreview] = useState<string | null>(null);
  const [dressPreview, setDressPreview] = useState<string | null>(null);
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleModelImageChange = (file: File) => {
    setModelImage(file);
    setModelPreview(URL.createObjectURL(file));
  };

  const handleDressImageChange = (file: File) => {
    setDressImage(file);
    setDressPreview(URL.createObjectURL(file));
  };

  const handleGenerateClick = useCallback(async () => {
    if (!modelImage || !dressImage) {
      setError('Please upload both a model and a dress image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateTryOnImage(modelImage, dressImage);
      setGeneratedImage(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [modelImage, dressImage]);
  
  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'virtual-try-on-result.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="min-h-screen bg-slate-900 bg-gradient-to-br from-slate-900 to-teal-900/40 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-amber-300 tracking-wider">
            حريم السلطان
          </h1>
          <p className="text-slate-300 mt-2 text-lg sm:text-xl font-display">
            Virtual Fashion Try-On
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-8">
            <ImageUploader
              id="model-uploader"
              title="Model Image"
              icon={<PersonIcon />}
              onFileChange={handleModelImageChange}
              previewUrl={modelPreview}
              ctaText="Upload Photo of Person"
            />
            <ImageUploader
              id="dress-uploader"
              title="Dress Image"
              icon={<DressIcon />}
              onFileChange={handleDressImageChange}
              previewUrl={dressPreview}
              ctaText="Upload Photo of Dress"
            />
          </div>

          <div className="flex flex-col">
            <ResultDisplay
              isLoading={isLoading}
              imageUrl={generatedImage}
              onDownload={handleDownload}
            />
          </div>
        </main>
        
        <div className="mt-8 flex flex-col items-center">
            <button
                onClick={handleGenerateClick}
                disabled={isLoading || !modelImage || !dressImage}
                className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 bg-amber-400 rounded-full shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 group"
            >
                <span className="absolute inset-0 bg-amber-300 transition-transform duration-300 ease-in-out group-hover:translate-x-full"></span>
                <span className="relative flex items-center gap-2">
                    <SparklesIcon />
                    {isLoading ? 'Generating...' : 'Create Try-On'}
                </span>
            </button>
            {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        </div>

      </div>
    </div>
  );
};

export default App;
