import { useState, useTransition } from 'react';

import { api } from '@/convex/_generated/api';
import { useAction } from 'convex/react';
import { toast } from 'sonner';

// Перевір правильність шляху до твого api

export const useGenerateTitles = () => {
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Ініціалізуємо Convex Action
  const generateAiTitles = useAction(api.groq.generateTitles);

  const handleGenerate = (content: string) => {
    // Базова перевірка на клієнті, щоб не смикати сервер даремно
    if (!content || content.length < 50) {
      toast.error('Please write a bit more text for the AI to analyze context.', {
        position: 'top-center',
      });
      return;
    }

    startTransition(async () => {
      try {
        const titles = await generateAiTitles({ content });
        setSuggestions(titles);
        //   toast.success('Titles successfully generated!', { position: 'top-center' });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to generate titles.';
        toast.error(errorMessage, { position: 'top-center' });
        console.error(error);
      }
    });
  };

  const clearSuggestions = () => setSuggestions([]);

  return {
    isGenerating: isPending,
    suggestions,
    handleGenerate,
    clearSuggestions,
  };
};
