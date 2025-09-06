

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function RecipeCard({ meal, onRemove }) {
    const [isFavorite, setIsFavorite] = useState(false);

    // Load initial favorite status
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(stored.includes(meal.idMeal));
    }, [meal.idMeal]);

    // Toggle favorite
    const toggleFavorite = () => {
        let stored = JSON.parse(localStorage.getItem("favorites")) || [];

        if (isFavorite) {
            stored = stored.filter((id) => id !== meal.idMeal);
            // If inside Favorites page, update UI instantly
            if (onRemove) onRemove(meal.idMeal);
        } else {
            stored.push(meal.idMeal);
        }

        localStorage.setItem("favorites", JSON.stringify(stored));
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="relative group shadow-lg rounded-xl overflow-hidden bg-white hover:shadow-2xl transition duration-300">
            {/* Image */}
            <div className="relative">
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-300"
                />

                {/* Overlay with View Recipe */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
                    <Link
                        to={`/meal/${meal.idMeal}`}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600"
                    >
                        View Recipe
                    </Link>
                </div>

                {/* ❤️ Favorite button */}
                <button
                    onClick={(e) => {
                        e.preventDefault(); // prevent navigation when clicking ❤️
                        toggleFavorite();
                    }}
                    className={`absolute top-3 right-3 text-xl drop-shadow-lg ${isFavorite ? "text-red-500" : "text-white"
                        }`}
                >
                    {isFavorite ? "❤️" : "🤍"}
                </button>
            </div>

            {/* Text */}
            <div className="p-3">
                <h3 className="mt-1 font-bold text-lg truncate">{meal.strMeal}</h3>
                <p className="text-sm text-gray-600">{meal.strCategory}</p>
            </div>
        </div>
    );
}

export default RecipeCard;



