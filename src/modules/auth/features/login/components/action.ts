"use server"

import { auth } from "@/lib/auth";
import { loginSchema } from "./schema";
import { headers } from "next/headers";
import { redirect } from "next/navigation"



export async function LoginAction(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const validation = loginSchema.safeParse(rawData);

    if (!validation.success) {
        return { error: validation.error };
    }

    const { email, password } = validation.data;

    try {
        await auth.api.signInEmail({
            body: {
                email: email,
                password: password,
                rememberMe: true,
            },
            headers: await headers(),
        });
    } catch (error) {
        return { error: "Something went wrong or email exists" };
    }

    redirect("/")
}

