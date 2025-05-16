import clientPromise from '../../lib/mongodb';

export async function POST(request) {
    try {
        const body = await request.json();
        const { fullname, email, password, phonenumber } = body;

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_NAME);
        const users = db.collection('users');

        const result = await users.insertOne({
            fullname,
            email,
            password,
            phonenumber,
            createdAt: new Date(),
        });

        return new Response(JSON.stringify({message:`User created successfully (${result.insertedId})`}), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
        
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to signup user' }), {
            status: 500,
        });
    }
}