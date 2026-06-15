'use client';

import { useState } from 'react';

import Link from 'next/link';

// 🌟 Додаємо імпорт стану
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Mail } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { SocialAuthButtons } from '../components/social-auth-buttons';
import { useSignUp } from '../model/use-sign-up';
import { TSignUpValues, signUpSchema } from '../schemas/auth.schema';

export const SignUpForm = () => {
  const { isSigningUp, signUp } = useSignUp();
  // 🌟 Стан для керування видимістю форми
  const [showEmailForm, setShowEmailForm] = useState(false);

  const form = useForm<TSignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    },
  });

  return (
    <div className="mx-auto w-full max-w-lg space-y-6">
      {/* 1. Соціальні кнопки тепер завжди зверху */}
      <SocialAuthButtons />

      <div className="relative flex items-center py-2">
        <div className="border-muted flex-grow border-t" />
        <span className="text-muted-foreground mx-4 shrink-0 text-xs uppercase">
          {showEmailForm ? 'Or register with email' : 'Or'}
        </span>
        <div className="border-muted flex-grow border-t" />
      </div>

      {/* 2. Якщо форма прихована — показуємо кнопку-перемикач */}
      {!showEmailForm ? (
        <Button variant="outline" className="w-full" onClick={() => setShowEmailForm(true)}>
          <Mail className="mr-2 size-4" />
          Continue with Email
        </Button>
      ) : (
        <form
          onSubmit={form.handleSubmit(signUp)}
          className="animate-in fade-in slide-in-from-top-4 duration-500"
        >
          <FieldGroup>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Controller
                control={form.control}
                name="firstName"
                render={({ field, fieldState }) => (
                  <Field className="flex-1">
                    <FieldLabel>First name</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="John"
                      {...field}
                      autoComplete="given-name"
                    />
                    {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="lastName"
                render={({ field, fieldState }) => (
                  <Field className="flex-1">
                    <FieldLabel>Last name</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="Doe"
                      {...field}
                      autoComplete="family-name"
                    />
                    {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                  </Field>
                )}
              />
            </div>

            <Controller
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Username</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="johndoe_123"
                    {...field}
                    autoComplete="username"
                  />
                  {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Email address</FieldLabel>
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
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="Create a strong password"
                    type="password"
                    {...field}
                    autoComplete="new-password"
                  />
                  {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                </Field>
              )}
            />

            <Button disabled={isSigningUp} type="submit" className="mt-2 w-full">
              {isSigningUp ? (
                <>
                  <Loader2 className="m-0 mr-2 aspect-square size-4 shrink-0 animate-spin p-0" />
                  <span>Signing up...</span>
                </>
              ) : (
                <span>Sign Up</span>
              )}
            </Button>
          </FieldGroup>
        </form>
      )}
      <p className="text-muted-foreground mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link
          href="/auth/sign-in"
          className="text-primary font-medium underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};
