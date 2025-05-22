import React, {useState} from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import {  useSession } from 'next-auth/react';

function WishItem({ image, name, price, rating, reviews, prod, images }) {
    const ratingValue = (parseFloat(rating) / 100) * 5;
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const { addToCart } = useCart();
    const cardImage = images?.[0] || image;
    const { data: session} = useSession();
    const [visible, setVisible] = useState(true);
    
    const email = session.user.email;

    const normalizedProd = {
        ...prod,
        id: prod._id,
        image: cardImage,
        name: prod.name || prod.title,
    };

    const remove = async() => {
        let deleteParameter = { email: email, listingId: normalizedProd.id };

        const res = await fetch('/api/wishlist', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(deleteParameter),
        });
        
        const data = await res.json();
        alert(data.message || data.error || 'No response message');
        setVisible(false);
    }
    if (!visible) return null;
    return (
        <section id="wishItem" className="flex flex-col">
            {/* Image Section */}
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-3xl">
                <Image src={cardImage} alt="image" fill className="" />
            </div>

            {/* Star Rating */}
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

            {/* Name */}
            <p className="pl-2">{name}</p>

            {/* Price & Buttons */}
            <div className="flex items-center justify-between px-2 pt-2">
            {/* Price */}
            <p className="font-bold">${price}</p>

            {/* Action Buttons */}
            <div className="flex gap-2">
                {/* Remove Button */}
                <button onClick={() => remove()}
                    className="text-xl text-[#F55266] hover:cursor-pointer"
                    title="Remove"
                >
                    <FaTrashAlt />
                </button>

                {/* Add to Cart Button */}
                <button
                    className="rounded border border-[#232933] bg-[#232933] p-1.5"
                    onClick={() => addToCart(normalizedProd)}
                    title="Add to Cart"
                >
                    <FaShoppingCart className="text-white" />
                </button>
            </div>
        </div>
        </section>
    );
}

WishItem.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    reviews: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    prod: PropTypes.object.isRequired,
    images: PropTypes.object.isRequired,
};

export default WishItem;