'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { IoMdContacts } from 'react-icons/io';
import Chat from '../../../components/Chat';
import { useSession } from 'next-auth/react';
import PropTypes from 'prop-types';

export default function ListingDetails({ listing, posterName }) {
    const [showChat, setShowChat] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    // const sellerId = 'seller123';
    // const chatUserName = 'John Doe';

    // const searchParams = useSearchParams();
    // const userId = searchParams.get('user') || 'user1'; // current user
    // const sellerId = searchParams.get('seller') || 'seller123';

    const { data: session, status } = useSession();
    if (status === 'loading') return null;

    const userId = session?.user?.id; // Logged-in user
    const posterId = listing?.posterId; // From DB
    const isOwnListing = userId === posterId;

    return (
        <div>
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
                        <Link
                            href={`/seller/${posterId}`}
                            className="underline hover:text-[#F55266]"
                        >
                            Seller&apos;s page
                        </Link>
                    </div>
                </div>
            </div>

            <hr />

            {/* Title and price */}
            <h1 className="py-6 text-5xl font-extrabold">{listing.name}</h1>
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
                    Add to cart
                </button>
                <button className="w-full cursor-pointer rounded-full border-2 border-[#F55266] py-3 font-semibold text-white hover:bg-[#F55266]">
                    Add to Wishlist
                </button>

                <div className="fixed right-6 bottom-4 z-50">
                    {!isOwnListing && (
                        <div className="fixed right-6 bottom-4 z-50">
                            {showChat ? (
                                <div className="w-[350px] max-w-[90%] rounded-lg border border-gray-500 bg-white shadow-lg">
                                    <div
                                        onClick={() => setCollapsed(!collapsed)}
                                        className="flex cursor-pointer items-center justify-between rounded-t-md bg-gray-800 p-3 text-white"
                                    >
                                        <span className="font-semibold">{posterName}</span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowChat(false);
                                            }}
                                            className="text-2xl text-white hover:text-red-400"
                                        >
                                            ×
                                        </button>
                                    </div>

                                    {!collapsed && (
                                        <Chat
                                            userId={userId}
                                            sellerId={posterId}
                                            chatUserName={posterName}
                                        />
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowChat(true)}
                                    className="flex items-center gap-2 rounded-full bg-[#F55266] px-4 py-2 font-bold text-white shadow hover:bg-[#e04858]"
                                >
                                    <IoMdContacts /> Contact Seller
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

ListingDetails.propTypes = {
    posterName: PropTypes.string.isRequired,
    listing: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        condition: PropTypes.string,
        reviews: PropTypes.number,
        rating: PropTypes.string,
        posterId: PropTypes.string,
    }).isRequired,
};
