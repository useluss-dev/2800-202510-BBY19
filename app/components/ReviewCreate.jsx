'use client';
import React from 'react';

export default function ReviewCreate() {
    return (
        <div className="flex w-full flex-col space-y-4 rounded-2xl bg-[#1B273A] px-6 py-10 shadow-lg">
            <div>Item Name</div>

            <div className="flex items-center space-x-2">
                <div>Rating:</div>
                <select className="hover: appearance-none rounded border border-transparent bg-[#556780] fill-current px-2 py-1 text-white outline-none focus:border-2 focus:border-[#F55266]">
                    <option>Poor</option>
                    <option>Ok</option>
                    <option>Good</option>
                </select>
            </div>

            <div>Input your review title here:</div>
            <textarea
                type="text"
                className="rounded border border-transparent bg-[#556780] px-2 py-1 text-white outline-none focus:border-2 focus:border-[#F55266] lg:w-1/2"
                id="reviewTitle"
            />

            <div>Input your review description here:</div>
            <textarea
                type="text"
                className="rounded border border-transparent bg-[#556780] px-2 py-1 text-white outline-none focus:border-2 focus:border-[#F55266] lg:w-1/2"
                id="reviewBody"
            />

            <button className="mt-4 rounded bg-[#F55266] px-4 py-2 text-white hover:bg-[#f55265c8] md:w-1/5 lg:w-1/7">
                Submit
            </button>
        </div>
    );
}
