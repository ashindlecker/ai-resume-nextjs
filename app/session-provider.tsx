'use client'
import { SessionProvider } from "next-auth/react";
import { Session } from "./api/auth/[...nextauth]/utils";

import { ThemeProvider } from "@material-tailwind/react";
export default function component({ session, children }: { session: Session | null, children: any }) {
    return (
        <SessionProvider session={session as any}>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </SessionProvider>
    )
}