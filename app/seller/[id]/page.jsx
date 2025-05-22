'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ItemCard from '@/app/components/ItemCard';

export default function SellerPage() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [sellerName, setSellerName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/listings`)
            .then((r) => r.json())
            .then((all) => {
                setProducts(all.filter((l) => l.posterId === id));
            });
    }, [id]);

    useEffect(() => {
        async function load() {
            setLoading(true);
            // Fetch listing
            const listingsRes = await fetch('/api/listings');
            const all = await listingsRes.json();
            setProducts(all.filter((l) => l.posterId === id));

            const userRes = await fetch(`/api/user/${id}`);
            if (userRes.ok) {
                setSellerName(name);
            } else {
                setSellerName('Unknown Seller');
            }
            setLoading(false);
        }
        load();
    }, [id]);

    if (loading) return <p className="p-4 text-center">Loading…</p>;

    return (
        <div>
            <div className="mx-auto max-w-screen-xl px-4 py-6">
                {/* Header */}
                <div className="mb-6 flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
                    {/* Seller Info */}
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-200 text-xl font-bold text-white">
                            {sellerName.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold">{sellerName}</h1>
                            <p className="text-sm text-white">
                                <span className="font-bold text-white">99.3%</span> positive
                                feedback
                            </p>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((item) => (
                        <ItemCard key={item.id || item._id} {...item} prod={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
