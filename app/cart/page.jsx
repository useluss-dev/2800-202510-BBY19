import React from 'react';
import Header from '../components/Header';
import CartItem from '../components/CartItem';

function cart() {
    return (
        <div>
            <Header />

            <div className="p-6">
                <p className="pb-4 text-sm text-gray-400">placeholder</p>
                <h1 className="mb-4 text-2xl font-bold">Shopping cart</h1>

                {/* Header Row */}
                <div className="mx-6 flex justify-around gap-4 border-b border-gray-500 py-8 pb-2 font-semibold text-white lg:w-2/3">
                    <div className="w-1/2 pl-6">
                        <p className="">Product</p>
                    </div>

                    <div className="ml-5 flex w-1/2 items-center justify-evenly gap-4 md:mr-2 md:ml-0 lg:mr-8">
                        <p className="text-center">Quantity</p>
                        <p className="text-center">Total</p>
                    </div>
                </div>

                {/* Cart Item */}
                <CartItem />
                <CartItem />
            </div>
        </div>
    );
}

export default cart;
