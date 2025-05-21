import clientPromise from '../../lib/mongodb';

export async function POST(request) {
    try {
        const body = await request.json();
        const { fullname, email, phonenumber } = body;

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_NAME);
        const users = db.collection('users');

        await users.findOneAndUpdate(
            { email },
            { $set: { fullname, phonenumber } },
            { upsert: true },
        );

        return new Response(JSON.stringify({ message: `Updated profile successfully` }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        return new Response(JSON.stringify({ error: error }), {
            status: 500,
        });
    }
}
