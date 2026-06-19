import z from 'zod';

export const MIN_TITLE_LENGTH = 10;
export const MAX_TITLE_LENGTH = 60;
export const MIN_BODY_LENGTH = 10;

export const editorSchema = z.object({
  title: z
    .string()
    .min(MIN_TITLE_LENGTH, `Title must be at least ${MIN_TITLE_LENGTH} characters`)
    .max(MAX_TITLE_LENGTH, `Title must be at most ${MAX_TITLE_LENGTH} characters`)
    .trim(),
  body: z.string().min(MIN_BODY_LENGTH, `Body must be at least ${MIN_BODY_LENGTH} characters`),
  image: z.optional(
    z.instanceof(File).refine((file) => file.size < 4_000_000, 'Max image size is 4MB')
  ),
});

export type TEditorValues = z.infer<typeof editorSchema>;
