import { db } from "@/shared/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import * as schema from "@/shared/db/schema";


export const auth = betterAuth({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    database: drizzleAdapter(db!, {
        provider: "pg",
        schema: {
            user: schema.user,
            session: schema.session,
            verification: schema.verification,
            account: schema.account,
        }
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [nextCookies()]
});