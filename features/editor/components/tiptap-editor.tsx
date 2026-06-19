'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface TiptapRichEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export function TiptapRichEditor({ content, onChange }: TiptapRichEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      // Передаємо HTML-рядок наверх у форму (Zod / React Hook Form)
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert focus:outline-none min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
      },
    },
  });

  return (
    <div className="w-full space-y-2">
      {/* Тут у майбутньому буде наш Toolbar з кнопками Bold, Italic тощо */}
      <div className="rounded-t-md border bg-muted/50 p-2 text-xs text-muted-foreground">
        Toolbar Placeholder (Coming soon...)
      </div>
      
      {/* Сам інпут редактора */}
      <EditorContent editor={editor} />
    </div>
  );
}