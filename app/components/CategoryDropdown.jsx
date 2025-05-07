"use client";
import { useState, useEffect } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import Link from "next/link";
import { TbCategory } from "react-icons/tb";

const categories = [
  { name: "Placeholder", icon: "icon", link: "/" },
  { name: "Placeholder", icon: "icon", link: "/" },
  { name: "Placeholder", icon: "icon", link: "/" },
  { name: "Placeholder", icon: "icon", link: "/" },
  { name: "Placeholder", icon: "icon", link: "/" },
  { name: "Placeholder", icon: "icon", link: "/" },
  { name: "Placeholder", icon: "icon", link: "/" },
  { name: "Placeholder", icon: "icon", link: "/" },
];

export default function CategoryDropdown() {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // check screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mediaQuery.matches);
    const handler = () => setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div
      className={`w-full text-white hover:bg-[#29313e] rounded-t-lg ${
        isDesktop ? "relative group max-w-xs md:max-w-sm" : ""
      }`}
      onMouseEnter={() => isDesktop && setOpen(true)}
      onMouseLeave={() => isDesktop && setOpen(false)}
    >
      {/* category desktop dropdown */}
      <div
        onClick={() => {
          if (!isDesktop) setOpen((prev) => !prev);
        }}
        className="flex justify-between items-center px-4 py-2.5 rounded-md cursor-pointer"
      >
        <div className="flex items-center space-x-2">
          <TbCategory className="text-xl" />
          <span className="text-lg font-semibold lg:font-normal">
            Categories
          </span>
        </div>
        <IoChevronDownSharp
          className={`text-lg transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* dropdown items */}
      <div
        className={`transition-all duration-200 overflow-hidden ${
          isDesktop
            ? `absolute z-10 mt-2 w-full rounded-md bg-[#232933] shadow-md ring-1 ring-black/10 max-h-96 overflow-y-auto ${
                open ? "visible opacity-100" : "invisible opacity-0"
              } group-hover:visible group-hover:opacity-100`
            : `${open ? "max-h-screen mt-2" : "max-h-0"}`
        }`}
      >
        <ul className={`${isDesktop ? "py-2" : "py-2 pl-4"}`}>
          {categories.map((cat, idx) => (
            <Link href={cat.link} key={idx}>
              <li className="flex items-center px-4 py-2 hover:bg-[#29313e] cursor-pointer text-md font-semibold">
                <span className="text-xl mr-3">{cat.icon}</span>
                {cat.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
