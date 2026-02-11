'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { handleSignUpSubmit } from '../actions/signUpAction';
import { TSignUpValues, signUpSchema } from '../schemas';

export const SignUpForm = () => {
  const form = useForm<TSignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        handleSignUpSubmit(data).then((data) => {
          console.log('Sign up successful:', data);
        });
      })}
    >
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
                autoComplete="new-password"
              />
              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </Field>
          )}
        />
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </FieldGroup>
    </form>
  );
};
