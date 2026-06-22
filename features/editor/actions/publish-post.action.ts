'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { fetchMutation } from 'convex/nextjs';

import { getToken } from '@/lib/auth-server';

import { TEditorValues, editorSchema } from '../schemas/editor.schema';


export async function publishPostAction(data: TEditorValues) {
  try {
    const parsedData = editorSchema.safeParse(data);
    if (!parsedData.success) throw new Error(parsedData.error.message);

    const token = await getToken();
    let imageStorageId = undefined;

    if (parsedData.data.image && parsedData.data.image.size > 0) {
      const uploadUrl = await fetchMutation(api.posts.generatedImageUploadUrl, {}, { token });

      const resultUpload = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': parsedData.data.image.type },
        body: parsedData.data.image,
      });

      if (!resultUpload.ok) throw new Error('Failed to upload image');

      const response = await resultUpload.json();
      console.log('Upload response:', response, typeof response);
      imageStorageId = response.storageId as unknown as Id<'_storage'>;
    }

    const resultPost = await fetchMutation(
      api.posts.createPost,
      {
        title: parsedData.data.title,
        body: parsedData.data.body,
        plainText: data.plainText,
        imageStorageID: imageStorageId,
      },
      { token }
    );

    if (!resultPost) return { success: false, message: `Something went wrong!` };

    revalidateTag('posts', 'page');

    return { success: true, message: `Successfully published!` };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Server error!' };
  }
}
