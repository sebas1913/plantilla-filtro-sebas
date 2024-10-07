import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { URL_BASE } from "../../../../../URL_BASE";

declare module "next-auth" {
    interface User {
        _id: string; 
        name?: string | null;
        email?: string | null;
        username?: string | null;
        token?: string; 
    }

    interface Session {
        user: User;
        accessToken?: any; 
    }

    interface JWT {
        id?: string;
        name?: string | null;
        email?: string | null;
        username?: string | null;
        accessToken?: string; 
    }
}


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const response = await fetch(`${URL_BASE}/auth/login`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password
                    })
                });
            
                const data = await response.json();
            
                if (response.ok && data.user) {
                    return {
                        ...data.user,
                        token: data.access_token 
                    };
                }
            
                return null;
            }
        })
    ],
    debug: true,  
    session: {
        strategy: "jwt", 
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id; 
                token.name = user.name;
                token.email = user.email;
                token.username = user.username;
                token.accessToken = user.token;
            }
            return token;
        },
    
        async session({ session, token }) {
            if (token) {
                session.user._id = token.id as string; 
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.username = token.username as string;
                session.accessToken = token.accessToken; 
            }
            return session; 
        }
    }
     
});

export { handler as GET, handler as POST };
