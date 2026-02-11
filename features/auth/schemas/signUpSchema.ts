import * as z from 'zod';

const NameMIN_LENGTH = 3;
const NameMAX_LENGTH = 30;
const PasswordMIN_LENGTH = 6;
const PasswordMAX_LENGTH = 30;

export const signUpSchema = z.object({
  name: z
    .string()
    .min(NameMIN_LENGTH, `Name must be at least ${NameMIN_LENGTH} characters long`)
    .max(NameMAX_LENGTH, `Name must be at most ${NameMAX_LENGTH} characters long`),
  email: z.email('Invalid email address'),
  password: z
    .string()
    .min(PasswordMIN_LENGTH, `Password must be at least ${PasswordMIN_LENGTH} characters long`)
    .max(PasswordMAX_LENGTH, `Password must be at most ${PasswordMAX_LENGTH} characters long`),
});

export type TSignUpValues = z.infer<typeof signUpSchema>;