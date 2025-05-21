'use client';
import React, { useState, useEffect, useRef } from 'react';



export default function ReviewCreate() {
 

    return (
        <div className="w-full rounded-2xl bg-[#1B273A] py-10 shadow-lg flex flex-col space-y-4 px-6">
  <div>Item Name</div>

  <div className="flex items-center space-x-2">
    <div>Rating:</div>
    <select className=" appearance-none hover: rounded px-2 py-1 bg-[#556780] fill-current text-white border border-transparent focus:border-[#F55266] focus:border-2 outline-none">
      <option>Poor</option>
      <option>Ok</option>
      <option>Good</option>
    </select>
  </div>

  <div>Input your review title here:</div>
  <textarea type="text" className="bg-[#556780] px-2 py-1 rounded text-white border border-transparent focus:border-[#F55266] focus:border-2 outline-none lg:w-1/2" id="reviewTitle" />

  <div>Input your review description here:</div>
  <textarea type="text" className="bg-[#556780] px-2 py-1 rounded text-white border border-transparent focus:border-[#F55266] focus:border-2 outline-none lg:w-1/2" id="reviewBody" />

  <button className="mt-4 bg-[#F55266] text-white px-4 py-2 rounded hover:bg-[#f55265c8] md:w-1/5 lg:w-1/7">
    Submit
  </button>
</div>

    );
}
