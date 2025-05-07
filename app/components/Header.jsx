"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import wishlist from "../assets/icons/heart-svgrepo-com.svg";
import user from "../assets/icons/person-outline-svgrepo-com.svg";
import cart from "../assets/icons/cart-shopping-svgrepo-com.svg";
import ReComputeLogo from "../assets/images/ReCompute.png";
import CategoryDropdown from "./CategoryDropdown";
import { CiSearch } from "react-icons/ci";

export default function Header() {
  const navItems = [
    { name: "Placeholder", link: "/" },
    { name: "Placeholder", link: "/" },
    { name: "Placeholder", link: "/" },
    { name: "Placeholder", link: "/" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#232933] text-white relative z-50">
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center text-sm">
          <div className="pt-2">
            USE CODE <span className="text-pink-500">RECOMPUTE20</span> FOR 20%
            OFF
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* this is the mobile/tablet view with hamburger menu */}
        <div className="flex items-center lg:hidden">
          <button
            className="text-white text-2xl mr-2"
            onClick={() => setMenuOpen(true)}
          >
            <FiMenu />
          </button>
          <Link href="/" className="flex items-center">
            <div className="w-13 h-13 rounded-full flex items-center justify-center">
              <Image src={ReComputeLogo} width={90} height={90} alt="logo" />
            </div>
            <span className="font-bold text-xl">ReCompute</span>
          </Link>
        </div>
        {/* logo for desktop view */}
        <Link href="/" className="hidden lg:flex items-center space-x-2">
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <Image src={ReComputeLogo} width={90} height={90} alt="ReCompute" />
          </div>
          <span className="font-bold text-xl">ReCompute</span>
        </Link>
        {/* search input for desktop */}
        <div className="hidden lg:block flex-1 mx-6">
          <div className="relative w-full">
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-xl" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-full pl-10 pr-4 py-2 focus:outline-none border border-white"
            />
          </div>
        </div>
        {/* navigation icons */}
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded-full hover:bg-[#049b49] invert">
            <Image src={wishlist} width={24} height={24} alt="Wishlist" />
          </button>
          <button className="p-1 rounded-full hover:bg-[#049b49] invert">
            <Image src={user} width={24} height={24} alt="Profile" />
          </button>
          <button className="p-1 rounded-full hover:bg-[#049b49] invert relative">
            <Image src={cart} width={24} height={24} alt="Cart" />
            <span className="absolute -top-1 -right-1 bg-red-500 invert text-white text-xs rounded-full px-1">
              10
            </span>
          </button>
        </div>
      </div>

      {/* desktop navigation view */}
      <nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="hidden lg:flex space-x-6 h-12 items-center text-sm">
            <li className="w-1/5">
              <CategoryDropdown />
            </li>
            {navItems.map((item, index) => (
              <Link href={item.link} key={index}>
                <div className="flex items-center space-x-2 py-2.5 px-4 rounded-t-md hover:bg-[#29313e]">
                  <span className="text-lg">{item.name}</span>
                </div>
              </Link>
            ))}
          </ul>
        </div>
      </nav>

      {/* mobile silder */}
      <div
        className={`fixed top-0 left-0 h-full w-1/2 bg-[#2A3240] z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* header inside slider */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-600">
          <Link href="#" className="flex items-center">
            <div className="w-13 h-13 rounded-full flex items-center justify-center">
              <Image src={ReComputeLogo} width={64} height={64} alt="logo" />
            </div>
            <span className="font-bold text-xl">ReCompute</span>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white text-2xl"
          >
            <FiX />
          </button>
        </div>

        {/* navigation items inside drawer */}
        <div className="p-4">
          <CategoryDropdown />
          {navItems.map((item, index) => (
            <Link href={item.link} key={index}>
              <div className="flex items-center space-x-2 py-3 px-4 rounded-md hover:bg-[#29313e]">
                <span className="text-lg font-semibold">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
