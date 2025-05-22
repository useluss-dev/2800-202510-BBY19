'use client';
import React from 'react';
import { useState } from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuReply } from "react-icons/lu";
import { LiaThumbsDown } from "react-icons/lia";
import { LiaThumbsUp } from "react-icons/lia";



export default function ViewReview() {

    const [isReplyVisible, setIsReplyVisible] = useState(false);

    const handleReplyToggle = () => {
        // Toggle it to be visible or not
        setIsReplyVisible(!isReplyVisible);
    };

    return (
        <div className="flex w-full flex-col space-y-4 rounded-2xl bg-[#1B273A] px-6 py-10 shadow-lg">
            <div>
                <h1 className='flex items-center font-bold text-2xl gap-2 underline'>
                    User Name from DB...
                    <IoMdCheckmarkCircleOutline className='text-[#F55266]' />
                </h1>
            </div>

            <div className="flex items-center space-x-2 gap-1 py-2">
                <div className='flex font-extrabold'>
                    Price:
                    <div id='PriceReview' className='font-normal text-gray-400 ml-2'>
                        Placeholder
                    </div>
                </div>
                <div className='flex font-extrabold'>
                    Brand:
                    <div id='BrandReview' className='font-normal text-gray-400 ml-2'>
                        Placeholder
                    </div>
                </div>
            </div>

            <div id='reviewDes' >
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime eaque nesciunt cumque. Cupiditate atque eius facilis in natus, qui hic id nisi minus vero tenetur corrupti nostrum, illum saepe voluptatum.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt quia fugiat voluptatum praesentium enim fugit voluptatem ex error vitae ratione! Beatae nobis eius rem ex quia. Vero assumenda delectus perspiciatis?


                <button
                    id='replyBtn'
                    className='flex gap-2 pt-4 pb-3 items-center hover:text-gray-400 hover:cursor-pointer'
                    onClick={handleReplyToggle}
                    aria-expanded={isReplyVisible}
                    aria-controls='textBox'
                >
                    <LuReply className='transform: rotate-180' />
                    Reply
                </button>

                {isReplyVisible && (
                    <div className="pb-3">
                        <textarea
                            id="textBox"
                            className="rounded border border-transparent bg-[#556780] w-full px-2 py-1 text-white outline-none focus:border-2 focus:border-[#F55266] md:w-full lg:w-full"
                            placeholder="Write your reply here..."
                            rows="4"
                        />
                        <div className="flex gap-2 mt-2">
                            <button
                                className="rounded bg-[#F55266] px-4 py-1 text-white hover:bg-[#f55265c8]"
                                onClick={() => {
                                    const textBox = document.getElementById('textBox');
                                    console.log('Reply:', textBox.value);
                                    // Hides textBox after submission
                                    setIsReplyVisible(false);
                                }}
                            >
                                Submit
                            </button>
                            <button
                                className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                                onClick={handleReplyToggle}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}



                <div className='flex items-center justify-end'>
                    <button className='flex gap-2.5'>
                        <LiaThumbsUp className='hover:text-[#F55266] size-5.5' />
                    </button>

                    <div className='text-xs border-l h-5 border-1 self-center border-gray-400 mx-1.5'></div>

                    <button>
                        <LiaThumbsDown className='hover:text-[#F55266] size-5.5' />
                    </button>
                </div>

            </div>


            <div>
                <div className='flex items-center pb-3 '>
                    <h1 className='bg-[#F55266] rounded mr-3 px-2'>
                        Reply
                    </h1>
                    <div id='userName' className='text-lg font-bold'>
                        Username...
                    </div>
                </div>

                <div id='userReply' className=''>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime eaque nesciunt cumque. Cupiditate atque eius facilis in natus, qui hic id nisi minus vero tenetur corrupti nostrum, illum saepe voluptatum.
                </div>

            </div>
        </div>
    );
}
