// src/pages/RecipeDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function RecipeDetails() {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    // Fetch meal details
    useEffect(() => {
        axios
            .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then((res) => setMeal(res.data.meals[0]));
    }, [id]);

    // Check if already in favorites
    useEffect(() => {
        if (meal) {
            const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
            setIsFavorite(savedFavorites.includes(meal.idMeal));
        }
    }, [meal]);

    // Add/Remove from favorites
    const toggleFavorite = () => {
        let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (isFavorite) {
            savedFavorites = savedFavorites.filter((favId) => favId !== meal.idMeal);
            setIsFavorite(false);
        } else {
            savedFavorites.push(meal.idMeal);
            setIsFavorite(true);
        }

        localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    };

    if (!meal) return <p className="text-center mt-6">Loading recipe...</p>;

    // Extract ingredients
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }
    }

    // Split instructions
    const instructions = meal.strInstructions
        ? meal.strInstructions.split(". ").filter((step) => step.trim() !== "")
        : [];

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Title + Favorite */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-orange-600">{meal.strMeal}</h1>
                <button
                    onClick={toggleFavorite}
                    className={`px-4 py-2 rounded-lg font-medium transition ${isFavorite
                            ? "bg-pink-500 text-white hover:bg-pink-600"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                >
                    {isFavorite ? "❤️ Remove Favorite" : "🤍 Add to Favorites"}
                </button>
            </div>

            {/* Image */}
            <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="rounded-xl shadow-lg my-6 w-full max-h-[400px] object-cover"
            />

            {/* Meta Info */}
            <div className="mb-6 text-gray-700">
                <p><strong>Category:</strong> {meal.strCategory}</p>
                <p><strong>Area:</strong> {meal.strArea}</p>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">🛒 Ingredients</h2>
                <ul className="list-disc list-inside space-y-1">
                    {ingredients.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </div>

            {/* Instructions */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">👨‍🍳 Instructions</h2>
                <ol className="list-decimal list-inside space-y-2">
                    {instructions.map((step, idx) => (
                        <li key={idx}>{step}</li>
                    ))}
                </ol>
            </div>

            {/* Video */}
            {meal.strYoutube && (
                <div className="mt-6">
                    <a
                        href={meal.strYoutube}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
                    >
                        ▶ Watch Cooking Video
                    </a>
                </div>
            )}
        </div>
    );
}

export default RecipeDetails;


