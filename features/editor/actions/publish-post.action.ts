'use server';

import { api } from '@/convex/_generated/api';
import { fetchMutation } from 'convex/nextjs';

import { getToken } from '@/lib/auth-server';

import { TEditorValues, editorSchema } from '../schemas/editor.schema';
import { revalidatePath } from 'next/cache';

export async function publishPostAction(data: TEditorValues) {
  try {
    const parsedData = editorSchema.safeParse(data);

    if (!parsedData.success) throw new Error(parsedData.error.message);

    const token = await getToken();

    const imageUrl = await fetchMutation(api.posts.generatedImageUploadUrl, {}, { token });

    const resultUpload = await fetch(imageUrl, {
      method: 'POST',
      headers: { 'Content-Type': parsedData.data.image?.type || '' },
      body: parsedData.data.image,
    });

    if (!resultUpload.ok) {
      throw new Error(resultUpload.statusText);
    }

    const { storageId } = await resultUpload.json();

    const resultPost = await fetchMutation(
      api.posts.createPost,
      {
        title: parsedData.data.title,
        body: parsedData.data.body,
        imageStorageID: storageId,
      },
      {
        token,
      }
    );

    if (!!resultPost) {
      return { success: true, message: `Successfully published!` };
    } else {
      return { success: false, message: `Something went wrong!` };
    }
  } catch {
    throw new Error('Server error!');
  }

  revalidatePath('/blog');
}
