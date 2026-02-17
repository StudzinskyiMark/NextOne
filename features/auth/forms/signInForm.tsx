'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

// import { authClient } from '@/lib/auth-client';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { signInAction } from '../actions/signInAction';
import { TSignInValues, signInSchema } from '../schemas/authSchema';

export const SignInForm = () => {
  const form = useForm<TSignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form onSubmit={form.handleSubmit(signInAction)}>
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
