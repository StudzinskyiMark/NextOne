'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { useSignIn } from '../model/use-sign-in';
import { TSignInValues, signInSchema } from '../schemas/auth.schema';

export const SignInForm = () => {
  const { isSigningIn, signIn } = useSignIn();

  const form = useForm<TSignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form onSubmit={form.handleSubmit(signIn)}>
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
                autoComplete="password"
              />
              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </Field>
          )}
        />
        <Button disabled={isSigningIn} type="submit" className="w-full">
          {isSigningIn ? (
            <>
              <Loader2 className="size-4 animate-spin" /> <span>Loading...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
};
