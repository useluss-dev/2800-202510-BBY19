import React from 'react';
import Link from 'next/link';

function ListingDetails({ listing, posterName }) {
    return (
        <div>
            {/* Seller info */}
            <div className="flex items-start space-y-3 space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200 text-lg font-bold text-white">
                    icon
                </div>
                <div>
                    <div className="font-semibold">
                        {posterName}
                        <span className="text-gray-500"> ({listing.reviews || 0})</span>
                    </div>
                    <div className="space-x-2 text-sm text-white">
                        <Link href="#" className="underline hover:text-[#F55266]">
                            {listing.rating}
                            <span className="font-bold">%</span> of positive ratings
                        </Link>
                        <span>·</span>
                        <Link href="#" className="underline hover:text-[#F55266]">
                            Seller&apos;s page
                        </Link>
                    </div>
                </div>
            </div>

            <hr />

            {/* Title and price */}
            <h1 className="py-6 text-5xl font-extrabold">Item Name</h1>
            <div className="py-6">
                <p className="text-4xl font-bold">${listing.price}</p>
                <p className="text-md text-gray-500">or Best Offer</p>
            </div>

            <hr />

            {/* Condition */}
            <div className="py-6 text-sm">
                <span className="font-semibold">Condition:</span>{' '}
                <span className="font-bold text-gray-500">{listing.condition}</span>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
                <button className="w-full cursor-pointer rounded-full bg-[#F55266] py-3 font-semibold text-white transition hover:bg-[#f55265c8]">
                    Buy It Now
                </button>
                <button className="w-full cursor-pointer rounded-full border-2 border-[#F55266] py-3 font-semibold text-white hover:bg-[#F55266]">
                    Add to cart
                </button>
                <button className="w-full cursor-pointer rounded-full border-2 border-[#F55266] py-3 font-semibold text-white hover:bg-[#F55266]">
                    Make offer
                </button>
                <button className="w-full cursor-pointer rounded-full border-2 border-[#F55266] py-3 font-semibold text-white hover:bg-[#F55266]">
                    Add to Wishlist
                </button>
            </div>
        </div>
    );
}

export default ListingDetails;
