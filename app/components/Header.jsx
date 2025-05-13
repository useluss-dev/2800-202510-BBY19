'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import wishlist from '../assets/icons/heart-svgrepo-com.svg';
import user from '../assets/icons/person-outline-svgrepo-com.svg';
import cart from '../assets/icons/cart-shopping-svgrepo-com.svg';
import ReComputeLogo from '../assets/images/ReCompute.png';
import CategoryDropdown from './CategoryDropdown';
import { CiSearch } from 'react-icons/ci';

export default function Header() {
    const navItems = [
        { name: 'Placeholder', link: '/' },
        { name: 'Placeholder', link: '/' },
        { name: 'Placeholder', link: '/' },
        { name: 'Placeholder', link: '/' },
    ];

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="relative z-50 bg-[#232933] text-white">
            <div>
                <div className="mx-auto flex max-w-7xl items-center justify-center px-4 text-sm sm:px-6 lg:px-8">
                    <div className="pt-2">
                        USE CODE <span className="text-[#F55266]">RECOMPUTE20</span> FOR 20% OFF
                    </div>
                </div>
            </div>

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* this is the mobile/tablet view with hamburger menu */}
                <div className="flex items-center lg:hidden">
                    <button className="mr-2 text-2xl text-white" onClick={() => setMenuOpen(true)}>
                        <FiMenu />
                    </button>
                    <Link href="/" className="flex items-center">
                        <div className="flex h-13 w-13 items-center justify-center rounded-full">
                            <Image src={ReComputeLogo} width={90} height={90} alt="logo" />
                        </div>
                        <span className="text-xl font-bold">ReCompute</span>
                    </Link>
                </div>
                {/* logo for desktop view */}
                <Link href="/" className="hidden items-center space-x-2 lg:flex">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full">
                        <Image src={ReComputeLogo} width={90} height={90} alt="ReCompute" />
                    </div>
                    <span className="text-xl font-bold">ReCompute</span>
                </Link>
                {/* search input for desktop */}
                <div className="mx-6 hidden flex-1 lg:block">
                    <div className="relative w-full">
                        <CiSearch className="absolute top-1/2 left-3 -translate-y-1/2 transform text-xl text-white" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full rounded-full border border-white bg-gray-700 py-2 pr-4 pl-10 text-white placeholder-gray-400 focus:outline-none"
                        />
                    </div>
                </div>
                {/* navigation icons */}
                <div className="flex items-center space-x-2">
                    <button className="rounded-full p-1 invert hover:bg-[#0AAD99]">
                        <Image src={wishlist} width={24} height={24} alt="Wishlist" />
                    </button>
                    <button className="rounded-full p-1 invert hover:bg-[#0AAD99]">
                        <Image src={user} width={24} height={24} alt="Profile" />
                    </button>
                    <button className="relative rounded-full p-1 invert hover:bg-[#0AAD99]">
                        <Image src={cart} width={24} height={24} alt="Cart" />
                        <span className="absolute -top-1 -right-1 rounded-full bg-red-500 px-1 text-xs text-white invert">
                            10
                        </span>
                    </button>
                </div>
            </div>

            {/* desktop navigation view */}
            <nav>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <ul className="hidden h-12 items-center space-x-6 text-sm lg:flex">
                        <li className="w-1/5">
                            <CategoryDropdown />
                        </li>
                        {navItems.map((item, index) => (
                            <Link href={item.link} key={index}>
                                <div className="flex items-center space-x-2 rounded-t-md px-4 py-2.5 hover:bg-[#29313e]">
                                    <span className="text-lg">{item.name}</span>
                                </div>
                            </Link>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* mobile silder */}
            <div
                className={`fixed top-0 left-0 z-50 h-full w-1/2 transform bg-[#2A3240] transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* header inside slider */}
                <div className="flex items-center justify-between border-b border-gray-600 px-4 py-3">
                    <Link href="#" className="flex items-center">
                        <div className="flex h-13 w-13 items-center justify-center rounded-full">
                            <Image src={ReComputeLogo} width={64} height={64} alt="logo" />
                        </div>
                        <span className="text-xl font-bold">ReCompute</span>
                    </Link>
                    <button onClick={() => setMenuOpen(false)} className="text-2xl text-white">
                        <FiX />
                    </button>
                </div>

                {/* navigation items inside drawer */}
                <div className="p-4">
                    <CategoryDropdown />
                    {navItems.map((item, index) => (
                        <Link href={item.link} key={index}>
                            <div className="flex items-center space-x-2 rounded-md px-4 py-3 hover:bg-[#29313e]">
                                <span className="text-lg font-semibold">{item.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}
