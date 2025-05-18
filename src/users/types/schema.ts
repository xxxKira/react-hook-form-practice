import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email is not valid' }),
  cities: z
    .array(z.number())
    .min(1, { message: 'Required' })
    .max(2, { message: 'Maximum 2 cities' }),
  languages: z.array(z.number()).min(1).max(2),
  gender: z.string().min(1),
  skills: z
    .array(z.number())
    .min(1, { message: 'Select at least 1 element' })
    .max(2),
  registrationDateAndTime: z.date(),
  employmentPeriod: z.array(z.date()).min(2).max(2),
  salaryRange: z.array(z.number()).min(2).max(2),
  isTeacher: z.boolean(),
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  name: '',
  email: '',
  cities: [],
  languages: [],
  gender: '',
  skills: [],
  registrationDateAndTime: new Date(),
  employmentPeriod: [new Date(), new Date()],
  salaryRange: [0, 2000],
  isTeacher: false,
};
