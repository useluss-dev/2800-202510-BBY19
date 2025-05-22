import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

function ItemCard({ image, name, price, rating, reviews, prod, images }) {
    const ratingValue = (parseFloat(rating) / 100) * 5;
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const { addToCart } = useCart();
    const cardImage = images?.[0] || image;

    const normalizedProd = {
        ...prod,
        id: prod._id,
        image: cardImage,
        name: prod.name,
    };

    return (
        <Link href={`/listing/${normalizedProd.id}`} className="group flex flex-col">
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
                <div className="">
                    <button
                        className="rounded border border-[#232933] bg-[#232933] p-1.5"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent Link navigation when clicked
                            addToCart(normalizedProd);
                        }}
                    >
                        <FaShoppingCart className="cursor-pointer" />
                    </button>
                </div>
            </div>
        </Link>
    );
}

ItemCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    reviews: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    prod: PropTypes.object.isRequired,
    images: PropTypes.object.isRequired,
};

export default ItemCard;
