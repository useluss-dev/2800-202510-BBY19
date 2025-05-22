import clientPromise from "../../lib/mongodb";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    // TODO: remove later
    console.log('params ' + email);
    
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


export async function DELETE(request) {
    try {
        const body = await request.json();
        const { email, listingId } = body;
        
        const client = await clientPromise;
        console.log(process.env.MONGODB_NAME);
        const db = client.db(process.env.MONGODB_NAME);
        const usersCollection = db.collection("users");
        const user = await db.collection('users').findOne({ email: email });

        if (user) {
            await usersCollection.updateOne(
              { _id: user._id }, // assuming you have user._id
                { $pull: { wishlist: listingId } }
            );
            return new Response(JSON.stringify({ message: 'Wishlist item removed successfully' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            console.log('In here 7');
            return new Response(JSON.stringify({ error: 'Failed to remove from wishlist' }), {
            status: 500,
        });
        }
    } catch (error) {
        console.log("Error", error);
        return new Response(JSON.stringify({ error: 'Failed to remove from wishlist' }), {
            status: 500,
        });
    }
}


export async function POST(request) {
    try {
        const body = await request.json();
        console.log(body);
        const { email, listingId } = body;

        const client = await clientPromise;
        console.log(process.env.MONGODB_NAME);
        const db = client.db(process.env.MONGODB_NAME);
        const usersCollection = db.collection("users");
        console.log(email);

        const user = await db.collection('users').findOne({ email: email });
        console.log(user);
        
        if (user) {
            await usersCollection.updateOne(
              { _id: user._id }, // assuming you have user._id
                { $addToSet: { wishlist: listingId } }
            );
        }
      return new Response(JSON.stringify({ message: 'Inserted wishlist successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
    });
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to insert wishlists' }), {
            status: 500,
        });
    }     

}