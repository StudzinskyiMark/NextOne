'use client';

import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

import { usePublishPost } from '../model/use-publish-post';
import { TEditorValues, editorSchema } from '../schemas/editor.schema';

// IDEA Add AI assistant for title generation
// Improve UX by adding an AI title generator based on the content text

// TODO Implement symbol counter for fields
// Add a counter to inform how many symbols remain

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

export function PublishForm() {
  //DELETE after implementing auto-save
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const [isSaving, startSaving] = useTransition();
  const { isPublishing, handlePublish } = usePublishPost();

  const form = useForm<TEditorValues>({
    resolver: zodResolver(editorSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  return (
    <form onSubmit={form.handleSubmit(handlePublish)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="text-muted-foreground ml-2">Title</FieldLabel>
              <Input
                type="text"
                className="text-l h-auto py-3 font-medium md:text-xl"
                aria-invalid={fieldState.invalid}
                placeholder="Give your research a clear name..."
                {...field}
              />
              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </Field>
          )}
        />
        <Separator className="my-2" />
        <Controller
          control={form.control}
          name="content"
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
          <Button disabled={isPublishing} type="submit" className="w-full md:max-w-46">
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
