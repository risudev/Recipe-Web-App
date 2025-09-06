import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
            .then(res => setCategories(res.data.categories || []))
            .catch(err => console.error("Error fetching categories:", err));
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">Meal Categories</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                    // <div
                    //     key={category.idCategory}
                    //     className="bg-white rounded shadow hover:shadow-lg transition p-4"
                    // >

                    <Link
                        to={`/categories/${category.strCategory}`}
                        key={category.idCategory}
                        className="bg-white rounded shadow hover:shadow-lg transition p-4 block"
                    
                    >
                        
                       
                        <img
                            src={category.strCategoryThumb}
                            alt={category.strCategory}
                            className="w-full h-40 object-cover rounded"
                        />
                        <h2 className="text-xl font-semibold mt-3">{category.strCategory}</h2>
                        <p className="text-sm text-gray-600 mt-2">
                            {category.strCategoryDescription.slice(0, 100)}...
                        </p>
                        </Link>
                ))}
            </div>
        </div>
    );
}

export default Categories;
