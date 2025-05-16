import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcrypt';


export async function POST(request) {
    try {
        const body = await request.json();
        const { fullname, email, password, phonenumber } = body;

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_NAME);
        const users = db.collection('users');
        const saltRounds = 12;
        
        let hashedPassword = bcrypt.hashSync(password, saltRounds);
        const result = await users.insertOne({
            fullname,
            email,
            password:hashedPassword,
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