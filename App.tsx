import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { ImageDisplay } from './components/ImageDisplay';
import { generateImage, editImage, getTextFromImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { DownloadButton } from './components/DownloadButton';
import { AspectRatioSelector } from './components/AspectRatioSelector';
import { HistoryPanel } from './components/HistoryPanel';
import { LanguageSelector } from './components/LanguageSelector';
import { ModelSelector } from './components/ModelSelector';
import { MultiImageUploader } from './components/MultiImageUploader';
import { translations } from './translations';
import { EditResult, HistoryItem, ReferenceImage } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [editPrompt, setEditPrompt] = useState<string>('');
  const [imageData, setImageData] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [model, setModel] = useState<string>('imagen-4.0-generate-001');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [referenceImages, setReferenceImages] = useState<ReferenceImage[]>([]);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState<boolean>(false);

  const t = useCallback((key: keyof typeof translations.en) => {
    return translations[language][key] || translations.en[key];
  }, [language]);

  const models = [
    { id: 'imagen-4.0-generate-001', name: t('imagen4ModelName') },
    { id: 'gemini-2.5-flash-image-preview', name: t('nanoBananaModelName') },
  ];

  const isImagenModel = model.startsWith('imagen');
  const isNanoBananaModel = model === 'gemini-2.5-flash-image-preview';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('gemini-image-history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (err) {
      console.error("Failed to load history from localStorage", err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('gemini-image-history', JSON.stringify(history));
    } catch (err) {
      console.error("Failed to save history to localStorage", err);
    }
  }, [history]);

  const handleGenerate = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a prompt to generate an image.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEditedText(null);
    setOperation(t('generatingStatus'));

    try {
      const result = await generateImage(prompt, aspectRatio, model, referenceImages);
      setImageData(result.base64);
      setMimeType(result.mimeType);

      const newHistoryItem: HistoryItem = {
        id: Date.now(),
        type: 'generate',
        prompt,
        imageData: result.base64,
        mimeType: result.mimeType,
        timestamp: new Date().toISOString(),
      };
      setHistory(prev => [newHistoryItem, ...prev.slice(0, 4)]);
      setPrompt('');
      setReferenceImages([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during image generation.');
    } finally {
      setIsLoading(false);
      setOperation(null);
    }
  }, [prompt, aspectRatio, model, referenceImages, t]);
  
  const handleEdit = useCallback(async () => {
    if (!editPrompt) {
      setError('Please enter a prompt to edit the image.');
      return;
    }
    if (!imageData || !mimeType) {
      setError('An image must be present to edit.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEditedText(null);
    setOperation(t('editingStatus'));

    try {
      const result: EditResult = await editImage(editPrompt, imageData, mimeType);
      if(result.base64) {
        const newMimeType = result.mimeType || 'image/png';
        setImageData(result.base64);
        setMimeType(newMimeType);

        const newHistoryItem: HistoryItem = {
          id: Date.now(),
          type: 'edit',
          prompt: editPrompt,
          imageData: result.base64,
          mimeType: newMimeType,
          timestamp: new Date().toISOString(),
        };
        setHistory(prev => [newHistoryItem, ...prev.slice(0, 4)]);
      }
      setEditedText(result.text);
      setEditPrompt('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during image editing.');
    } finally {
      setIsLoading(false);
      setOperation(null);
    }
  }, [editPrompt, imageData, mimeType, t]);

  const handleImageToText = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsAnalyzingImage(true);
    setError(null);
    setOperation(t('analyzingImageStatus'));
    
    try {
        const { base64, mimeType } = await fileToBase64(file);
        const generatedPrompt = await getTextFromImage(base64, mimeType);
        setPrompt(generatedPrompt);
    } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred during image analysis.');
    } finally {
        setIsAnalyzingImage(false);
        setOperation(null);
        if(event.target) {
          event.target.value = '';
        }
    }
  }, [t]);

  const handleReferenceImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages: ReferenceImage[] = [];
    const availableSlots = 4 - referenceImages.length;

    for (let i = 0; i < Math.min(files.length, availableSlots); i++) {
        const file = files[i];
        try {
            const { base64, mimeType } = await fileToBase64(file);
            newImages.push({ base64, mimeType, name: file.name });
        } catch (err) {
            setError(err instanceof Error ? err.message : `Failed to read file ${file.name}.`);
        }
    }
    setReferenceImages(prev => [...prev, ...newImages]);
  }, [referenceImages.length]);

  const handleRemoveReferenceImage = useCallback((index: number) => {
    setReferenceImages(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleStartOver = () => {
    setPrompt('');
    setEditPrompt('');
    setImageData(null);
    setMimeType(null);
    setEditedText(null);
    setError(null);
    setIsLoading(false);
    setOperation(null);
    setReferenceImages([]);
  };

  const handleLoadFromHistory = useCallback((item: HistoryItem) => {
    setImageData(item.imageData);
    setMimeType(item.mimeType);
    setEditedText(null);
    setError(null);
    setReferenceImages([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
       <div className="w-full max-w-7xl flex justify-end mb-4">
        <LanguageSelector language={language} onLanguageChange={setLanguage} />
      </div>
      <Header title={t('appName')} description={t('appDescription')} />
      <main className="w-full max-w-7xl flex-grow flex flex-col lg:flex-row gap-8 mt-8">
        <aside className="lg:w-1/3 w-full bg-gray-900/50 rounded-2xl p-6 shadow-2xl shadow-yellow-500/5 border border-yellow-500/20 flex flex-col h-fit">
          <div className="flex-grow">
            {!imageData ? (
              <>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 mb-4">{t('createImageTitle')}</h2>
                <p className="text-gray-300 mb-6">{t('createImageDescription')}</p>
                <ModelSelector
                  label={t('modelSelectorLabel')}
                  selectedModel={model}
                  onSelectModel={setModel}
                  disabled={isLoading}
                  models={models}
                />
                <AspectRatioSelector label={t('aspectRatioLabel')} selectedRatio={aspectRatio} onSelectRatio={setAspectRatio} disabled={!isImagenModel || isLoading} />
                <PromptForm
                  prompt={prompt}
                  setPrompt={setPrompt}
                  onSubmit={handleGenerate}
                  placeholder={t('generatePlaceholder')}
                  buttonText={t('generateButton')}
                  disabled={isLoading || isAnalyzingImage}
                  onImageToText={handleImageToText}
                  isAnalyzingImage={isAnalyzingImage}
                  imageToTextButtonText={t('imageToTextButton')}
                />
                 {isNanoBananaModel && (
                  <MultiImageUploader
                    images={referenceImages}
                    onUpload={handleReferenceImageUpload}
                    onRemove={handleRemoveReferenceImage}
                    disabled={isLoading}
                    translations={{
                      title: t('referenceImagesTitle'),
                      cta: t('referenceImagesCta'),
                      limit: t('referenceImagesLimit'),
                    }}
                  />
                )}
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 mb-4">{t('editImageTitle')}</h2>
                <p className="text-gray-300 mb-6">{t('editImageDescription')}</p>
                <PromptForm
                  prompt={editPrompt}
                  setPrompt={setEditPrompt}
                  onSubmit={handleEdit}
                  placeholder={t('editPlaceholder')}
                  buttonText={t('editButton')}
                  disabled={isLoading}
                />
              </>
            )}
          </div>
          {imageData && (
             <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleStartOver}
                disabled={isLoading}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V4a1 1 0 011-1zm10 8a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 111.885-.666A5.002 5.002 0 0014.001 13H11a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                {t('startOverButton')}
              </button>
              <DownloadButton imageData={imageData} mimeType={mimeType} disabled={isLoading} buttonText={t('downloadButton')} />
            </div>
          )}
          <div className="mt-8 border-t border-yellow-500/20 pt-6">
            <HistoryPanel history={history} onItemClick={handleLoadFromHistory} translations={{ title: t('historyTitle'), empty: t('historyEmpty'), generated: t('historyGenerated'), edited: t('historyEdited') }} />
          </div>
        </aside>

        <section className="lg:w-2/3 w-full bg-gray-900/50 rounded-2xl p-6 shadow-2xl shadow-yellow-500/5 border border-yellow-500/20 flex flex-col">
          {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-4">{error}</div>}
          <ImageDisplay 
            imageData={imageData} 
            isLoading={isLoading || isAnalyzingImage} 
            operation={operation}
            placeholderTitle={t('imagePlaceholderTitle')}
            placeholderDescription={t('imagePlaceholderDescription')}
          />
          {editedText && (
             <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border border-yellow-500/20">
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">{t('aiResponseTitle')}</h3>
                <p className="text-white whitespace-pre-wrap">{editedText}</p>
             </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;