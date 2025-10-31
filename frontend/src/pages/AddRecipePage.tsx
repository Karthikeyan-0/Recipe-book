// frontend/src/pages/AddRecipePage.tsx
import RecipeForm from '../components/RecipeForm';
import Navbar from '../components/Navbar';
import { Recipe } from '../App';
import axios from 'axios';

interface AddRecipePageProps {
  onBack: () => void;
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const AddRecipePage: React.FC<AddRecipePageProps> = ({ onBack, setRecipes }) => {
  // Add handler to add recipe to backend and update state
  const handleAddRecipe = async (recipe: { name: string; ingredients: string; instructions: string }) => {
    try {
      const response = await axios.post('http://localhost:5000/recipes', recipe);
      setRecipes(prev => [...prev, response.data]);
    } catch (error) {
      throw new Error('Failed to add recipe. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Navbar */}
      <Navbar title="RecipeHub" onBack={onBack} showBackButton={true} />

      {/* Main Content */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center space-y-4">
            <h1 className="text-5xl font-bold text-gray-900">
              ✨ Share Your Recipe
            </h1>
            <p className="text-xl text-gray-600 max-w-lg mx-auto">
              Have a delicious recipe? Share it with our community and inspire others to cook amazing meals!
            </p>
          </div>

          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12 animate-fade-in">
            {/* Form Steps Indicator */}
            <div className="flex gap-4 mb-12 justify-center">
              {[
                { icon: '🍽️', label: 'Name' },
                { icon: '📝', label: 'Ingredients' },
                { icon: '👨‍🍳', label: 'Instructions' },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                    {step.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{step.label}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            <RecipeForm onAddRecipe={handleAddRecipe} />

            {/* Tips Section */}
            <div className="mt-12 pt-8 border-t border-gray-200 space-y-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">💡 Tips for Great Recipes:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span>✅</span>
                  <span>Use clear, descriptive names that tell people what the dish is</span>
                </li>
                <li className="flex gap-3">
                  <span>✅</span>
                  <span>List ingredients with quantities (e.g., "2 cups flour")</span>
                </li>
                <li className="flex gap-3">
                  <span>✅</span>
                  <span>Number your steps for easy-to-follow instructions</span>
                </li>
                <li className="flex gap-3">
                  <span>✅</span>
                  <span>Include cooking times and temperatures</span>
                </li>
                <li className="flex gap-3">
                  <span>📸</span>
                  <span>Add a recipe image from <a href="https://unsplash.com/nsa/food" target="_blank" rel="noopener noreferrer" className="text-orange-600 font-bold hover:underline">Unsplash Food</a> or use a direct image URL</span>
                </li>
              </ul>

              {/* Popular Image URLs */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3">📸 Quick Image Links:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    { name: 'Pasta', url: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop' },
                    { name: 'Curry', url: 'https://images.unsplash.com/photo-1596040424055-9be7aff3c3e8?w=400&h=300&fit=crop' },
                    { name: 'Salad', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop' },
                    { name: 'Dessert', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop' },
                  ].map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        const formElement = document.querySelector('#imageUrl') as HTMLInputElement;
                        if (formElement) {
                          formElement.value = img.url;
                          formElement.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                      }}
                      className="p-2 bg-orange-50 hover:bg-orange-100 border border-orange-300 rounded text-orange-700 font-medium transition-all duration-200"
                    >
                      {img.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Back Button for Mobile */}
          <div className="mt-8 text-center md:hidden">
            <button
              onClick={onBack}
              className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:border-orange-500 transition-all duration-300"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipePage;
