import { useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { publishPostAction } from '../actions/publish-post.action';
import { TEditorValues } from '../schemas/editor.schema';

// Або твій правильний шлях

export const usePublishPost = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handlePublish = (data: TEditorValues) => {
    startTransition(async () => {
      try {
        const result = await publishPostAction(data);

        if (result.success) {
          toast.success(result.message, { position: 'top-center' });
          router.push('/blog');
        } else {
          toast.error(result.message, { position: 'top-center' });
        }
      } catch (error) {
        toast.error('Server error!');
        console.error(error);
      }
    });
  };

  return { isPublishing: isPending, handlePublish };
};
