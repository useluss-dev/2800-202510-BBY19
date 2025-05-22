'use client';
import React from 'react';
import Image from 'next/image';

const products = [
    {
        title: 'graphics card',
        price: 175.0,
        image: '/gpu.png',
    },
    {
        title: 'headphones',
        price: 150,
        image: '/headphones.png',
    },
    {
        title: 'raspberry pi',
        price: 100,
        image: '/rasp.png',
    },
    {
        title: 'scenery',
        price: 10000000,
        image: '/scenery.jpg',
    },
];

function SellerPage() {
    return (
        <div>
            <div className="mx-auto max-w-screen-xl px-4 py-6">
                {/* Header */}
                <div className="mb-6 flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
                    {/* Seller Info */}
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-200 text-xl font-bold text-white">
                            M
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold">name</h1>
                            <p className="text-sm text-white">
                                <span className="font-bold text-white">99.3%</span> positive
                                feedback
                            </p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-2 flex items-center gap-2 sm:mt-0">
                        <input
                            type="text"
                            placeholder="Search their items"
                            className="w-60 rounded-full border px-4 py-2 text-sm shadow-sm"
                        />
                    </div>
                </div>

                {/* Product Grid */}
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product, idx) => (
                        <div
                            key={idx}
                            className="rounded-lg border p-3 shadow transition hover:shadow-lg"
                        >
                            <div className="relative mb-3 h-48 w-full">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="rounded-md object-contain"
                                />
                            </div>
                            <h2 className="text-sm font-medium">{product.title}</h2>
                            <p className="mt-2 text-lg font-semibold">
                                ${product.price.toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SellerPage;
