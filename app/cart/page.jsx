'use client';
import React from 'react';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import { useCart } from '../context/CartContext';

function Cart() {
    const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

    //function to increase quantity by 1 using updateQuantity from CartContext
    const quanIncrease = (item) => {
        updateQuantity(item.id, item.quantity + 1);
    };

    //function to decrease quantity by 1 using updateQuantity from CartContext
    const quanDecrease = (id) => {
        const current = cartItems.find((item) => item.id === id);
        if (current && current.quantity > 1) {
            updateQuantity(id, current.quantity - 1);
        }
    };

    //function to remove item from cart
    const removeItem = (id) => {
        removeFromCart(id);
    };

    //total price of all items in cart and num of items in cart
    const totalPrice = cartItems
        .map((item) => item.price * item.quantity)
        .reduce((a, b) => a + b, 0)
        .toFixed(2);
    const itemsInCart = cartItems.length;

    return (
        <div className="min-h-[calc(100vh-92px-263px)] lg:min-h-[calc(100vh-140px-263px)]">
            <div className="p-6">
                <h1 className="mb-4 text-2xl font-bold">Shopping cart</h1>

                {itemsInCart === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div className="flex flex-col justify-between px-6 lg:flex-row">
                        {/* Header Row */}
                        <div className="lg:w-2/3">
                            <div className="grid grid-cols-[3fr_2fr_1fr_.5fr] items-center gap-4 border-b border-gray-500 py-4 font-semibold text-white">
                                <p>Product</p>
                                <p className="text-center">Quantity</p>
                                <p className="text-center">Total</p>
                                <button
                                    onClick={clearCart}
                                    className="text-right text-[#F55266] hover:cursor-pointer"
                                >
                                    Clear
                                </button>
                            </div>

                            {/* Cart Items */}
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    quanAdd={quanIncrease}
                                    quanMinus={quanDecrease}
                                    remove={removeItem}
                                />
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="mt-8 lg:mt-0 lg:ml-0 lg:flex lg:w-1/3 lg:justify-end">
                            <OrderSummary cartTotalPrice={totalPrice} cartLength={itemsInCart} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
