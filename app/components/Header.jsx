import React from "react";
import Image from "next/image";
import darkMode from "../assets/icons/moon-svgrepo-com.svg";
import wishlist from "../assets/icons/heart-svgrepo-com.svg"
import user from "../assets/icons/person-outline-svgrepo-com.svg"
import cart from "../assets/icons/cart-shopping-svgrepo-com.svg"

function header() {
	return (
		<header className="bg-[#333D4C] text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify between h-16 ">
				{/* Logo */}
				<a href="#" className="flex items-center space-x-2">
					<div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
						<Image src="/placeholder.png" width={64} height={64} />
					</div>
					<span className="font-bold text-xl">Recompute</span>
				</a>

				{/* Search */}
				<div className="flex-1 mx-6">
					<div className="relative">
						<input
							type="text"
							placeholder="Search..."
							className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-full pl-10 pr-4 py-2 focus:outline-none border-1 border-white"
						/>
					</div>
				</div>

				{/* Promo + Icons */}
				<div className="flex items-center space-x-4">
					{/* Promo badge */}
					<div className="hidden sm:flex flex-col items-start space-y-1 px-3 py-1">
						<span className="text-xs text-pink-400">Only this month</span>
						<span className="text-sm font-semibold">Super Sale 20%</span>
					</div>

					{/* Dark mode toggle */}
					<button className="p-2 rounded-full hover:bg-gray-700">
						<Image src={darkMode} width={32} height={32} />
					</button>

					{/* Wishlist */}
					<button class="p-2 rounded-full hover:bg-gray-700">
						<Image src={wishlist} width={32} height={32} />
					</button>

					{/* User */}
					<button class="p-2 rounded-full hover:bg-gray-700">
						<Image src={user} width={32} height={32} />
					</button>

					{/* Cart */}
					<button class="p-2 rounded-full hover:bg-gray-700">
						<Image src={cart} width={32} height={32} />
					</button>
				</div>
			</div>

			{/* Nav links */}
			<nav>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<ul className="flex space-x-6 h-12 items-center text-sm">
						<li><a href="#" className="hover:text-pink-400">placeholder</a></li>
						<li><a href="#" className="hover:text-pink-400">placeholder</a></li>
						<li><a href="#" className="hover:text-pink-400">placeholder</a></li>
						<li><a href="#" className="hover:text-pink-400">placeholder</a></li>
						<li><a href="#" className="hover:text-pink-400">placeholder</a></li>
						<li className="ml-auto flex items-center space-x-2">
							<select className="focus:outline-none text-gray-300 text-sm">
								<option>Eng</option>
								<option>Esp</option>
							</select>
							<select className="focus:outline-none text-gray-300 text-sm">
								<option>USD ($)</option>
								<option>CAD ($)</option>
								<option>EUR (€)</option>
							</select>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}

export default header
