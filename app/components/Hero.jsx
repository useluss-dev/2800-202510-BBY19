'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';
import { TbChevronUpRight } from 'react-icons/tb';

//array of images
const images = [
    { name: 'Headphones', src: '/headphones.png' },
    { name: 'Graphics cards', src: '/gpu.png' },
    { name: 'Raspbeery Pi', src: '/rasp.png' },
];

export default function Hero() {
    //state to keep track of current image
    const [current, setCurrent] = useState(0);
    const total = images.length;
    //ref hook to keep track of interval
    const intervalRef = useRef(null);

    //function to set current image
    const goTo = (index) => setCurrent(index);
    //function to go to next image
    const goToNext = () => setCurrent((prev) => (prev + 1) % total);
    //function to go to previous image
    const goToPrevious = () => setCurrent((prev) => (prev - 1 + total) % total);

    //function to clear interval after page refresh/rerender/unmount
    useEffect(() => {
        intervalRef.current = setInterval(goToNext, 5000);
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <div className="w-full rounded-2xl bg-[#1B273A] py-10 shadow-lg">
            <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-between lg:flex-row lg:px-4">
                <div className="w-full space-y-4 px-4 text-white lg:basis-1/2">
                    <p className="text-sm text-gray-400">Explore retro tech</p>
                    <h1
                        key={current + '-heading'}
                        className="animate-fade-in text-5xl font-extrabold tracking-tight capitalize opacity-0 transition-opacity duration-700 ease-in-out"
                    >
                        {images[current].name}
                    </h1>
                    <Link href="/shop">
                        <button className="mt-2 flex items-center gap-2 rounded-lg bg-[#F55266] px-6 py-3 text-base text-white hover:bg-[#f55265c8]">
                            Shop now
                            <TbChevronUpRight />
                        </button>
                    </Link>
                </div>

                <div className="flex w-full justify-center px-4 lg:basis-1/2">
                    <div className="relative h-[300px] w-[300px] shrink-0">
                        <button
                            className="absolute top-1/2 -left-28 z-10 -translate-y-1/2 opacity-50 hover:opacity-100"
                            onClick={goToPrevious}
                        >
                            <FaChevronLeft size={25} />
                        </button>

                        <div
                            key={current + '-img'}
                            className="animate-fade-in relative h-full w-full opacity-0 transition-opacity duration-700 ease-in-out"
                        >
                            <Image
                                src={images[current].src}
                                alt={images[current].name}
                                fill
                                sizes="300px"
                                className="object-contain"
                            />
                        </div>

                        <button
                            className="absolute top-1/2 -right-28 z-10 -translate-y-1/2 opacity-50 hover:opacity-100"
                            onClick={goToNext}
                        >
                            <FaChevronRight size={25} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-center gap-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => goTo(index)}
                        className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-300 ${
                            current === index ? 'bg-[#F55266]' : 'bg-gray-500'
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
}
