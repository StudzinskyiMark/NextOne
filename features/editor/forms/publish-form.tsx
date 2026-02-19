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

import { TEditorValues, editorSchema } from '../schemas/editor-schema';

// TODO Replace Text area with TipTap text editor
// Add a fully functional text editor for an improved user experience

// TODO Implement symbol counter for fields
// Add a counter to inform how many symbols remain

// IDEA Add AI assistant for title generation
// Improve UX by adding an AI title generator based on the content text

export function PublishForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TEditorValues>({
    resolver: zodResolver(editorSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  return (
    <form
      onSubmit={() => {
        startTransition(async () => {
          await console.log('form submit!');
        });
      }}
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="text-muted-foreground ml-2">Title</FieldLabel>
              <Input
                type="text"
                className="h-auto py-3 text-2xl font-medium"
                aria-invalid={fieldState.invalid}
                placeholder="Give your research a clear name..."
                {...field}
              />
              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </Field>
          )}
        />
        <Separator className='my-2' />
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
            disabled={isPending}
            type="submit"
            variant={'secondary'}
            className="w-full md:max-w-46"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" /> <span>Loading...</span>
              </>
            ) : (
              <span>Save Draft</span>
            )}
          </Button>
          <Button disabled={isPending} type="submit" className="w-full md:max-w-46">
            {isPending ? (
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
