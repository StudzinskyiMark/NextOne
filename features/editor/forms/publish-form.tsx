'use client';
import { useTransition } from 'react';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, X } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

import { usePublishPost } from '../model/use-publish-post';
import {
  MAX_TITLE_LENGTH,
  MIN_TITLE_LENGTH,
  TEditorValues,
  editorSchema,
} from '../schemas/editor.schema';

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

// TODO Replace Text area with TipTap text editor
// Add a fully functional text editor for an improved user experience

// IDEA Add drag-and-drop for image upload
// Add a drag-and-drop area for image upload with preview

// IDEA Add AI assistant for title generation
// Improve UX by adding an AI title generator based on the content text

// REFACTOR Move symbol counter to a separate component
// Move symbol counter logic to a separate function and reuse it in other components

export function PublishForm() {
  //DELETE after implementing auto-save
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
    defaultValues: {
      title: '',
      body: '',
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

        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="text-muted-foreground ml-2">Title</FieldLabel>
              <div className="relative">
                <Input
                  type="text"
                  className="text-l h-auto py-2 font-medium md:text-xl"
                  aria-invalid={fieldState.invalid || isError}
                  placeholder="Give your research a clear name..."
                  {...field}
                />
                <div className="min-h-5">
                  {fieldState.error ? (
                    <FieldError>{fieldState.error.message}</FieldError>
                  ) : isError ? (
                    <FieldError>{`Too long (max ${MAX_TITLE_LENGTH} characters)`}</FieldError>
                  ) : null}
                  <div
                    className={cn(
                      'absolute top-1/2 right-3 -translate-y-1/3 text-xs',
                      isWarning && 'text-yellow-500',
                      isError && 'text-red-500',
                      !isError && !isWarning && 'text-muted-foreground'
                    )}
                  >
                    {titleLength}/{MAX_TITLE_LENGTH}
                  </div>
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
              <Textarea
                className="min-h-50 resize-none text-lg leading-relaxed"
                aria-invalid={fieldState.invalid}
                placeholder="Tell your story, paste code, or drop an image..."
                {...field}
              />
              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </Field>
          )}
        />
        <div className="flex justify-end-safe gap-4 max-md:flex-col">
          <Button
            disabled={isSaving}
            type="button"
            variant={'secondary'}
            className="w-full md:max-w-46"
            onClick={() => {
              startSaving(async () => {
                await delay(3000).then(() => console.log('Draft saved!'));
              });
            }}
          >
            {isSaving ? (
              <>
                <Loader2 className="size-4 animate-spin" /> <span>Loading...</span>
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
            className="w-full md:max-w-46"
          >
            {isPublishing ? (
              <>
                <Loader2 className="size-4 animate-spin" /> <span>Loading...</span>
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
