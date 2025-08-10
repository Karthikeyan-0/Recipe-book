import './App.css';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import axios from 'axios';
import AddRecipePage from './pages/AddRecipePage';

export interface Recipe {
  _id?: string;
  id?: number;
  name: string;
  ingredients: string;
  instructions: string;
}

function App() {
  const [page, setPage] = useState<'landing' | 'recipes' | 'add'>('landing');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/recipes')
      .then(res => {
        setRecipes(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><span className="text-xl">Loading recipes...</span></div>;
  }
  if (page === 'landing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
        {/* Overlay PNG background for landing page */}
        <div
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          style={{
            backgroundImage: "url('/IMAGES/OVERLAY.png')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            opacity: 0.5,
          }}
        />
        <div className="flex flex-col items-center gap-12 relative z-10">
          <h1 className="text-8xl font-extrabold text-white mb-16 tracking-wide drop-shadow-lg font-serif">Cook Book</h1>
          <div className="flex gap-16">
            <button
              className="px-16 py-6 rounded-full bg-white bg-opacity-80 text-indigo-700 font-extrabold text-4xl shadow hover:bg-indigo-100 transition border-4 border-indigo-300"
              onClick={() => setPage('recipes')}
            >
              Recipes
            </button>
            <button
              className="px-16 py-6 rounded-full bg-white bg-opacity-80 text-indigo-700 font-extrabold text-4xl shadow hover:bg-indigo-100 transition border-4 border-indigo-300"
              onClick={() => setPage('add')}
            >
              Add Recipe
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (page === 'recipes') {
    return <HomePage recipes={recipes} onBack={() => setPage('landing')} />;
  }
  if (page === 'add') {
    return <AddRecipePage onBack={() => setPage('landing')} recipes={recipes} setRecipes={setRecipes} />;
  }
  return null;
}


export default App;
