// src/components/CategoryFilter.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function CategoryFilter({ onSelectCategory }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get("https://www.themealdb.com/api/json/v1/1/categories.php")
            .then((res) => setCategories(res.data.categories || []))
            .catch((err) => console.error("Error fetching categories:", err));
    }, []);

    return (
        <div className="flex flex-wrap gap-2 justify-center mt-4">
            {/* 🔘 Reset filter */}
            <button
                onClick={() => onSelectCategory("")}
                className="bg-gray-300 text-black px-4 py-1 rounded hover:bg-gray-400 transition"
            >
                All
            </button>

            {/* 🔘 Category buttons */}
            {categories.map((cat) => (
                <button
                    key={cat.idCategory}
                    onClick={() => onSelectCategory(cat.strCategory)}
                    className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 transition"
                >
                    {cat.strCategory}
                </button>
            ))}
        </div>
    );
}

export default CategoryFilter;
