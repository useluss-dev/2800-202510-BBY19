import React from 'react';
import Image from 'next/image';

function ItemCard({ image, desc, price }) {
    return (
        <section className="flex flex-col">
            <div className="relative h-64 w-64 overflow-hidden rounded-3xl">
                <Image src={image} alt="image" fill className="object-cover" />
            </div>
            <p>{desc}</p>
            <p className="font-bold">${price}</p>
        </section>
    );
}

export default ItemCard;
