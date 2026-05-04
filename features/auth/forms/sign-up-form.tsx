'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { useSignUp } from '../model/use-sign-up';
import { TSignUpValues, signUpSchema } from '../schemas/auth.schema';

export const SignUpForm = () => {
  const { isSigningUp, signUp } = useSignUp();

  const form = useForm<TSignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  return (
    <form onSubmit={form.handleSubmit(signUp)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Enter your name:</FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                placeholder="Enter your name"
                {...field}
                autoComplete="name"
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
        <Button disabled={isSigningUp} type="submit" className="w-full">
          {isSigningUp ? (
            <>
              <Loader2 className="size-4 animate-spin" /> <span>Loading...</span>
            </>
          ) : (
            <span>Sign Up</span>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
};
