import React from 'react';
import Image from 'next/image';
import { GoPlus, GoDash } from 'react-icons/go';
import { MdOutlineClose } from 'react-icons/md';

function CartItem() {
    return (
        <div className="flex items-center justify-around gap-4 mx-6 pb-2 border-b border-gray-500 lg:w-2/3">
            <div>
                <Image src="/headphones.png" alt="Product Image" width={100} height={100} />
            </div>

            {/* Placeholder for product details */}
            <div>
                <h3 className="text-lg font-bold pb-1">placeholder</h3>
                <p className="text-sm">
                    <span className="text-gray-400">Price: </span>
                    White
                </p>
                <p className="text-sm">
                    <span className="text-gray-400">Brand: </span>
                    Apple
                </p>
            </div>

            {/* Placeholder for quantity and remove button */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-2">
                    <button>
                        <GoDash />
                    </button>
                    <span>1</span>
                    <button>
                        <GoPlus />
                    </button>
                </div>

                <p>$499.99</p>
                <button>
                    <MdOutlineClose />
                </button>
            </div>
        </div>
    );
}

export default CartItem;
