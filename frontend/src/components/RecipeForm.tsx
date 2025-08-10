// frontend/src/components/RecipeForm.tsx
import { useState } from 'react';

interface RecipeFormProps {
  onAddRecipe?: (recipe: { name: string; ingredients: string; instructions: string }) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onAddRecipe }) => {
  const [name, setName] = useState('');
  // Removed image state
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !ingredients || !instructions) {
      setError('All fields are required.');
      return;
    }
    setError('');
    if (onAddRecipe) {
      onAddRecipe({ name, ingredients, instructions });
    }
    setName('');
    setIngredients('');
    setInstructions('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto mt-8 p-4 border rounded-lg shadow-md">
      {error && <p className="text-red-500">{error}</p>}
      <div>
  <label htmlFor="name" className="block text-lg font-bold text-indigo-700 mb-2 tracking-wide">Recipe Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
  {/* Removed image URL input */}
      <div>
  <label htmlFor="ingredients" className="block text-lg font-bold text-indigo-700 mb-2 tracking-wide">Ingredients</label>
        <input
          type="text"
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
  <label htmlFor="instructions" className="block text-lg font-bold text-indigo-700 mb-2 tracking-wide">Preparation / Instructions</label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;
