import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(3, { message: 'Required' }),
  email: z.string().min(1, { message: 'Email is required' }).email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});
