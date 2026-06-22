'use client';
import { useTransition } from 'react';
import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Upload, X } from 'lucide-react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

import { AiTitleGenerator } from '@/features/ai-title-generator';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import { usePublishPost } from '../model/use-publish-post';
import {
  MAX_TITLE_LENGTH,
  MIN_TITLE_LENGTH,
  TEditorValues,
  editorSchema,
} from '../schemas/editor.schema';

const TiptapTextEditor = dynamic(
  () => import('../components/tiptap/tiptap-text-editor').then((mod) => mod.TiptapTextEditor),
  {
    ssr: false,
    loading: () => <Skeleton className="h-75 w-full rounded-md" />,
  }
);

// TODO Implement "Light" Draft system using LocalStorage
// 1. Add a useEffect to sync form state with LocalStorage every 5 seconds.
// 2. Implement logic to check for existing draft on component mount and use form.reset() to restore.
// 3. Add a "Clear Draft" action upon successful publication.

// TODO Implement Server-side Drafts (Convex)
// 1. Create a `saveDraft` mutation in Convex that bypasses strict schema validation.
// 2. Add `status: "draft" | "published"` to the posts schema.
// 3. Implement `onSaveDraft` handler for the "Save Draft" button (type="button").
// 4. Create a mechanism to resume editing by fetching the draft by ID or latest entry.

// TODO Improve Drafts UX and Auto-save
// 1. Add a "Draft saved" visual indicator (timestamp or icon) near the action buttons.
// 2. Implement debounced auto-save to Convex to reduce server load.
// 3. Add a "Discard Draft" confirmation dialog to prevent accidental data loss.

// IDEA Add drag-and-drop for image upload
// Add a drag-and-drop area for image upload with preview

// REFACTOR Move symbol counter to a separate component
// Move symbol counter logic to a separate function and reuse it in other components

export function PublishForm() {
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const [isSaving, startSaving] = useTransition();
  const { isPublishing, handlePublish } = usePublishPost();

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const form = useForm<TEditorValues>({
    resolver: zodResolver(editorSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      body: '',
      plainText: '',
      image: undefined,
    },
  });

  const titleValue = useWatch({
    control: form.control,
    name: 'title',
  });

  const titleLength = titleValue?.length ?? 0;

  const isError = titleLength > MAX_TITLE_LENGTH;
  const isWarning = titleLength > MAX_TITLE_LENGTH * 0.8;

  return (
    <form onSubmit={form.handleSubmit(handlePublish)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="image"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="text-muted-foreground ml-2">Image</FieldLabel>

              <div className="group relative">
                {preview ? (
                  <div className="border-muted-foreground/20 bg-muted/30 relative aspect-video h-56 w-full overflow-hidden rounded-lg border">
                    <Image
                      src={preview}
                      alt="post image preview"
                      fill
                      className="h-full w-full object-cover object-center"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreview(null);
                        field.onChange(null);
                      }}
                      className="absolute top-2 right-2 rounded-full bg-black/50 p-1.5 text-white transition hover:bg-black/70"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <label className="border-muted-foreground/25 bg-muted/50 hover:bg-muted/80 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition">
                    <div className="text-muted-foreground flex flex-col items-center gap-2">
                      <Upload className="size-6" />
                      <span className="text-sm font-medium">Click to upload image</span>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      aria-invalid={fieldState.invalid}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          setPreview(URL.createObjectURL(file));
                          field.onChange(file);
                        }
                      }}
                    />
                  </label>
                )}
              </div>

              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </Field>
          )}
        />

        <AiTitleGenerator
          // Передаємо функцію. form.getValues() читає стан форми миттєво, без перерендеру
          getPostContent={() => {
            const text = form.getValues('plainText') || '';
            return text.slice(0, 4000); // Обрізаємо до 4к символів для економії токенів Groq API
          }}
          onSelectTitle={(selectedTitle) => {
            form.setValue('title', selectedTitle, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />

        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="text-muted-foreground ml-2">Title</FieldLabel>
              <div className="relative flex flex-col">
                <div className="relative flex items-center">
                  <Input
                    required
                    type="text"
                    className="text-l h-auto py-2 pr-16 font-medium md:text-xl"
                    aria-invalid={fieldState.invalid || isError}
                    placeholder="Give your research a clear name..."
                    {...field}
                  />
                  <div
                    className={cn(
                      'pointer-events-none absolute right-3 text-xs',
                      isWarning && 'text-yellow-500',
                      isError && 'text-red-500',
                      !isError && !isWarning && 'text-muted-foreground'
                    )}
                  >
                    {titleLength}/{MAX_TITLE_LENGTH}
                  </div>
                </div>

                <div className="mt-3 min-h-5">
                  {fieldState.error ? (
                    <FieldError>{fieldState.error.message}</FieldError>
                  ) : isError ? (
                    <FieldError>{`Too long (max ${MAX_TITLE_LENGTH} characters)`}</FieldError>
                  ) : null}
                </div>
              </div>
            </Field>
          )}
        />

        <Separator className="my-2" />

        <Controller
          control={form.control}
          name="body"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="text-muted-foreground ml-2">Content</FieldLabel>
              <TiptapTextEditor
                className="scrollbar scrollbar-thin scrollbar-track-muted/10 scrollbar-thumb-muted/30 mb-1 max-h-[500px] overflow-x-hidden scroll-auto"
                content={field.value}
                onChange={(html, plainText) => {
                  field.onChange(html);
                  form.setValue('plainText', plainText, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              />

              {fieldState.error ? (
                <FieldError>{fieldState.error.message}</FieldError>
              ) : form.formState.errors.plainText ? (
                <FieldError>{form.formState.errors.plainText.message}</FieldError>
              ) : null}
            </Field>
          )}
        />

        <div className="mt-4 flex justify-end-safe gap-4 max-md:flex-col">
          <Button
            disabled={isSaving}
            type="button"
            variant={'secondary'}
            className="w-full md:max-w-46"
            onClick={() => {
              startSaving(async () => {
                await delay(300).then(() => {
                  toast.error('Oops! We are still working on this feature.', {
                    position: 'top-center',
                  });
                });
              });
            }}
          >
            {isSaving ? (
              <>
                <Loader2 className="m-0 aspect-square size-4 shrink-0 animate-spin p-0" />{' '}
                <span>Loading...</span>
              </>
            ) : (
              <span>Save Draft</span>
            )}
          </Button>
          <Button
            disabled={
              isPublishing || titleLength < MIN_TITLE_LENGTH || titleLength > MAX_TITLE_LENGTH
            }
            type="submit"
            className="w-full disabled:pointer-events-auto disabled:cursor-not-allowed md:max-w-46"
          >
            {isPublishing ? (
              <>
                <Loader2 className="m-0 aspect-square size-4 shrink-0 animate-spin p-0" />{' '}
                <span>Loading...</span>
              </>
            ) : (
              <span>Publish</span>
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
