
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import {prismaClient} from '../../../prisma'

export const authOptions:any = {
    session:{
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prismaClient),
    providers: [
        // OAuth authentication providers
        GoogleProvider({
            clientId: process.env.NEXTAUTH_GOOGLE_CLIENT!,
            clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET!
        }),
    ],
    callbacks: {
        async session({ session, token, user }: any) {
            session.user.id = token.sub
            return session
        },
        async jwt({ token, account, profile }: any){
            return {
                ...token,
                //Add custom fields to token
            }
        }
    }
}