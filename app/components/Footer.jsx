'use client';
import Logo from '../assets/images/ReCompute.png';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    const [geo, setGeo] = useState(null);

    useEffect(() => {
        // Check if it's already stored in sessionStorage
        const cached = sessionStorage.getItem('geo');
        if (cached) {
            setGeo(JSON.parse(cached));
            return;
        }

        // Fetch once and cache
        fetch('https://ipapi.co/json/')
            .then((res) => res.json())
            .then((data) => {
                console.log('Geo data:', data);
                setGeo(data);
                sessionStorage.setItem('geo', JSON.stringify(data));
            })
            .catch((err) => {
                console.error('Failed to fetch geo data:', err);
            });
    }, []);

    return (
        <div className="border-t-2 border-gray-700 pt-4">
            <div className="w-full">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="flex items-center justify-start text-lg font-bold">
                        <Image src={Logo} width={60} height={60} alt="Logo" />
                        <span>ReCompute</span>
                    </div>

                    <div>
                        <Link className="flex w-3 p-4 lg:hover:text-gray-400" href="/profile">
                            <h3 className=" font-semibold">Profile</h3>
                        </Link>

                        {geo?.city && (
                            <p className="px-4 pb-4 font-semibold text-gray-300">
                                You&apos;re browsing from {geo.city}, {geo.country}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex justify-center gap-6 pb-6">
                        <Image src="/visa.png" width={50} height={50} alt="Visa" />
                        <Image src="/mastercard.png" width={50} height={50} alt="Mastercard" />
                        <Image src="/gPay.png" width={50} height={50} alt="Google Pay" />
                        <Image
                            src="/aPay.png"
                            width={50}
                            height={50}
                            alt="Apple Pay"
                            className="invert"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
