

// src/components/SearchBar.jsx
import { useState } from "react";

function SearchBar({ onSearch }) {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onSearch(newValue); // ✅ updates parent (Home.jsx)
    };

    return (
        <div className="flex justify-center w-full">
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="🔍 Search for meals..."
                className="border border-gray-300 px-4 py-2 w-full md:w-2/3 lg:w-1/2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
        </div>
    );
}

export default SearchBar;
