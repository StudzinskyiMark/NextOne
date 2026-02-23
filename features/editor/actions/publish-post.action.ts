'use server';

import { api } from '@/convex/_generated/api';
import { fetchMutation } from 'convex/nextjs';

import { getToken } from '@/lib/auth-server';

import { TEditorValues, editorSchema } from '../schemas/editor.schema';

export async function publishPostAction(data: TEditorValues) {
  const parsedData = editorSchema.safeParse(data);

  if (!parsedData.success) throw new Error(parsedData.error.message);

  const token = await getToken();

  const result = await fetchMutation(
    api.posts.createPost,
    {
      title: parsedData.data.title,
      body: parsedData.data.content,
    },
    {
      token,
    }
  );

  if (!!result) {
    return { success: true, message: `Successfully published!` };
  } else {
    return { success: false, message: `Something went wrong!` };
  }
}
