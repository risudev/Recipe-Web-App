

// CategoryPage.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

function CategoryPage() {
    const { category } = useParams();
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
            .then((res) => setMeals(res.data.meals || []))
            .finally(() => setLoading(false));
    }, [category]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">
                {category} Recipes 🍴
            </h2>

            {loading ? (
                <p className="text-center">Loading {category} meals...</p>
            ) : meals.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {meals.map((meal) => (
                        <RecipeCard key={meal.idMeal} meal={meal} />
                    ))}
                </div>
            ) : (
                <p className="text-center">No meals found in {category} 😢</p>
            )}
        </div>
    );
}

export default CategoryPage;

