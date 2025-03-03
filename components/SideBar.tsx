import Link from "next/link"
import { categories, screenSizes, brands, sortingOptions } from "@/lib/filters";

export default function Sidebar() {
    return (
        <aside className="w-1/5 p-6 border-r border-gray-700">
            <div>
                <h2 className="text-lg font-bold mb-3">All categories</h2>
                <ul className="mb-4">
                    {categories.map((category) => (
                        <li key={category} className="text-gray-400 hover:text-white cursor-pointer">
                            <Link href={`/?category=${category}`}>{category}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2 className="text-lg font-bold mb-3">Shop by Screen Size</h2>
                <ul className="mb-4">
                    {screenSizes.map((screenSize) => (
                        <li key={screenSize} className="text-gray-400 hover:text-white cursor-pointer">
                            <Link href={`/?screenSize=${screenSize}`}>{screenSize}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2 className="text-lg font-bold mb-3">Shop by Brand</h2>
                <ul className="mb-4">
                    {brands.map((brand) => (
                        <li key={brand} className="text-gray-400 hover:text-white cursor-pointer">
                            <Link href={`/?brand=${brand}`}>{brand}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2 className="text-lg font-bold mb-3">Sorting</h2>
                    <ul>
                        {sortingOptions.map((option) => (
                            <li key={option.value} className="text-gray-400 hover:white cursor-pointer">
                                {option.label}
                            </li>
                        ))}
                    </ul>
            </div>
        </aside>
    );
}