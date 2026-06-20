'use client';

import { Editor } from '@tiptap/react';
import { ChevronDown, Heading1, Heading2, Heading3, Type } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

import {
  getAlignmentOptions,
  getFormattingButtons,
  getListButtons,
} from '../../constants/toolbar-options';

interface EditorToolbarProps {
  editor: Editor | null;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null;

  const formattingButtons = getFormattingButtons(editor);
  const listButtons = getListButtons(editor);
  const alignmentOptions = getAlignmentOptions(editor);

  const getCurrentHeading = () => {
    if (editor.isActive('heading', { level: 1 })) return 'Heading 1';
    if (editor.isActive('heading', { level: 2 })) return 'Heading 2';
    if (editor.isActive('heading', { level: 3 })) return 'Heading 3';
    return 'Normal text';
  };

  return (
    <div className="bg-card supports-backdrop-filter:bg-card/60 no-scrollbar sticky top-0 z-10 flex w-full items-center gap-1 overflow-x-auto rounded-t-md border p-1 backdrop-blur">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="w-32 shrink-0 justify-between font-normal">
            <span className="truncate">{getCurrentHeading()}</span>
            <ChevronDown className="ml-2 size-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-40">
          <DropdownMenuItem onClick={() => editor.chain().focus().setParagraph().run()}>
            <Type className="mr-2 size-4" /> Normal text
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <Heading1 className="mr-2 size-4" /> Heading 1
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 className="mr-2 size-4" /> Heading 2
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <Heading3 className="mr-2 size-4" /> Heading 3
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" className="mx-1 h-6 shrink-0" />

      <div className="flex shrink-0 items-center gap-1">
        {formattingButtons.map((btn) => (
          <Button
            key={btn.name}
            type="button"
            variant="ghost"
            size="icon"
            className={cn('size-8 rounded-md', btn.isActive && 'bg-muted text-primary')}
            onClick={btn.action}
            onMouseDown={(e) => e.preventDefault()}
            title={btn.name}
            aria-label={btn.name}
          >
            <btn.icon className="size-4" />
          </Button>
        ))}
      </div>

      <Separator orientation="vertical" className="mx-1 h-6 shrink-0" />

      <div className="flex shrink-0 items-center gap-1">
        {alignmentOptions.map((btn) => (
          <Button
            key={btn.name}
            type="button"
            variant="ghost"
            size="icon"
            className={cn('size-8 rounded-md', btn.isActive && 'bg-muted text-primary')}
            onClick={btn.action}
            onMouseDown={(e) => e.preventDefault()}
            title={`Align ${btn.name}`}
            aria-label={`Align ${btn.name}`}
          >
            <btn.icon className="size-4" />
          </Button>
        ))}
      </div>

      <Separator orientation="vertical" className="mx-1 h-6 shrink-0" />

      <div className="flex shrink-0 items-center gap-1">
        {listButtons.map((btn) => (
          <Button
            key={btn.name}
            type="button"
            variant="ghost"
            size="icon"
            className={cn('size-8 rounded-md', btn.isActive && 'bg-muted text-primary')}
            onClick={btn.action}
            onMouseDown={(e) => e.preventDefault()}
            title={btn.name}
            aria-label={btn.name}
          >
            <btn.icon className="size-4" />
          </Button>
        ))}
      </div>
    </div>
  );
}
