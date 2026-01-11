import { z } from 'zod';


export const loginSchema = z.object({
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    password: z.string(),
});

export type LoginInput = z.infer<typeof loginSchema>;