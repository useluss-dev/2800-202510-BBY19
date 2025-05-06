"use client";
import { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";

const categories = [
  { name: "Placeholder", icon: "icon" },
  { name: "Placeholder", icon: "icon" },
  { name: "Placeholder", icon: "icon" },
  { name: "Placeholder", icon: "icon" },
  { name: "Placeholder", icon: "icon" },
  { name: "Placeholder", icon: "icon" },
  { name: "Placeholder", icon: "icon" },
  { name: "Placeholder", icon: "icon" },
];

export default function CategoryDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full max-w-xs md:max-w-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 bg-[#333D4C] rounded-md shadow hover:bg-[#29313e]"
      >
        <span className="font-semibold">Categories</span>
        <IoChevronDownSharp className="text-lg" />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-full rounded-md bg-[#181D25] shadow-md ring-1 ring-black/10 max-h-96 overflow-y-auto">
          <ul className="py-2">
            {categories.map((cat, index) => (
              <li
                key={index}
                className="flex items-center px-4 py-2 hover:bg-[#29313e] cursor-pointer text-sm"
              >
                <span className="text-xl mr-3">{cat.icon}</span>
                {cat.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
