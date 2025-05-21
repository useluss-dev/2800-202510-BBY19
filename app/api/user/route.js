import clientPromise from "../../lib/mongodb";  

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    console.log(email);
    try {
        const client = await clientPromise;
        console.log(process.env.MONGODB_NAME);
        const db = client.db(process.env.MONGODB_NAME);
        const usersCollection = db.collection("users");
        
        const user = await usersCollection.findOne({email: email});
      return new Response(JSON.stringify(user), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
    });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch user' + error }), {
            status: 500,
        });
    }
}