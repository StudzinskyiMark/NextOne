'use client';

import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useDebouncedCallback } from 'use-debounce';

import { EditorToolbar } from '../tiptap/editor-toolbar';

interface TiptapRichEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export function TiptapTextEditor({ content, onChange }: TiptapRichEditorProps) {
  const debouncedOnChange = useDebouncedCallback((html: string) => {
    onChange(html);
  }, 500);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (editor.isEmpty) {
        debouncedOnChange('');
      } else {
        debouncedOnChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[300px] w-full rounded-b-md border border-t-0 border-input bg-background px-4 py-6 ring-offset-background',
      },
    },
  });

  return (
    <div className="flex w-full flex-col rounded-md shadow-sm">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
