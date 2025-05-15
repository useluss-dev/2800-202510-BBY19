import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

function ItemCard({ image, name, price, rating, reviews, prod }) {
    const ratingValue = (parseFloat(rating) / 100) * 5;
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const { addToCart } = useCart();

    return (
        <section className="flex flex-col">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl">
                <Image src={image} alt="image" fill className="" />
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
                        onClick={() => {
                            addToCart(prod);
                        }}
                    >
                        <FaShoppingCart className="cursor-pointer" />
                    </button>
                </div>
            </div>
        </section>
    );
}

ItemCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    reviews: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ItemCard;
