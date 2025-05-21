import clientPromise from "../../lib/mongodb";  

const mydata = {
    _id: "123",
    fullName: "John Doe",
    password: "password123",
    listings: ["19055063b6fc465f8ee6197e99d6dd37"],
    buyerRating: null,
    sellerRating: "97.3% -> This represents the percentage of positive ratings",
    wishlist: ["681cfdba182e3c0222e6d4d9","681cfdba182e3c0222e6d4dc","681cfdba182e3c0222e6d4de","681cfdba182e3c0222e6d4e0","681cfdba182e3c0222e6d4e3"],
    cart: [],
    phoneNumber: 6049927760
}

export async function GET() {
    try {
        const client = await clientPromise;
        console.log(process.env.MONGODB_NAME);
        const db = client.db(process.env.MONGODB_NAME);
        const listingsCollection = db.collection("listings");
        
        const wishlistListings = await listingsCollection.find({
            _id: { $in: mydata.wishlist }
        }).toArray();
      return new Response(JSON.stringify(wishlistListings), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
    });
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to fetch wishlists' }), {
            status: 500,
        });
    }
}