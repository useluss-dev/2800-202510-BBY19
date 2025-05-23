import React from 'react';
import ItemCard from './ItemCard';

// TODO: Replace this array with API call to get cards
const cards = [
    {
        img: '/scenery.jpg',
        desc: 'A beautiful mountain view',
        price: '50.00',
    },
    {
        img: '/scenery.jpg',
        desc: 'A beautiful mountain view',
        price: '50.00',
    },
    {
        img: '/scenery.jpg',
        desc: 'A beautiful mountain view',
        price: '50.00',
    },
    {
        img: '/scenery.jpg',
        desc: 'A beautiful mountain view',
        price: '50.00',
    },
    {
        img: '/scenery.jpg',
        desc: 'A beautiful mountain view',
        price: '50.00',
    },
    {
        img: '/scenery.jpg',
        desc: 'a beautiful mountain view',
        price: '50.00',
    },
    {
        img: '/scenery.jpg',
        desc: 'A beautiful mountain view',
        price: '50.00',
    },
];

function ListingGroup() {
    return (
        <div className="no-scrollbar flex max-w-full flex-row gap-10 overflow-x-auto px-10">
            {cards.map((item, idx) => (
                <ItemCard key={idx} image={item.img} desc={item.desc} price={item.price} />
            ))}
        </div>
    );
}

export default ListingGroup;
