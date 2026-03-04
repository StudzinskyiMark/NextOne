import z from 'zod';

export const editorSchema = z.object({
  title: z.string().min(6).max(50),
  body: z.string().min(10),
});

export type TEditorValues = z.infer<typeof editorSchema>;
