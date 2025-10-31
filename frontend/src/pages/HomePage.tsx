// frontend/src/pages/HomePage.tsx
import RecipeCard from '../components/RecipeCard';
import Navbar from '../components/Navbar';
import { useState } from 'react';

interface Recipe {
  _id?: string;
  id?: number;
  name: string;
  ingredients: string;
  instructions: string;
}

const HomePage = ({ recipes, onBack, onRefresh }: { recipes: Recipe[]; onBack?: () => void; onRefresh?: () => void }) => {
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const [search, setSearch] = useState("");
  console.log('HomePage received recipes:', recipes.length, 'recipes');
  console.log('First recipe:', recipes[0]);
  
  // Filter and handle recipes with proper fallbacks
  const filteredRecipes = recipes
    .filter(recipe => {
      // Skip recipes without a name
      if (!recipe.name || typeof recipe.name !== 'string') {
        console.warn('Skipping recipe without valid name:', recipe);
        return false;
      }
      return recipe.name.toLowerCase().includes(search.toLowerCase());
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Navbar */}
      <Navbar title="RecipeHub" onBack={onBack} showBackButton={!!onBack} />

      {/* Main Content */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-12 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  🍳 Discover Recipes
                </h1>
                <p className="text-gray-600 mt-2">
                  Browse {filteredRecipes.length} delicious recipes
                </p>
              </div>
              <div className="flex gap-3">
                {onRefresh && (
                  <button
                    onClick={onRefresh}
                    className="px-6 py-2 bg-white border-2 border-orange-500 text-orange-600 rounded-lg font-bold hover:bg-orange-50 transition-all duration-300 flex items-center gap-2"
                  >
                    🔄 Refresh
                  </button>
                )}
                {onBack && (
                  <button
                    onClick={onBack}
                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold hover:shadow-lg transition-all duration-300"
                  >
                    ← Back
                  </button>
                )}
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search recipes by name..."
                className="w-full px-6 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:outline-none text-lg shadow-md transition-all duration-300 bg-white"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
            </div>
          </div>

          {/* Recipe Grid */}
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🍜</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No recipes found</h2>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard
                  key={recipe._id || recipe.id}
                  recipe={recipe}
                  expanded={expandedId === (recipe._id ?? recipe.id ?? '')}
                  onExpand={() => setExpandedId(expandedId === (recipe._id ?? recipe.id ?? '') ? null : (recipe._id ?? recipe.id ?? ''))}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
