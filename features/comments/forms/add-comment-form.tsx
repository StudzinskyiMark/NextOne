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

  const bodyValue = useWatch({
    control: form.control,
    name: 'body',
  });

  const commentLength = bodyValue?.length ?? 0;

  if (currentUser === undefined)
    return <Loader2 className="m-0 aspect-square size-4 shrink-0 animate-spin p-0" />;

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

        {/* ФІКС 1: Додано min-w-0, щоб flex-контейнер не дозволяв Textarea себе розпирати */}
        <div className="min-w-0 flex-1">
          <Controller
            control={form.control}
            name="body"
            render={({ field, fieldState }) => (
              <Field>
                <div className="relative">
                  <Textarea
                    className="max-h-[200px] min-h-[100px] w-full resize-none overflow-y-auto pb-7"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        form.handleSubmit(onAddSubmit)();
                      }
                    }}
                    placeholder="Write a comment..."
                    {...field}
                  />

                  <div
                    className={`pointer-events-none absolute right-3 bottom-2 text-xs ${
                      commentLength > MAX_COMMENT_LENGTH
                        ? 'font-medium text-red-500'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {commentLength}/{MAX_COMMENT_LENGTH}
                  </div>
                </div>
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
          {isAddComment ? (
            <Loader2 className="m-0 aspect-square size-4 shrink-0 animate-spin p-0" />
          ) : (
            'Comment'
          )}
        </Button>
      </div>
    </form>
  );
};
