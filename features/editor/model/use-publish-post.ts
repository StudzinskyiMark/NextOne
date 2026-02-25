import { useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { publishPostAction } from '../actions/publish-post.action';
import { TEditorValues } from '../schemas/editor.schema';

export const usePublishPost = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handlePublish = (data: TEditorValues) => {
    startTransition(async () => {
      const result = await publishPostAction(data);

      try {
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
