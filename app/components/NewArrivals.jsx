'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import ItemCard from '../components/ItemCard';

function NewArrivals() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const res = await fetch('/api/listings');
            const data = await res.json();

            //Client side
            const sortedItems = data.sort((a, b) => b.timestamp - a.timestamp).slice(0, 6);
            setItems(sortedItems);
        };
        fetchItems();
    }, []);

    return (
        <div className="mt-6 w-full py-5">
            <div className="flex w-full max-w-screen-xl flex-col rounded-lg p-3">
                <div>
                    <h1 className="mb-4 ml-3 text-2xl font-bold text-white">Recents</h1>
                </div>

                <div className="object-fit grid grid-cols-2 items-center justify-around gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {items.map((item, index) => (
                        <div key={index} className="m-1">
                            <ItemCard
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                rating={item.rating}
                                reviews={item.reviews}
                                images={item.images}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NewArrivals;
