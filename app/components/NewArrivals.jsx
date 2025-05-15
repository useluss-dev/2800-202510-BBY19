'use client'
import { useState, useEffect } from 'react'
import React from 'react'
import ItemCard from '../components/ItemCard';


function NewArrivals() {

    const [items, setItems] = useState([])

    useEffect(() => {
        const fetchItems = async () => {
            const res = await fetch('/api/listings');
            const data = await res.json();
            //Client side
            const sortedItems = data.sort((a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6);
            setItems(sortedItems);
        };
        fetchItems();
    }, []);

    return (
        <div className="w-full py-5 mt-6">
            {console.log(items)}
            <div className="flex flex-col p-3 rounded-lg w-full max-w-screen-xl">
                <div>
                    <h1 className="text-2xl font-bold text-white ml-3 mb-4">Recents</h1>
                </div>

                <div className="grid grid-cols-2 justify-around items-center gap-4 object-fit md:grid-cols-3 lg:grid-cols-4">
                    {items.map((item, index) => (
                        <div key={index} className="m-1">
                            <ItemCard
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                rating={item.rating}
                                reviews={item.reviews}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NewArrivals