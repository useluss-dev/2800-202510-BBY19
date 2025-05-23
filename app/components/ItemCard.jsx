import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'react-toastify';

function ItemCard({ image, name, price, rating, reviews, prod, images }) {
    const ratingValue = (parseFloat(rating) / 100) * 5;
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const { addToCart } = useCart();
    const cardImage = images?.[0] || image;
    const { data: session, status } = useSession();

    const normalizedProd = {
        ...prod,
        id: prod._id,
        image: cardImage,
        name: prod.name,
    };
    const addtoWishList = async () => {
        if (status === 'authenticated') {
            let addParameter = { email: session.user.email, listingId: normalizedProd.id };
            const res = await fetch('/api/wishlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(addParameter),
            });
            const data = await res.json();
            toast.success(data.message || data.error || 'No response message');
        } else {
            alert('Please login to add listing to wishlist');
        }
    };
    return (
        <Link href={`/listing/${normalizedProd.id}`} className="group flex flex-col">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl">
                <Image src={cardImage} alt="image" fill className="" />
            </div>

            <p className="pt-2 pl-2">{name}</p>
            <div className="flex items-center justify-between px-2">
                <p className="font-bold">${price}</p>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => addtoWishList()}
                        className="text-xl hover:cursor-pointer hover:text-[#F55266]"
                        title="Add to Wishlist"
                    >
                        <FaHeart />
                    </button>
                    <button
                        className="rounded border border-[#232933] bg-[#232933] p-1.5"
                        onClick={(e) => {
                            e.preventDefault();
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
