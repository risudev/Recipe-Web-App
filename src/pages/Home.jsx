// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Category from "../components/CategoryFilter";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    // Fetch meals based on search/category
    useEffect(() => {
        const fetchMeals = async () => {
            setLoading(true);
            try {
                let url = "";

                if (searchQuery) {
                    // Search by name/keyword
                    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
                } else if (selectedCategory) {
                    // Filter by category
                    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
                } else {
                    // Default - fetch all meals
                    url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
                }

                const res = await fetch(url);
                const data = await res.json();
                setMeals(data.meals || []);
            } catch (error) {
                console.error("Error fetching meals:", error);
                setMeals([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, [searchQuery, selectedCategory]);

    return (
        <div>
            {/* 🌟 Navbar */}
            <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
                <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-orange-600">🍴 RecipeHub</h1>
                    <div className="hidden md:block w-1/3">
                        <SearchBar onSearch={setSearchQuery} />
                    </div>
                    <div className="space-x-6 font-medium text-gray-700">
                        <a href="/" className="hover:text-orange-600">Home</a>
                        <a href="/favorites" className="hover:text-orange-600">Favorites</a>
                        <a href="/categories" className="hover:text-orange-600">Categories</a>
                    </div>
                </div>
            </nav>

            {/* 🎨 Hero Banner */}
            <header className="mt-16 bg-gradient-to-r from-orange-500 to-red-500 text-white py-20 text-center">
                <h2 className="text-4xl md:text-5xl font-bold">Discover Delicious Recipes</h2>
                <p className="mt-3 text-lg text-orange-100">
                    Explore cuisines, find meals & save your favorites ❤️
                </p>
                {/* Search bar for mobile view */}
                <div className="mt-6 px-4 md:hidden">
                    <SearchBar onSearch={setSearchQuery} />
                </div>
            </header>

            {/* 🏷️ Category Filter */}
            <div className="max-w-6xl mx-auto mt-8 px-4">
                <Category onSelectCategory={setSelectedCategory} />
            </div>

            {/* 🍴 Meals Grid */}
            <section className="max-w-6xl mx-auto p-4">
                <h3 className="text-2xl font-semibold mb-4">Explore Recipes</h3>
                {loading ? (
                    <p className="text-center text-lg mt-4">Loading meals...</p>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                        {meals.length > 0 ? (
                            meals.map((meal) => (
                                <RecipeCard key={meal.idMeal} meal={meal} />
                            ))
                        ) : (
                            <p className="text-center text-lg col-span-full">
                                No meals found 😢
                            </p>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;


