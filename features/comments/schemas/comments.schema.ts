import { Id } from '@/convex/_generated/dataModel';
import z from 'zod';

const MIN_COMMENT_LENGTH = 3;

export const commentsSchema = z.object({
  body: z.string().min(MIN_COMMENT_LENGTH),
  postId: z.custom<Id<'posts'>>(),
});

export type TCommentsValues = z.infer<typeof commentsSchema>;
