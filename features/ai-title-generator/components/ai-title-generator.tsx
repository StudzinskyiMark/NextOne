'use client';

import { Loader2, RefreshCw, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useGenerateTitles } from '../model/use-generate-titles';

interface AiTitleGeneratorProps {
  // Змінили тип на функцію для отримання тексту "на вимогу"
  getPostContent: () => string;
  onSelectTitle: (title: string) => void;
}

export function AiTitleGenerator({ getPostContent, onSelectTitle }: AiTitleGeneratorProps) {
  const { isGenerating, suggestions, handleGenerate, clearSuggestions } = useGenerateTitles();

  return (
    <div className="bg-muted/20 my-2 space-y-3 rounded-xl border p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h4 className="flex items-center gap-1.5 text-sm font-medium tracking-tight">
            <Sparkles className="size-4 text-emerald-600" />
            AI Title Generator
          </h4>
          <p className="text-muted-foreground text-xs">
            Generate 3 engaging titles based on your content.
          </p>
        </div>

        <Button
          type="button"
          variant={suggestions.length > 0 ? 'outline' : 'default'}
          size="sm"
          disabled={isGenerating}
          onClick={() => handleGenerate(getPostContent())}
          className="shrink-0 gap-2"
        >
          {isGenerating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : suggestions.length > 0 ? (
            <RefreshCw className="size-4" />
          ) : (
            <Sparkles className="size-4" />
          )}
          <span>{suggestions.length > 0 ? 'Regenerate' : 'Generate'}</span>
        </Button>
      </div>

      {suggestions.length > 0 && (
        <div className="animate-in fade-in slide-in-from-top-1 flex flex-col gap-2 pt-2 duration-1000">
          <p className="text-muted-foreground text-xs font-medium">Select a title to apply:</p>
          {suggestions.map((title, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                onSelectTitle(title);
                clearSuggestions();
              }}
              className="bg-card hover:bg-accent rounded-lg border p-3 text-left text-sm transition-colors active:scale-[0.99]"
            >
              {title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
