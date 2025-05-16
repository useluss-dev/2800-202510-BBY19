'use client';
import React, { useState, useEffect } from 'react';
import { IoChevronDownSharp } from 'react-icons/io5';
import Link from 'next/link';
import { TbCategory } from 'react-icons/tb';

const categories = [
    { name: 'Placeholder', icon: 'icon', link: '/' },
    { name: 'Placeholder', icon: 'icon', link: '/' },
    { name: 'Placeholder', icon: 'icon', link: '/' },
    { name: 'Placeholder', icon: 'icon', link: '/' },
    { name: 'Placeholder', icon: 'icon', link: '/' },
    { name: 'Placeholder', icon: 'icon', link: '/' },
    { name: 'Placeholder', icon: 'icon', link: '/' },
    { name: 'Placeholder', icon: 'icon', link: '/' },
];

export default function CategoryDropdown() {
    const [open, setOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    // check screen size
    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1024px)');
        setIsDesktop(mediaQuery.matches);
        const handler = () => setIsDesktop(mediaQuery.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return (
        <div
            className={`w-full rounded-t-lg text-white hover:bg-[#29313e] ${
                isDesktop ? 'group relative max-w-xs md:max-w-sm' : ''
            }`}
            onMouseEnter={() => isDesktop && setOpen(true)}
            onMouseLeave={() => isDesktop && setOpen(false)}
        >
            {/* category desktop dropdown */}
            <div
                onClick={() => {
                    if (!isDesktop) setOpen((prev) => !prev);
                }}
                className="flex cursor-pointer items-center justify-between rounded-md px-4 py-2.5"
            >
                <div className="flex items-center space-x-2">
                    <TbCategory className="text-xl" />
                    <span className="text-lg font-semibold lg:font-normal">Categories</span>
                </div>
                <IoChevronDownSharp
                    className={`text-lg transition-transform ${open ? 'rotate-180' : ''}`}
                />
            </div>

            {/* dropdown items */}
            <div
                className={`overflow-hidden transition-all duration-200 ${
                    isDesktop
                        ? `absolute z-10 mt-2 max-h-96 w-full overflow-y-auto rounded-md bg-[#232933] shadow-md ring-1 ring-black/10 ${
                              open ? 'visible opacity-100' : 'invisible opacity-0'
                          } group-hover:visible group-hover:opacity-100`
                        : `${open ? 'mt-2 max-h-screen' : 'max-h-0'}`
                }`}
            >
                <ul className={`${isDesktop ? 'py-2' : 'py-2 pl-4'}`}>
                    {categories.map((cat, idx) => (
                        <Link href={cat.link} key={idx}>
                            <li className="text-md flex cursor-pointer items-center px-4 py-2 font-semibold hover:bg-[#29313e]">
                                <span className="mr-3 text-xl">{cat.icon}</span>
                                {cat.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}
