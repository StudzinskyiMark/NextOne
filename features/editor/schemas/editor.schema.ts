import z from 'zod';

export const editorSchema = z.object({
  title: z.string().min(6).max(50),
  body: z.string().min(10),
  image: z.optional(z.instanceof(File)),
  //   image: z.union([z.instanceof(File), z.string()]).optional(),
});

export type TEditorValues = z.infer<typeof editorSchema>;
