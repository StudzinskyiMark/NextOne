'use client';

import { useState } from 'react';

import parse, { DOMNode, Element, domToReact } from 'html-react-parser';
import { Check, Copy } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { cn } from '@/lib/utils';

interface PostHtmlRendererProps {
  html: string;
  className?: string;
}

export function PostHtmlRenderer({ html, className }: PostHtmlRendererProps) {
  const options = {
    replace: (domNode: DOMNode) => {
      // Знаходимо блок <pre>
      if (domNode instanceof Element && domNode.name === 'pre') {
        const codeNode = domNode.children.find(
          (child) => child instanceof Element && child.name === 'code'
        ) as Element | undefined;

        if (codeNode) {
          // Дістаємо мову з класу (TipTap зберігає її як language-js, language-html і т.д.)
          const nodeClassName = codeNode.attribs.class || '';
          const match = nodeClassName.match(/language-(\w+)/);
          const language = match ? match[1] : 'text';

          // Витягуємо чистий текст коду
          const codeString = domToReact(codeNode.children as DOMNode[]) as string;

          return <CustomCodeBlock language={language} code={codeString} />;
        }
      }
    },
  };

  return (
    <div
      className={cn(
        'prose prose-sm sm:prose-base dark:prose-invert max-w-none antialiased',
        className
      )}
    >
      {parse(html, options)}
    </div>
  );
}

// Внутрішній компонент для відмальовки самого блоку коду
function CustomCodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-muted/20 relative my-6 overflow-hidden rounded-xl border bg-[#1E1E1E] shadow-lg">
      <div className="flex items-center justify-between bg-zinc-900/50 px-4 py-2 text-xs text-zinc-400">
        <span className="font-mono tracking-wider uppercase">
          {language === 'text' ? 'Code' : language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
          title="Copy code"
        >
          {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1rem',
          backgroundColor: 'transparent',
          fontSize: '0.875rem',
        }}
      >
        {code.replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
}
