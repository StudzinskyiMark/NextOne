import * as z from 'zod';

const Name_MIN_LENGTH = 3;
const Name_MAX_LENGTH = 30;
const Username_MIN_LENGTH = 3;
const Username_MAX_LENGTH = 20;
const Password_MIN_LENGTH = 6;
const Password_MAX_LENGTH = 30;

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(Name_MIN_LENGTH, `First name must be at least ${Name_MIN_LENGTH} characters long`)
    .max(Name_MAX_LENGTH, `First name must be at most ${Name_MAX_LENGTH} characters long`)
    .trim(),
  lastName: z
    .string()
    .min(Name_MIN_LENGTH, `Last name must be at least ${Name_MIN_LENGTH} characters long`)
    .max(Name_MAX_LENGTH, `Last name must be at most ${Name_MAX_LENGTH} characters long`)
    .trim(),
  username: z
    .string()
    .min(Username_MIN_LENGTH, `Username must be at least ${Username_MIN_LENGTH} characters long`)
    .max(Username_MAX_LENGTH, `Username must be at most ${Username_MAX_LENGTH} characters long`)
    .trim()
    .toLowerCase() // Примусово переводимо в нижній регістр для уніфікації в БД
    .regex(/^[a-z0-9_]+$/, 'Username can only contain lowercase letters, numbers, and underscores'),
  email: z.string().email('Invalid email address').trim(),
  password: z
    .string()
    .min(Password_MIN_LENGTH, `Password must be at least ${Password_MIN_LENGTH} characters long`)
    .max(Password_MAX_LENGTH, `Password must be at most ${Password_MAX_LENGTH} characters long`),
});

export const signInSchema = z.object({
  email: z.string().email('Invalid email address').trim(),
  password: z.string().min(1, 'Password is required'),
});

export type TSignUpValues = z.infer<typeof signUpSchema>;
export type TSignInValues = z.infer<typeof signInSchema>;
