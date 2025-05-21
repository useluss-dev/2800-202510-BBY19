'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Chat from '../../components/Chat';
import { IoMdContacts } from 'react-icons/io';

function ListingDetails() {
    const [showChat, setShowChat] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const userId = 'u123';
    const sellerId = 's456';
    const sellerName = 'John Doe';

    return (
        <div>
            <div className="flex items-start space-y-3 space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200 text-lg font-bold text-white">
                    icon
                </div>
                <div>
                    <div className="font-semibold">
                        name<span className="text-gray-500">(num reviews)</span>
                    </div>
                    <div className="space-x-2 text-sm text-white">
                        <Link href="#" className="underline hover:text-[#F55266]">
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

                <div className="fixed right-6 bottom-4 z-50">
                    {showChat ? (
                        <div className="w-[350px] max-w-[90%] rounded-md border bg-white shadow-lg">
                            <div
                                onClick={() => setCollapsed(!collapsed)}
                                className="flex cursor-pointer items-center justify-between rounded-t-md bg-gray-800 p-3 text-white"
                            >
                                <span className="font-semibold">{sellerName}</span>
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

                            {!collapsed && <Chat userId={userId} sellerId={sellerId} />}
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
            </div>
        </div>
    );
}

export default ListingDetails;
