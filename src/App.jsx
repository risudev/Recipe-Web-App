// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import CategoryPage from './pages/CategoryPage';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import Categories from './pages/Categories';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<RecipeDetails />} />
        <Route path='categories' element={<Categories/>} />
        <Route path="/categories/:category" element={<CategoryPage />} />
        <Route path="/favorites" element={<Favorites />} /> {/* ⭐ Added */}
      </Routes>
    </Router>
  );
}

export default App;
