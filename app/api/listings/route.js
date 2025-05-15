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
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to fetch listings' }), {
            status: 500,
        });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        console.log('Received listing data:', body);

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_NAME);

        const listingWithTimestamp = {
            ...body,
            timestamp: Date.now(),
            rating: '0%',
            reviews: 0,
        };

        const result = await db
            .collection(process.env.MONGODB_COLLECTIONL)
            .insertOne(listingWithTimestamp);

        console.log('Insert result:', result);

        return new Response(JSON.stringify({ success: true, insertedId: result.insertedId }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify({ error: 'Failed to create listing' }), {
            status: 500,
        });
    }
}
