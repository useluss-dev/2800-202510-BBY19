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
        <div>
            {console.log(...listings)}
            <ItemCard />
        </div>
    );
}

export default page;
