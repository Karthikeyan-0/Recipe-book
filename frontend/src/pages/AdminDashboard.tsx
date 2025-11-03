import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

interface Recipe {
  _id?: string;
  id?: number;
  name: string;
  ingredients: string;
  instructions: string;
}

interface AdminDashboardProps {
  recipes: Recipe[];
  onBack: () => void;
  onRefresh: () => void;
}

export default function AdminDashboard({ recipes, onBack, onRefresh }: AdminDashboardProps) {
  const [stats, setStats] = useState({
    totalRecipes: recipes.length,
    totalUsers: 1,
  });
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStats({
      totalRecipes: recipes.length,
      totalUsers: 1,
    });
  }, [recipes]);

  const handleDeleteRecipe = async (recipeId: string | number | undefined) => {
    if (!recipeId) return;

    if (window.confirm('Are you sure you want to delete this recipe?')) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:5000/recipes/${recipeId}`);
        onRefresh();
        setSelectedRecipe(null);
      } catch (err) {
        console.error('Error deleting recipe:', err);
        alert('Failed to delete recipe');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar title="Admin Dashboard" onLogout={handleLogout} />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-2">🔐 Admin Dashboard</h1>
            <p className="text-xl text-gray-600">Manage all recipes and system content</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Total Recipes</p>
                  <p className="text-4xl font-bold text-orange-600 mt-2">{stats.totalRecipes}</p>
                </div>
                <div className="text-5xl">📚</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Active Users</p>
                  <p className="text-4xl font-bold text-purple-600 mt-2">{stats.totalUsers}</p>
                </div>
                <div className="text-5xl">👥</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recipes List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  📋 All Recipes ({recipes.length})
                </h2>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                      <button
                        key={recipe._id || recipe.id}
                        onClick={() => setSelectedRecipe(recipe)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md ${
                          selectedRecipe?._id === recipe._id || selectedRecipe?.id === recipe.id
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 bg-white hover:border-orange-300'
                        }`}
                      >
                        <p className="font-bold text-gray-800">{recipe.name}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {recipe.ingredients.substring(0, 50)}...
                        </p>
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">No recipes found</p>
                  )}
                </div>
              </div>
            </div>

            {/* Recipe Details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-32">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recipe Details</h3>

                {selectedRecipe ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-600 text-sm font-semibold">Name</p>
                      <p className="text-gray-800 font-bold mt-1">{selectedRecipe.name}</p>
                    </div>

                    <div>
                      <p className="text-gray-600 text-sm font-semibold">Ingredients</p>
                      <p className="text-gray-800 text-sm mt-1 max-h-20 overflow-y-auto">
                        {selectedRecipe.ingredients}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-600 text-sm font-semibold">Instructions</p>
                      <p className="text-gray-800 text-sm mt-1 max-h-20 overflow-y-auto">
                        {selectedRecipe.instructions}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteRecipe(selectedRecipe._id || selectedRecipe.id)}
                      disabled={loading}
                      className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-bold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {loading ? 'Deleting...' : '🗑️ Delete Recipe'}
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Select a recipe to view details</p>
                )}
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition-all duration-300"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
