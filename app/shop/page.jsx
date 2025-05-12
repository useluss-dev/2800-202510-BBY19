'use client';
import { React, useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';

function page() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const fetchListings = async () => {
            const res = await fetch('/api/listings');
            const data = await res.json();
            setListings(data);
        };

        fetchListings();
    }, []);

    return (
        <div className="p-4 md:p-8">
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci fugit ratione nostrum aut explicabo expedita magni, similique consequatur ducimus maxime ab dolor repellat consectetur molestias ut non! Ullam non, earum eaque, tempore hic animi, accusantium iste nobis corrupti magnam facilis.</div>
            <div className="grid pt-4 lg:w-2/3 grid-cols-2 gap-6 md:grid-cols-3 md:gap-8">
                {listings.map((listing) => {
                    return (
                        <ItemCard
                            key={listing.id}
                            image={listing.image}
                            name={listing.name}
                            price={listing.price}
                            rating={listing.rating}
                            reviews={listing.reviews}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default page;
