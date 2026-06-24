'use client';

import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { common, createLowlight } from 'lowlight';
import { useDebouncedCallback } from 'use-debounce';

import { EditorToolbar } from './editor-toolbar';

const lowlight = createLowlight(common);

interface TiptapTextEditorProps {
  content: string;
  className?: string;
  onChange: (html: string, plainText: string) => void;
}

export function TiptapTextEditor({ content, className, onChange }: TiptapTextEditorProps) {
  const debouncedOnChange = useDebouncedCallback((html: string, text: string) => {
    onChange(html, text);
  }, 300);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        languageClassPrefix: 'language-',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (editor.isEmpty) {
        debouncedOnChange('', '');
      } else {
        debouncedOnChange(editor.getHTML(), editor.getText());
      }
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[300px] max-h-[500px] overflow-y-auto w-full rounded-b-md border border-t-0 p-4 shadow-sm',
      },
    },
  });

  return (
    <div className="flex w-full flex-col rounded-md shadow-sm">
      <EditorToolbar editor={editor} />
      <EditorContent className={className} editor={editor} />
    </div>
  );
}
