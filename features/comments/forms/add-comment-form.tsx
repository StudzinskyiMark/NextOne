'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from 'convex/react';
import { Loader2 } from 'lucide-react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Field, FieldError } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

import { useAddComment } from '../model/use-add-comment';
import {
  MAX_COMMENT_LENGTH,
  MIN_COMMENT_LENGTH,
  TCommentsValues,
  commentsSchema,
} from '../schemas/comments.schema';

// TODO Implement user avatar next to the comment input
// 1. Fetch current user data (name, image) using authComponent or requireUser.
// 2. Integrate shadcn/ui Avatar component or a custom <img> with a fallback (first letter of the name).
// 3. Position the avatar to the left of the textarea to create a personalized "I am writing this" UX.

// TODO: Implement Messenger-style Layout with Framer Motion
// 1. Wrap the form in <motion.form layout> to enable automatic smooth transitions for all child elements.
// 2. State Management: Use `isFocused` and `hasContent` to determine `shouldShowActions`.
// 3. Dynamic Textarea: Adjust `rows` (e.g., 1 to 4) based on `shouldShowActions` to create an expansion effect.
// 4. AnimatePresence: Wrap the action button container in <AnimatePresence> and <motion.div>.
// 5. Transition: Set initial/exit styles (height: 0, opacity: 0) to ensure the layout "slides" open and closed.

export const AddCommentForm = ({ postId }: { postId: Id<'posts'> }) => {
  const pathname = usePathname();

  const { isAddComment, addComment } = useAddComment();

  const currentUser = useQuery(api.auth.getCurrentUser);

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

  const titleValue = useWatch({
    control: form.control,
    name: 'body',
  });

  const commentLength = titleValue?.length ?? 0;

  if (currentUser === undefined) return <Loader2 className="mx-auto animate-spin" />;

  if (currentUser === null) {
    return (
      <div className="bg-muted/20 flex flex-col items-center justify-center space-y-3 rounded-lg border border-dashed p-8">
        <p className="text-muted-foreground text-sm">
          Join the conversation! Sign in to share your thoughts.
        </p>
        <Link
          className={buttonVariants({ variant: 'outline' })}
          href={`/auth/sign-in?callbackUrl=${pathname}`}
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onAddSubmit)} className="my-6 space-y-4">
      <div className="flex items-start gap-4">
        <Avatar className="border-accent-foreground size-10 shrink-0 border-2">
          <AvatarImage
            src={currentUser?.image ?? `https://avatar.vercel.sh/${currentUser?.name}`}
            alt={currentUser?.name ?? 'User'}
          />
          <AvatarFallback>{currentUser?.name?.slice(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <Controller
            control={form.control}
            name="body"
            render={({ field, fieldState }) => (
              <Field>
                <Textarea
                  className="min-h-25 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      e.preventDefault();
                      form.handleSubmit(onAddSubmit)();
                    }
                  }}
                  placeholder="Write a comment..."
                  {...field}
                />
                {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
              </Field>
            )}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={
            isAddComment ||
            !form.formState.isValid ||
            commentLength < MIN_COMMENT_LENGTH ||
            commentLength > MAX_COMMENT_LENGTH
          }
          className="disabled:pointer-events-auto disabled:cursor-not-allowed disabled:hover:shadow-none max-md:w-full"
          size="lg"
        >
          {isAddComment ? <Loader2 className="animate-spin" /> : 'Comment'}
        </Button>
      </div>
    </form>
  );
};
