// // src/pages/Favorites.jsx
// import React, { useEffect, useState } from "react";
// import RecipeCard from "../components/RecipeCard";

// function Favorites() {
//     const [favoriteMeals, setFavoriteMeals] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Load favorites from localStorage
//     useEffect(() => {
//         loadFavorites();
//     }, []);

//     const loadFavorites = async () => {
//         const storedIds = JSON.parse(localStorage.getItem("favorites")) || [];

//         if (storedIds.length === 0) {
//             setFavoriteMeals([]);
//             setLoading(false);
//             return;
//         }

//         try {
//             const requests = storedIds.map((id) =>
//                 fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
//                     .then((res) => res.json())
//             );

//             const results = await Promise.all(requests);
//             const meals = results
//                 .map((data) => data.meals && data.meals[0])
//                 .filter(Boolean); // remove null meals

//             setFavoriteMeals(meals);
//         } catch (error) {
//             console.error("Error fetching favorites:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Remove from favorites (live update)
//     const handleRemove = (idMeal) => {
//         const updated = favoriteMeals.filter((meal) => meal.idMeal !== idMeal);
//         setFavoriteMeals(updated);

//         const stored = JSON.parse(localStorage.getItem("favorites")) || [];
//         const newStored = stored.filter((id) => id !== idMeal);
//         localStorage.setItem("favorites", JSON.stringify(newStored));
//     };

//     return (
//         <div className="p-6">
//             <h1 className="text-3xl font-bold mb-6 text-orange-600">
//                 ❤️ My Favorites
//             </h1>

//             {loading ? (
//                 <p className="text-gray-500 text-lg">Loading favorites...</p>
//             ) : favoriteMeals.length > 0 ? (
//                 <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {favoriteMeals
//                         .filter((meal) => meal && meal.idMeal) // ✅ safe filter
//                         .map((meal) => (
//                             <RecipeCard
//                                 key={meal.idMeal}
//                                 meal={meal}
//                                 onRemove={handleRemove}
//                             />
//                         ))}
//                 </div>
//             ) : (
//                 <p className="text-gray-500 text-lg">
//                     No favorites yet. Start adding some! 🍴
//                 </p>
//             )}
//         </div>
//     );
// }

// export default Favorites;

// src/pages/Favorites.jsx
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

function Favorites() {
    const [favoriteMeals, setFavoriteMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load favorites from localStorage
    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        const storedIds = JSON.parse(localStorage.getItem("favorites")) || [];

        if (storedIds.length === 0) {
            setFavoriteMeals([]); // ✅ no favorites
            setLoading(false);
            return;
        }

        try {
            const requests = storedIds.map((id) =>
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                    .then((res) => res.json())
            );

            const results = await Promise.all(requests);

            // ✅ Only keep valid meals
            const meals = results
                .map((data) => (data.meals && data.meals[0]) || null)
                .filter(Boolean);

            setFavoriteMeals(meals);
        } catch (error) {
            console.error("Error fetching favorites:", error);
            setFavoriteMeals([]); // ✅ in case of error
        } finally {
            setLoading(false);
        }
    };

    // Remove from favorites (live update)
    const handleRemove = (idMeal) => {
        const updated = favoriteMeals.filter((meal) => meal.idMeal !== idMeal);
        setFavoriteMeals(updated);

        const stored = JSON.parse(localStorage.getItem("favorites")) || [];
        const newStored = stored.filter((id) => id !== idMeal);
        localStorage.setItem("favorites", JSON.stringify(newStored));
    };

    // ✅ Filter invalid/null meals before rendering
    const validMeals = favoriteMeals.filter((meal) => meal && meal.idMeal);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-orange-600">
                ❤️ My Favorites
            </h1>

            {loading ? (
                <p className="text-gray-500 text-lg">Loading favorites...</p>
            ) : validMeals.length === 0 ? (
                <p className="text-gray-500 text-lg">
                    No favorites yet. Start adding some! 🍴
                </p>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {validMeals.map((meal) => (
                        <RecipeCard
                            key={meal.idMeal}
                            meal={meal}
                            onRemove={handleRemove}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;

