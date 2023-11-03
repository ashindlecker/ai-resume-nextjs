import { getServerSession } from "next-auth/next";
import { authOptions } from "./config";

export interface SessionUser {
    name: string;
    email: string;
    image: string;
    id: string;
}

export interface Session {
    user: SessionUser;
}

export async function getSession(): Promise<Session | null> {
    return await getServerSession(authOptions)
}