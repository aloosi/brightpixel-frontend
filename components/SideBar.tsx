import { useSearchParams } from "next/navigation";
import { categories, screenSizes, brands, sortingOptions } from "@/lib/filters";

export default function Sidebar({
    onFilterChange, onSortChange
}: {
    onFilterChange: (key: string, value: string) => void;
    onSortChange: (sort: string) => void;
}) {
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get("category") || "";
    const selectedBrand = searchParams.get("brand") || "";
    const selectedSizeGroup = searchParams.get("size") || "";
    const selectedSorting = searchParams.get("sort") || "";

    return (
        <aside className="w-1/5 p-6 border-r border-gray-700">
            
            {/* Categories */}
            <div>
                <h2 className="text-lg font-bold mb-3">All Categories</h2>
                <ul className="mb-4">
                    <li className="text-gray-400 hover:text-white cursor-pointer font-bold">
                        <button onClick={() => onFilterChange("category", "")}>
                            Select All
                        </button>
                    </li>
                    {categories.map((category) => (
                        <li key={category} className="text-gray-400 hover:text-white cursor-pointer">
                            <button
                                onClick={() => onFilterChange("category", category)}
                                className={selectedCategory === category ? "font-bold text-white" : ""}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Screen Size */}
            <div>
                <h2 className="text-lg font-bold mb-3">Shop by Screen Size</h2>
                <ul className="mb-4">
                    <li className="text-gray-400 hover:text-white cursor-pointer font-bold">
                        <button onClick={() => onFilterChange("size", "")}>
                            Select All
                        </button>
                    </li>
                    {screenSizes.map((screenSize) => (
                        <li key={screenSize} className="text-gray-400 hover:text-white cursor-pointer">
                            <button
                                onClick={() => onFilterChange("size", screenSize)}
                                className={selectedSizeGroup === screenSize ? "font-bold text-white" : ""}
                            >
                                {screenSize}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Brands */}
            <div>
                <h2 className="text-lg font-bold mb-3">Shop by Brand</h2>
                <ul className="mb-4">
                    <li className="text-gray-400 hover:text-white cursor-pointer font-bold">
                        <button onClick={() => onFilterChange("brand", "")}>
                            Select All
                        </button>
                    </li>
                    {brands.map((brand) => (
                        <li key={brand} className="text-gray-400 hover:text-white cursor-pointer">
                            <button
                                onClick={() => onFilterChange("brand", brand)}
                                className={selectedBrand === brand ? "font-bold text-white" : ""}
                            >
                                {brand}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Sorting */}
            <div>
                <h2 className="text-lg font-bold mb-3">Sorting</h2>
                <ul>
                    {sortingOptions.map((option) => (
                        <li key={option.value} className="text-gray-400 hover:text-white cursor-pointer">
                            <button
                                onClick={() => onSortChange(option.value)}
                                className={selectedSorting === option.value ? "font-bold text-white" : ""}
                            >
                                {option.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

        </aside>
    );
}
