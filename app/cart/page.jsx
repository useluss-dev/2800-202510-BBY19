'use client';
import React from 'react';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import { useCart } from '../context/CartContext';

function cart() {
    const { cartItems } = useCart();

    return (
        <div>
            <div className="p-6">
                <p className="pb-4 text-sm text-gray-400">placeholder</p>
                <h1 className="mb-4 text-2xl font-bold">Shopping cart</h1>

                {/* Header Row */}
                <div className="flex flex-col justify-between px-6 lg:flex-row">
                    <div className="lg:w-2/3">
                        <div className="flex justify-around gap-4 border-b border-gray-500 py-8 pb-2 font-semibold text-white">
                            <div className="w-1/2 pl-6">
                                <p>Product</p>
                            </div>
                            <div className="ml-5 flex w-1/2 items-center justify-evenly gap-4 md:mr-2 md:ml-0 lg:mr-8">
                                <p className="text-center">Quantity</p>
                                <p className="text-center">Total</p>
                            </div>
                        </div>

                        {/* Cart Items */}
                        {cartItems.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-8 lg:mt-0 lg:ml-0 lg:flex lg:w-1/3 lg:justify-end">
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default cart;
