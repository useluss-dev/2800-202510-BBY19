import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import PropTypes from 'prop-types';
import { useCart } from '../context/CartContext';

function OrderSummary({ cartTotalPrice, cartLength }) {
    const { cartItems } = useCart();

    //call the checkout endpoint to pass it cartItems and create a session
    const handleCheckout = async () => {
        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartItems }),
        });

        const data = await res.json();

        if (data.url) {
            window.location.href = data.url;
        } else {
            console.error('No url returned from Stripe session');
            alert('Failed to initiate checkout');
        }
    };
    return (
        <div className="mx-6 mt-8 flex flex-col items-center justify-between gap-4 rounded-lg border border-gray-500 bg-[#232933] p-4 lg:h-fit lg:w-2/3">
            <h1 className="w-full border-b-1 border-gray-500 pb-4 text-center text-xl font-bold">
                Order Summary
            </h1>
            <div className="flex w-full items-center justify-between">
                <p className="text-sm text-gray-400">Subtotal ({cartLength}):</p>
                <p className="text-sm">${cartTotalPrice}</p>
            </div>
            <div className="flex w-full items-center justify-between">
                <p className="text-sm text-gray-400">Saving:</p>
                <p className="text-sm">RECOMPUTE20</p>
            </div>
            <div className="flex w-full items-center justify-between">
                <p className="text-sm text-gray-400">Tax collected:</p>
                <p className="text-sm">Calculated at checkout</p>
            </div>
            <div className="flex w-full items-center justify-between border-b-1 border-gray-500 pb-4">
                <p className="text-sm text-gray-400">Shipping:</p>
                <p className="text-sm">Calculated at checkout</p>
            </div>
            <div className="flex w-full items-center justify-between">
                <p className="text-sm text-gray-400">Estimated total:</p>
                <p className="text-sm">${cartTotalPrice}</p>
            </div>

            <div className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#F55266] py-3 font-semibold text-white hover:bg-[#f55265c8]">
                <button onClick={handleCheckout} className="flex items-center justify-center gap-2">
                    Proceed to checkout
                    <MdKeyboardArrowRight />
                </button>
            </div>
        </div>
    );
}

export default OrderSummary;

OrderSummary.propTypes = {
    cartTotalPrice: PropTypes.number.isRequired,
    cartLength: PropTypes.number.isRequired,
};
