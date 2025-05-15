import React from 'react';
import Image from 'next/image';
import { GoPlus, GoDash } from 'react-icons/go';
import { MdOutlineClose } from 'react-icons/md';

function CartItem({ item, quanAdd, quanMinus, remove }) {
    const itemTotalPrice = (item.price * item.quantity).toFixed(2);
    return (
        <div className="grid grid-cols-[2fr_1fr_1fr_auto] items-center justify-center gap-4 border-t border-gray-500 py-4 lg:mx-0 lg:w-full">
            <div className="flex min-w-0 items-center gap-4">
                <Image src={item.image} alt={item.name} width={100} height={100} />
                <div>
                    <h3 className="pb-1 font-bold">{item.name}</h3>
                    <p className="text-sm">
                        <span className="text-gray-400">Price: </span> ${item.price}
                    </p>
                    <p className="text-sm">
                        <span className="text-gray-400">Brand: </span> {item.brand}
                    </p>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="flex items-center justify-center gap-3 rounded-xl border border-gray-300 px-4 py-2 align-middle md:w-2/3 lg:w-1/2">
                    <button onClick={() => quanMinus(item.id)} className='hover:cursor-pointer'>
                        <GoDash />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => quanAdd(item)} className='hover:cursor-pointer'>
                        <GoPlus />
                    </button>
                </div>
            </div>

            <p className="text-center font-semibold">${itemTotalPrice}</p>

            <div>
                <button
                    onClick={() => remove(item.id)}
                    className="text-xl text-[#F55266] hover:cursor-pointer"
                >
                    <MdOutlineClose />
                </button>
            </div>
        </div>
    );
}

export default CartItem;
