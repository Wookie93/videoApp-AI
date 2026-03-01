import * as z from "zod";

export const RegisterFormSchema = z.object({
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { error: 'Password must be at least 8 characters long.' })
        .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
        .regex(/[0-9]/, { error: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            error: 'Contain at least one special character.',
        })
        .trim(),
    name: z.string().min(3, { error: 'Name must be at least 3 characters long.' }),
});

export type RegisterInput = z.infer<typeof RegisterFormSchema>;