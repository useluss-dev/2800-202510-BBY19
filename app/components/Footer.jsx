'use client';
import Logo from '../assets/images/ReCompute.png';
import { useEffect, useState } from 'react';
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
        fetch('http://ip-api.com/json/')
            .then((res) => res.json())
            .then((data) => {
                setGeo(data);
                sessionStorage.setItem('geo', JSON.stringify(data));
            })
            .catch((err) => {
                console.error('Failed to fetch geo data:', err);
            });
    }, []);

    return (
        <div className="flex flex-col px-4">
            <div className="flex items-center text-xl font-bold">
                <Image src={Logo} width={75} height={75} alt="Logo" />
                ReCompute
            </div>
            <div className="">
                <Link className="flex w-3 p-4 lg:hover:text-gray-400" href="/profile">
                    <h3 className="text-lg font-semibold">Profile</h3>
                </Link>
                {geo?.city && (
                    <p className="px-4 pb-4 text-lg font-semibold text-gray-300">
                        You&apos;re browsing from {geo.city}, {geo.country}
                    </p>
                )}
                <div className="flex flex-row justify-center gap-6 border-t-2 border-gray-700 p-4 md:justify-center">
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
    );
}
