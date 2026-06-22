import { Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
} from 'lucide-react';

export type ToolbarButton = {
  name: string;
  icon: React.ElementType;
  action: () => void;
  isActive: boolean;
};

export type CodeLanguageOption = {
  label: string;
  value: string;
};

export const CODE_LANGUAGE_OPTIONS: CodeLanguageOption[] = [
  { label: 'Auto', value: 'auto' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JSON', value: 'json' },
  { label: 'Shell', value: 'bash' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'C++', value: 'cpp' },
  { label: 'SQL', value: 'sql' },
];

export const getFormattingButtons = (editor: Editor): ToolbarButton[] => [
  {
    name: 'Bold',
    icon: Bold,
    action: () => editor.chain().focus().toggleBold().run(),
    isActive: editor.isActive('bold'),
  },
  {
    name: 'Italic',
    icon: Italic,
    action: () => editor.chain().focus().toggleItalic().run(),
    isActive: editor.isActive('italic'),
  },
  {
    name: 'Strikethrough',
    icon: Strikethrough,
    action: () => editor.chain().focus().toggleStrike().run(),
    isActive: editor.isActive('strike'),
  },
  {
    name: 'Code',
    icon: Code,
    action: () => editor.chain().focus().toggleCode().run(),
    isActive: editor.isActive('code'),
  },
];

export const getListButtons = (editor: Editor): ToolbarButton[] => [
  {
    name: 'Bullet List',
    icon: List,
    action: () => editor.chain().focus().toggleBulletList().run(),
    isActive: editor.isActive('bulletList'),
  },
  {
    name: 'Ordered List',
    icon: ListOrdered,
    action: () => editor.chain().focus().toggleOrderedList().run(),
    isActive: editor.isActive('orderedList'),
  },
  {
    name: 'Blockquote',
    icon: Quote,
    action: () => editor.chain().focus().toggleBlockquote().run(),
    isActive: editor.isActive('blockquote'),
  },
];

export const getAlignmentOptions = (editor: Editor): ToolbarButton[] => [
  {
    name: 'Left',
    icon: AlignLeft,
    action: () => editor.chain().focus().setTextAlign('left').run(),
    isActive: editor.isActive({ textAlign: 'left' }),
  },
  {
    name: 'Center',
    icon: AlignCenter,
    action: () => editor.chain().focus().setTextAlign('center').run(),
    isActive: editor.isActive({ textAlign: 'center' }),
  },
  {
    name: 'Right',
    icon: AlignRight,
    action: () => editor.chain().focus().setTextAlign('right').run(),
    isActive: editor.isActive({ textAlign: 'right' }),
  },
];
