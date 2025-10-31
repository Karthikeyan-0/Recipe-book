// frontend/src/components/RecipeForm.tsx
import { useState } from 'react';

interface RecipeFormProps {
  onAddRecipe?: (recipe: { name: string; ingredients: string; instructions: string; image?: string }) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onAddRecipe }) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !ingredients || !instructions) {
      setError('All fields are required.');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      if (onAddRecipe) {
        await onAddRecipe({ 
          name, 
          ingredients, 
          instructions,
          image: imageUrl || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop'
        });
        setSuccess('✅ Recipe added successfully!');
        setName('');
        setIngredients('');
        setInstructions('');
        setImageUrl('');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError('Failed to add recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-fade-in">
          <p className="text-red-700 font-medium">⚠️ {error}</p>
        </div>
      )}

      {/* Success Alert */}
      {success && (
        <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg animate-fade-in">
          <p className="text-green-700 font-medium">{success}</p>
        </div>
      )}

      {/* Recipe Name Field */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-lg font-bold text-gray-800">
          🍽️ Recipe Name *
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Delicious Pasta"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none text-gray-700 shadow-sm transition-all duration-300"
        />
      </div>

      {/* Ingredients Field */}
      <div className="space-y-2">
        <label htmlFor="ingredients" className="block text-lg font-bold text-gray-800">
          📝 Ingredients *
        </label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="List all ingredients separated by commas or line breaks&#10;Example: 2 cups flour, 1 egg, salt to taste"
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none text-gray-700 shadow-sm resize-none transition-all duration-300"
        />
      </div>

      {/* Image URL Field */}
      <div className="space-y-2">
        <label htmlFor="imageUrl" className="block text-lg font-bold text-gray-800">
          🖼️ Recipe Image URL (Optional)
        </label>
        <input
          type="url"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none text-gray-700 shadow-sm transition-all duration-300"
        />
        {imageUrl && (
          <div className="mt-2 rounded-lg overflow-hidden border-2 border-orange-200">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full h-48 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop';
              }}
            />
            <p className="text-xs text-gray-600 p-2">Image Preview</p>
          </div>
        )}
        <p className="text-xs text-gray-500">
          💡 Tip: Use Unsplash (<span className="text-orange-600">unsplash.com</span>) for free food images
        </p>
      </div>

      {/* Instructions Field */}
      <div className="space-y-2">
        <label htmlFor="instructions" className="block text-lg font-bold text-gray-800">
          👨‍🍳 Preparation / Instructions *
        </label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Describe the cooking process step by step&#10;Example: 1. Preheat oven...  2. Mix ingredients...  3. Bake for 30 minutes"
          rows={5}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none text-gray-700 shadow-sm resize-none transition-all duration-300"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Adding Recipe...
          </>
        ) : (
          <>
            ✨ Add Recipe
          </>
        )}
      </button>

      {/* Required Fields Note */}
      <p className="text-sm text-gray-600 text-center">* All fields are required</p>
    </form>
  );
};

export default RecipeForm;
