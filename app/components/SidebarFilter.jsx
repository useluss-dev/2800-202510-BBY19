export default function SidebarFilter({
    categories,
    filters,
    setFilters,
    showMobileFilter,
    setShowMobileFilter,
}) {
    return (
        <aside
            className={`w-full space-y-6 rounded-lg bg-[#232933] p-4 lg:block lg:h-fit lg:w-64 ${
                showMobileFilter ? 'block' : 'hidden'
            }`}
        >
            <div className="mb-4 flex items-center justify-between lg:hidden">
                <h3 className="text-lg font-bold">Filters</h3>
                <button onClick={() => setShowMobileFilter(false)}>✕</button>
            </div>

            <div>
                <h3 className="mb-2 font-bold">Categories</h3>
                {categories.map(({ name, count }) => (
                    <label key={name} className="block text-sm capitalize">
                        <input
                            className="accent-[#F55266]"
                            type="checkbox"
                            checked={filters.category.includes(name)}
                            
                            //if category is selected remove it, otherwise add it
                            onChange={() =>
                                setFilters((prev) => ({
                                    ...prev,
                                    category: prev.category.includes(name)
                                        ? prev.category.filter((c) => c !== name)
                                        : [...prev.category, name],
                                }))
                            }
                        />{' '}
                        {name} <span className="text-gray-400">({count})</span>
                    </label>
                ))}
            </div>

            <div>
                <h3 className="mb-2 font-bold">Price</h3>
                <input
                    type="range"
                    min={0}
                    max={2000}
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            priceRange: [0, Number(e.target.value)],
                        }))
                    }
                    className="w-full appearance-none bg-transparent [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:bg-[#F55266] [&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#F55266]"
                />

                {/*as input field color styles cannot be changes with basic css classes
                    used ChatGPT to debug and use the above webkit classNames */}

                <p className="mt-1 text-sm">
                    ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </p>
            </div>
        </aside>
    );
}
