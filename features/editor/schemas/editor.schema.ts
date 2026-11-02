import z from 'zod';

export const MIN_TITLE_LENGTH = 10;
export const MAX_TITLE_LENGTH = 100;
export const MIN_BODY_LENGTH = 10;
export const MAX_BODY_LENGTH = 40000; // 40k character limit

export const editorSchema = z.object({
  title: z
    .string()
    .min(MIN_TITLE_LENGTH, `Title must be at least ${MIN_TITLE_LENGTH} characters`)
    .max(MAX_TITLE_LENGTH, `Title must be at most ${MAX_TITLE_LENGTH} characters`)
    .trim(),

  // body is HTML, so only check that it's not empty
  body: z.string().min(1, 'Content is required'),

  // plainText is the plain-text version used for validation, AI and search
  plainText: z
    .string()
    .min(MIN_BODY_LENGTH, `Content must be at least ${MIN_BODY_LENGTH} characters`)
    .max(MAX_BODY_LENGTH, `Content must be at most ${MAX_BODY_LENGTH} characters`),

  image: z.optional(
    z.instanceof(File).refine((file) => file.size < 4_000_000, 'Max image size is 4MB')
  ),
});

export type TEditorValues = z.infer<typeof editorSchema>;
