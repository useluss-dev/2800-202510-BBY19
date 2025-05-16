'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

function Success() {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, []);
    return (
        <div className="flex min-h-[calc(100vh-92px)] flex-col items-center justify-center lg:min-h-[calc(100vh-140px)]">
            <Image src="/success.png" alt="success" width={200} height={200} className="mb-8" />
            <h1 className="text-2xl font-bold">Thank you for shopping with us</h1>
            <Link
                href="/"
                className="mt-4 rounded-lg bg-[#F55266] px-6 py-3 font-semibold text-white hover:bg-[#f55265c8]"
            >
                <button>Home page</button>
            </Link>
        </div>
    );
}

export default Success;
