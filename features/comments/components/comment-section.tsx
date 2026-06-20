'use client';

import { Suspense } from 'react';

import { Id } from '@/convex/_generated/dataModel';
import { MessageSquare } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { AddCommentForm } from '../forms/add-comment-form';
import { CommentItemSkeleton } from './comment-item';
import { CommentList } from './comment-list';

export function CommentSection({ postId }: { postId: Id<'posts'> }) {
  return (
    <Card className="my-4">
      <CardHeader className="flex items-center gap-2">
        <MessageSquare className="size-4" />
        <h2 className="text-xl font-bold">Comments</h2>
      </CardHeader>
      <CardContent>
        <Separator className="my-2" />
        <AddCommentForm postId={postId} />
        <Separator className="my-2" />
        <Suspense
          fallback={
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <CommentItemSkeleton key={index} />
              ))}
            </div>
          }
        >
          <CommentList postId={postId} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
