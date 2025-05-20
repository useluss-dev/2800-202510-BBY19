import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import clientPromise from '../../../lib/mongodb';
import { compare } from 'bcrypt';

export const runtime = 'nodejs';

const handler = NextAuth({
    providers: [
        Credentials({
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

                // eslint-disable-next-line
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
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
});

export { handler as GET, handler as POST };
