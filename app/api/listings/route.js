import clientPromise from '../../lib/mongodb';

export async function GET() {
    try {
        // await for client to connect
        const client = await clientPromise;
        // select the database "recompute"
        const db = client.db(process.env.MONGODB_NAME);
        // select the conllection "listings", find all documents and convert to array
        const listings = await db.collection(process.env.MONGODB_COLLECTIONL).find({}).toArray();

        //sends the resoponse back as json with a 200 code
        return new Response(JSON.stringify(listings), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
        // catch method for any errors and send back a 500 code
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch listings' }), {
            status: 500,
        });
    }
}
