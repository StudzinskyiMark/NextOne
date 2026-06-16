'use client';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { SocialAuthButtons } from '../components/social-auth-buttons';
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

  const onSubmit = async (values: TSignInValues) => {
    try {
      await signIn(values);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Auth failed';

      if (message.toLowerCase().includes('password')) {
        form.setError('password', { type: 'server', message });
      } else {
        form.setError('root', { type: 'server', message });
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg space-y-6">
      <SocialAuthButtons />

      <div className="relative flex items-center py-2">
        <div className="border-muted flex-grow border-t" />
        <span className="text-muted-foreground mx-4 shrink-0 text-xs uppercase">Or</span>
        <div className="border-muted flex-grow border-t" />
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {form.formState.errors.root && (
            <div className="text-destructive bg-destructive/10 rounded p-2 text-center text-sm font-medium">
              {form.formState.errors.root.message}
            </div>
          )}

          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Enter your email:</FieldLabel>
                <Input
                  aria-invalid={fieldState.invalid}
                  placeholder="your.name@example.com"
                  type="email"
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
                <Loader2 className="m-0 aspect-square size-4 shrink-0 animate-spin p-0" />
                <span>Loading...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </Button>
        </FieldGroup>
      </form>
      <p className="text-muted-foreground mt-4 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link
          href="/auth/sign-up"
          className="text-primary font-medium underline-offset-4 hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};
