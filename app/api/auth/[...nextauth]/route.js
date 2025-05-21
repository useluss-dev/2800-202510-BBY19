import NextAuth from 'next-auth';
import { compare } from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '../../../lib/mongodb';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const client = await clientPromise;
                const db = client.db(process.env.MONGODB_NAME);
                const user = await db.collection('users').findOne({ email: credentials.email });

                if (!user || !(await compare(credentials.password, user.password))) {
                    throw new Error('Invalid email or password');
                }

                return {
                    email: user.email,
                    id: user._id.toHexString(),
                    name: user.fullname,
                };
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        // When a JWT is created (at sign‑in) or updated
        async jwt({ token, user }) {
            // `user` is only defined on first sign‑in
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        // Whenever a session is checked
        async session({ session, token }) {
            // Copy our properties from the token into session.user
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
