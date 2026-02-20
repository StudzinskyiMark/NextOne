import { api } from '@/convex/_generated/api';
import { FunctionArgs, FunctionReturnType } from 'convex/server';
import { toast } from 'sonner';

import { TEditorValues } from '../schemas/editor-schema';

type PublishPostArgs = FunctionArgs<typeof api.posts.createPost>;
type PublishPostResult = FunctionReturnType<typeof api.posts.createPost>;

export async function publishPostAction(
  data: TEditorValues,
  postMutation: (args: PublishPostArgs) => Promise<PublishPostResult>
) {
  try {
    const result = await postMutation({
      title: data.title,
      body: data.content,
    });

    if (!!result) {
      toast.success('Posted successfully!', { position: 'top-center' });
    } else {
      toast.error('Something went wrong!', { position: 'top-center' });
    }

    return { success: true, message: `Post has been published` };
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }
}
