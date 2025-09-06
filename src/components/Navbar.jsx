// src/components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-orange-500 text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
            <Link to="/" className="text-2xl font-bold">🍴 RecipeHub</Link>

            <div className="flex gap-6">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/favorites" className="hover:underline">Favorites ❤️</Link>
            </div>
        </nav>
    );
}

export default Navbar;
