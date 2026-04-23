'use client';

import { Id } from '@/convex/_generated/dataModel';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

import { useAddComment } from '../model/use-add-comment';
import { TCommentsValues, commentsSchema } from '../schemas/comments.schema';

// TODO Implement user avatar next to the comment input
// 1. Fetch current user data (name, image) using authComponent or requireUser.
// 2. Integrate shadcn/ui Avatar component or a custom <img> with a fallback (first letter of the name).
// 3. Position the avatar to the left of the textarea to create a personalized "I am writing this" UX.

export const AddCommentForm = ({ postId }: { postId: Id<'posts'> }) => {
  const { isAddComment, addComment } = useAddComment();

  const onAddSubmit = async (values: TCommentsValues) => {
    try {
      await addComment(values);
      form.reset();
    } catch (e) {
      console.error(e);
    }
  };

  const form = useForm<TCommentsValues>({
    resolver: zodResolver(commentsSchema),
    defaultValues: {
      body: '',
      postId: postId,
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onAddSubmit)} className="my-6 space-y-4">
      <Controller
        control={form.control}
        name="body"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel className="ml-4">Add your comment:</FieldLabel>
            <Textarea
              aria-invalid={fieldState.invalid}
              placeholder="Enter your comment..."
              {...field}
            />
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        )}
      />

      <Button type="submit" disabled={isAddComment} className="max-md:w-full" size="lg">
        {isAddComment ? (
          <>
            <Loader2 className="size-4 animate-spin" /> <span>Loading...</span>
          </>
        ) : (
          <span>Add Comment</span>
        )}
      </Button>
    </form>
  );
};
