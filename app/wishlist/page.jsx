'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import WishItem from '../components/WishItem';

export default function WishlistPage() {
    const { data: session, status } = useSession();
    const [items, setItems] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function loadItems() {
            try {
                const currentPort = window.location.port || 3000;
                const currentHost = window.location.hostname || 'localhost';
                const currentProtocol = window.location.protocol || 'http';
                const baseUrl = `${currentProtocol}//${currentHost}:${currentPort}`;

                const response = await fetch(`${baseUrl}/api/wishlist?email=${session.user.email}`);
                const data = await response.json();
                data.forEach((item) => {
                    item.source = 'wishlist';
                });
                setItems(data);
            } catch (error) {
                console.error('Failed to load wishlist:', error);
            }
        }
        if (status === 'authenticated') {
            console.log('email:', session.user.email);
            console.log('name: ', session.user.name);
            console.log('id:   ', session.user.id);
            loadItems();
        } else {
            console.log('Not authenticated');
            router.push('/login');
        }
    }, [router, session, status]);

    return (
        <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
            <h1 className="mb-6 text-center text-3xl font-bold">My Wishlist</h1>

            {items.length === 0 ? (
                <p className="text-center text-gray-500">Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                    {items.map((item) => (
                        <WishItem key={item.id || item._id} {...item} prod={item} />
                    ))}
                </div>
            )}
        </div>
    );
}
