import clientPromise from "../../lib/mongodb";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_NAME);
        const user = await db.collection('users').findOne({ email: email });
        
        if (user) {
            const listingsCollection = db.collection("listings");
            const wishlistListings = await listingsCollection.find({
                _id: { $in: user.wishlist }
            }).toArray();
            return new Response(JSON.stringify(wishlistListings), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to fetch wishlists' }), {
            status: 500,
        });    
        }
    } catch (error) {
        console.log("Error", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch wishlists' }), {
            status: 500,
        });
    }
     
}