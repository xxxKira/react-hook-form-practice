import { z } from 'zod';

export const schema = z
  .intersection(
    z.object({
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
      formerEmploymentPeriod: z.array(z.date()).min(2).max(2),
      salaryRange: z.array(z.number()).min(2).max(2),
      // isTeacher: z.boolean(),
    }),
    z.discriminatedUnion('variant', [
      z.object({
        variant: z.literal('create'),
      }),
      z.object({
        variant: z.literal('update'),
        id: z.string().min(1),
      }),
    ])
  )
  .and(
    z.union([
      z.object({
        isTeacher: z.literal(false),
      }),
      z.object({
        isTeacher: z.literal(true),
        teacher: z.object({
          subject: z.string().min(1),
          experience: z.string().min(1),
          students: z.array(z.object({ name: z.string().min(4) })),
        }),
        // students: z.array(z.object({ name: z.string().min(4) })),
      }),
    ])
  );

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  variant: 'create',
  name: '',
  email: '',
  cities: [],
  languages: [],
  gender: '',
  skills: [],
  registrationDateAndTime: new Date(),
  formerEmploymentPeriod: [new Date(), new Date()],
  salaryRange: [0, 2000],
  isTeacher: false,
};
