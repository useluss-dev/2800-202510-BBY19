import React from 'react';
import Image from 'next/image';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart } from 'react-icons/fa';

function ItemCard({ image, name, price, rating, reviews, images }) {
    const ratingValue = (parseFloat(rating) / 100) * 5;
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const cardImage = images?.[0] || image;


    return (
        <section className="flex flex-col">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl">
                <Image src={cardImage} alt="image" fill className="" />
            </div>

            <div className="flex items-center gap-1 pt-2 pl-2">
                {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={`full-${i}`} className="text-orange-400" />
                ))}
                {hasHalfStar && <FaStarHalfAlt className="text-orange-400" />}
                {[...Array(emptyStars)].map((_, i) => (
                    <FaRegStar key={`empty-${i}`} className="text-orange-400" />
                ))}
                <span className="ml-1 text-sm text-gray-400">{reviews}</span>
            </div>

            <p className="pl-2">{name}</p>
            <div className="flex items-center justify-between px-2">
                <p className="font-bold">${price}</p>
                <div className="rounded border border-[#232933] bg-[#232933] p-1.5">
                    <FaShoppingCart />
                </div>
            </div>
        </section>
    );
}

export default ItemCard;
