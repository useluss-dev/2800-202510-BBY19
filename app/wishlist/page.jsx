'use client'
import { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';

export default function WishlistPage() {
    const [items, setItems] = useState([]);

    // Fetch data on component mount
    useEffect(() => {
        async function loadItems() {
            try {
                const currentPort = window.location.port || 3000; 
                const currentHost = window.location.hostname || 'localhost'; 
                const currentProtocol = window.location.protocol || 'http'; 
                const baseUrl = `${currentProtocol}//${currentHost}:${currentPort}`;    
                console.log(baseUrl);
                
                const response = await fetch(`${baseUrl}/api/wishlist`);
                const data = await response.json();
                data.forEach((item) => {
                    item.source = 'wishlist';
                });
                console.log(data);
                setItems(data);
            } catch (error) {
                console.error('Failed to load wishlist:', error);
            }
        }

        loadItems();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
            <h1 className="mb-6 text-center text-3xl font-bold">My Wishlist</h1>

            {items.length === 0 ? (
                <p className="text-center text-gray-500">Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                        <div key={item._id} className="rounded-2xl bg-white p-4 shadow">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-48 w-full rounded-xl object-cover"
                            />
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold">{item.name}</h2>
                                <p className="text-sm text-gray-500">
                                    {item.category} — {item.brand}
                                </p>
                                <p className="mt-2 line-clamp-2 text-gray-700">
                                    {item.description}
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-lg font-bold text-blue-600">
                                        ${item.price}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {item.reviews} reviews
                                    </span>
                                </div>
                                <div className="mt-1 text-sm text-yellow-500">
                                    Rating: {item.rating}
                                </div>
                                <button className="mt-4 w-full rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}