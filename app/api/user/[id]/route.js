import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
    try {
        const { id } = params;
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_NAME);

        const user = await db
            .collection('users')
            .findOne({ _id: new ObjectId(id) }, { projection: { fullname: 1 } });

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ id: user._id.toString(), name: user.fullname }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to fetch user' }), { status: 500 });
    }
}
