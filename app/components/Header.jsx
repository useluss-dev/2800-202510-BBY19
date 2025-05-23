'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu, FiX, FiInbox } from 'react-icons/fi';
import wishlist from '../assets/icons/heart-svgrepo-com.svg';
import user from '../assets/icons/person-outline-svgrepo-com.svg';
import cart from '../assets/icons/cart-shopping-svgrepo-com.svg';
import ReComputeLogo from '../assets/images/ReCompute.png';
import CategoryDropdown from './CategoryDropdown';
import { CiSearch } from 'react-icons/ci';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
    const navItems = [
        { name: 'Home', link: '/' },
        { name: 'Shop', link: '/shop' },
        { name: 'Contact Us', link: '/contact' },
        { name: 'Create Listing', link: '/create-listing' },
    ];

    const [menuOpen, setMenuOpen] = useState(false);

    const { cartItems } = useCart();
    const cartLength = cartItems.length;

    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const q = searchTerm.trim();
        // Navigate to shop?search=..., or just /shop if empty
        router.push(q ? `/shop?search=${encodeURIComponent(q)}` : '/shop');
    };

    const { data: session, status } = useSession();
    const profileLink = status === 'authenticated' ? '/profile' : '/login';

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
                <form
                    onSubmit={handleSearchSubmit}
                    className="mx-6 hidden flex-1 lg:block"
                    role="search"
                >
                    <div className="relative w-full">
                        <CiSearch className="absolute top-1/2 left-3 -translate-y-1/2 transform text-xl text-white" />
                        <input
                            name="search"
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-full border border-white bg-gray-700 py-2 pr-4 pl-10 text-white placeholder-gray-400 focus:outline-none"
                        />
                    </div>
                </form>
                {/* navigation icons */}
                <div className="flex items-center space-x-2">
                    <Link href="/wishlist">
                        <button className="rounded-full p-1 invert hover:bg-[#0AAD99]">
                            <Image src={wishlist} width={24} height={24} alt="Wishlist" />
                        </button>
                    </Link>
                    <Link href={profileLink}>
                        <button className="rounded-full p-1 invert hover:bg-[#0AAD99]">
                            <Image src={user} width={24} height={24} alt="Profile" />
                        </button>
                    </Link>
                    {status === 'authenticated' && (
                        <Link href="/inbox">
                            <button className="relative rounded-full p-1 invert hover:bg-[#0AAD99]">
                                <FiInbox className="h-[24px] w-[24px] invert" />
                            </button>
                        </Link>
                    )}
                    <Link href="/cart">
                        <button className="relative rounded-full p-1 invert hover:bg-[#0AAD99]">
                            <Image src={cart} width={24} height={24} alt="Cart" />
                            <span className="absolute -top-1 -right-1 rounded-full bg-red-500 px-1 text-xs text-white invert">
                                {cartLength}
                            </span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* desktop navigation view */}
            <nav>
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
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
                    <div className="hidden items-center gap-4 lg:flex lg:justify-center">
                        {status === 'authenticated' && (
                            <>
                                <span className="font-semibold">
                                    {session.user?.name?.split(' ')[0]}
                                </span>
                                <button
                                    onClick={() => signOut({ callbackUrl: '/login' })}
                                    className="rounded-full bg-red-500 px-3 py-1 font-semibold hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* mobile silder */}
            <div
                className={`fixed top-0 left-0 z-50 h-full w-1/2 transform bg-[#2A3240] transition-transform duration-300 ease-in-out ${
                    menuOpen ? 'translate-x-0' : '-translate-x-full'
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
                <div className="px-4">
                    {status === 'authenticated' ? (
                        <div className="mx-4">
                            <button
                                onClick={() => signOut({ callbackUrl: '/login' })}
                                className="rounded-full bg-red-500 px-8 py-2 text-sm hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </header>
    );
}
