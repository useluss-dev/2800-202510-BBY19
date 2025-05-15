import React from 'react';
import Image from 'next/image';
import { GoPlus, GoDash } from 'react-icons/go';
import { MdOutlineClose } from 'react-icons/md';

function CartItem({ item, quanAdd, quanMinus, remove }) {
    const itemTotalPrice = (item.price * item.quantity).toFixed(2);
    return (
        <div className="mx-6 flex items-center justify-around gap-4 border-t border-gray-500 py-6 lg:mx-0 lg:w-full">
            <div className="flex w-1/3 items-center gap-4">
                <div>
                    <Image src={item.image} alt={item.name} width={100} height={100} />
                </div>

                <div>
                    <h3 className="pb-1 text-lg font-bold">{item.name}</h3>
                    <p className="text-sm">
                        <span className="text-gray-400">Price: </span>
                        {item.price}
                    </p>
                    <p className="text-sm">
                        <span className="text-gray-400">Brand: </span>
                        {item.brand}
                    </p>
                </div>
            </div>

            <div className="flex w-1/3 items-center justify-around gap-7">
                <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-2">
                    <button onClick={() => quanMinus(item.id)}>
                        <GoDash />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => quanAdd(item)}>
                        <GoPlus />
                    </button>
                </div>

                <p>${itemTotalPrice}</p>
                <button onClick={() => remove(item.id)}>
                    <MdOutlineClose />
                </button>
            </div>
        </div>
    );
}

export default CartItem;
