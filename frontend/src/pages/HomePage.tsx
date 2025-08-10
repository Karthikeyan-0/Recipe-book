// frontend/src/pages/HomePage.tsx
import RecipeCard from '../components/RecipeCard';
// ...removed bgFoodPattern import...
// ...existing code...

interface Recipe {
  _id?: string;
  id?: number;
  name: string;
  ingredients: string;
  instructions: string;
}

import { useState } from 'react';

const HomePage = ({ recipes, onBack }: { recipes: Recipe[]; onBack?: () => void }) => {
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const [search, setSearch] = useState("");
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
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
      <div className="w-full flex flex-col px-4 pt-10 pb-4">
        {/* Search Bar & Back Button Row */}
        <div className="flex justify-center items-center gap-4 mb-8">
          {onBack && (
             <button className="px-6 py-2 rounded-full bg-white bg-opacity-100 text-indigo-700 font-extrabold shadow-lg hover:bg-indigo-100 transition border-2 border-indigo-300" onClick={onBack}>
              ← Back
            </button>
          )}
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search recipes..."
            className="w-full max-w-lg px-6 py-3 rounded-full border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg shadow-lg bg-white bg-opacity-100 placeholder-gray-400 text-gray-700 font-extrabold"
            style={{ textAlign: 'center' }}
          />
        </div>
        <h1 className="text-4xl font-extrabold mb-10 text-center text-white drop-shadow-lg tracking-wide">Recipes</h1>
        {filteredRecipes.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">No recipes found.</div>
        ) : (
          <div className="w-full flex justify-center">
            <div className="w-full md:w-3/5 lg:w-3/5 xl:w-3/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4">
              {filteredRecipes.map(recipe => (
                <RecipeCard
                  key={recipe._id || recipe.id}
                  recipe={recipe}
                  expanded={expandedId === (recipe._id ?? recipe.id ?? '')}
                  onExpand={() => setExpandedId(expandedId === (recipe._id ?? recipe.id ?? '') ? null : (recipe._id ?? recipe.id ?? ''))}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
