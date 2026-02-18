'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { signInAction } from '../actions/signInAction';
import { TSignInValues, signInSchema } from '../schemas/authSchema';

// IDEA try useTransition hook for Submit button.
// Show a loading state on the button while the form is being submitted, providing better feedback to the user and improving the overall user experience.

export const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const form = useForm<TSignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        signInAction(data, router, callbackUrl);
      })}
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Enter your email:</FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                placeholder="your.name@example.com"
                {...field}
                autoComplete="email"
              />
              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Enter your password:</FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                placeholder="Enter your password"
                {...field}
                type="password"
                autoComplete="new-password"
              />
              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </Field>
          )}
        />
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </FieldGroup>
    </form>
  );
};
