import z from 'zod';

export const editorSchema = z.object({
  title: z.string().max(50),
  content: z.string().min(20),
});

export type TEditorValues = z.infer<typeof editorSchema>;
