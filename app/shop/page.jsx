'use client';
import { React, useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ItemCard from '../components/ItemCard';
import SidebarFilter from '../components/SidebarFilter';
import { IoMdArrowDropdown } from 'react-icons/io';
import PropTypes from 'prop-types';

function SearchQueryHandler({ setFilters }) {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        setFilters((prev) => ({
            ...prev,
            searchTerm: decodeURIComponent(searchQuery),
        }));
    }, [searchQuery, setFilters]);

    return null;
}

SearchQueryHandler.propTypes = {
    setFilters: PropTypes.func.isRequired,
};

function CategoryQueryHandler({ setFilters }) {
    const searchParams = useSearchParams();
    const categoryQuery = searchParams.get('category');

    useEffect(() => {
        if (categoryQuery !== null) {
            setFilters((prev) => ({
                ...prev,
                category: categoryQuery ? [decodeURIComponent(categoryQuery)] : [],
            }));
        }
    }, [categoryQuery, setFilters]);

    return null;
}

CategoryQueryHandler.propTypes = {
    setFilters: PropTypes.func.isRequired,
};

function Page() {
    //state variables to manage the state of listings, filtering, sorting, and categories from API
    const [listings, setListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sortBy, setSortBy] = useState('popular');
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [filters, setFilters] = useState({
        category: [],
        priceRange: [0, 2000],
        searchTerm: '',
    });

    //hook to fetch listings and categories from API and set them in state
    useEffect(() => {
        const fetchListings = async () => {
            const res = await fetch('/api/listings');
            const data = await res.json();
            setListings(data);

            const categoryCounts = {};
            data.forEach((item) => {
                categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
            });

            const formatted = Object.entries(categoryCounts).map(([name, count]) => ({
                name,
                count,
            }));
            setCategories(formatted);
        };
        fetchListings();
    }, []);

    //hook to filter and sort listings based on selection on frontend and set in state
    useEffect(() => {
        let result = [...listings];

        //this is to filter listings based on category
        //activeCategories filter out empty string passed in the query
        const activeCategories = filters.category
            .map((c) => c.toLowerCase())
            .filter((c) => c !== '');

        //if there is a category then filter otherwise skip the filtering and show all listings
        if (activeCategories.length) {
            result = result.filter((item) =>
                activeCategories.includes(item.category.toLowerCase()),
            );
        }

        //this is to filter listings based on price
        result = result.filter(
            (item) => item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1],
        );

        if (filters.searchTerm) {
            const q = filters.searchTerm.toLowerCase();
            result = result.filter((item) => item.name.toLowerCase().includes(q));
        }

        //sort listings based on rating or price
        result.sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            if (sortBy === 'rating') {
                const ratingA = parseFloat(a.rating || '0');
                const ratingB = parseFloat(b.rating || '0');
                return ratingB - ratingA;
            }
            return 0;
        });

        setFilteredListings(result);
    }, [listings, filters, sortBy]);

    return (
        <div className="flex min-h-screen flex-col gap-6 p-6 lg:flex-row">
            {/*filter toggler for mobile viewport*/}
            <div className="mb-4 flex w-full items-center justify-between lg:hidden">
                <h2 className="text-xl font-bold">Found {filteredListings.length} items</h2>
                <button
                    onClick={() => setShowMobileFilter(!showMobileFilter)}
                    className="rounded bg-gray-700 px-4 py-2"
                >
                    Filters
                </button>
            </div>

            <Suspense fallback={null}>
                <CategoryQueryHandler setFilters={setFilters} />
                <SearchQueryHandler setFilters={setFilters} />
            </Suspense>

            <SidebarFilter
                categories={categories}
                filters={filters}
                setFilters={setFilters}
                showMobileFilter={showMobileFilter}
                setShowMobileFilter={setShowMobileFilter}
            />

            <main className="flex-1">
                {/*sorting*/}
                <div className="mb-4 hidden items-center justify-between lg:flex">
                    <h2 className="text-xl font-bold">Found {filteredListings.length} items</h2>
                    <div className="relative w-48">
                        <select
                            className="w-full appearance-none rounded-lg bg-gray-800 p-2 pr-10 text-white"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="popular">Most Popular</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-sm text-white">
                            <IoMdArrowDropdown />
                        </div>
                    </div>
                </div>

                {/*mapping through the listings & ItemCard and passing in the item object as prod prop*/}
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                    {filteredListings.map((item) => (
                        <ItemCard key={item.id || item._id} {...item} prod={item} />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Page;
