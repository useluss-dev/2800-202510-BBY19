import React from 'react';
import Link from 'next/link';

function ListingDetails() {
    return (
        <div>
            {/* Seller info */}
            <div className="flex items-start space-y-3 space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200 text-lg font-bold text-white">
                    icon
                </div>
                <div>
                    <div className="font-semibold">
                        name<span className="text-gray-500">(num reviews)</span>
                    </div>
                    <div className="space-x-2 text-sm text-pink-500">
                        <Link href="#">% of positive ratings</Link>
                        <span>·</span>
                        <Link href="#">Seller&apos;s page</Link>
                    </div>
                </div>
            </div>

            <hr />

            {/* Title and price */}
            <h1 className="py-6 text-5xl font-extrabold">Item Name</h1>
            <div className="py-6">
                <p className="text-4xl font-bold">$175.00</p>
                <p className="text-md text-gray-500">or Best Offer</p>
            </div>

            <hr />

            {/* Condition */}
            <div className="py-6 text-sm">
                <span className="font-semibold">Condition:</span>{' '}
                <span className="font-bold text-gray-500">For parts or not working</span>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
                <button className="w-full cursor-pointer rounded-full bg-pink-500 py-3 font-semibold text-white transition hover:bg-pink-600">
                    Buy It Now
                </button>
                <button className="w-full cursor-pointer rounded-full border-2 border-pink-500 py-3 font-semibold text-pink-500">
                    Add to cart
                </button>
                <button className="w-full cursor-pointer rounded-full border-2 border-pink-500 py-3 font-semibold text-pink-500">
                    Make offer
                </button>
                <button className="w-full cursor-pointer rounded-full border-2 border-pink-500 py-3 font-semibold text-pink-500">
                    Add to Wishlist
                </button>
            </div>
        </div>
    );
}

export default ListingDetails;
