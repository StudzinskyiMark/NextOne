import { Id } from '@/convex/_generated/dataModel';
import z from 'zod';

export const MIN_COMMENT_LENGTH = 3;
export const MAX_COMMENT_LENGTH = 100;

export const commentsSchema = z.object({
  body: z
    .string()
    .min(MIN_COMMENT_LENGTH, `Comment must be at least ${MIN_COMMENT_LENGTH} characters`)
    .max(MAX_COMMENT_LENGTH, `Comment must be at most ${MAX_COMMENT_LENGTH} characters`),
  postId: z.custom<Id<'posts'>>(),
});

export type TCommentsValues = z.infer<typeof commentsSchema>;
