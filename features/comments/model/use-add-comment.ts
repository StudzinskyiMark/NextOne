// hooks/use-use-add-comment.ts
import { useTransition } from 'react';

import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';

import { TCommentsValues } from '../schemas/comments.schema';

export function useAddComment() {
  const [isPending, startTransition] = useTransition();
  const createCommentMutation = useMutation(api.comments.createComment);

  const addComment = (data: TCommentsValues) => {
    return new Promise((resolve, reject) => {
      startTransition(async () => {
        try {
          await createCommentMutation(data);
          toast.success('Comment added!', { position: 'top-center' });
          resolve(true);
        } catch (error) {
          toast.error('Error adding comment', { position: 'top-center' });
          reject(error);
        }
      });
    });
  };

  return { isAddComment: isPending, addComment };
}
