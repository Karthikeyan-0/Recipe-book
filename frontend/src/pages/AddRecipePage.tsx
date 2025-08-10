// frontend/src/pages/AddRecipePage.tsx
import RecipeForm from '../components/RecipeForm';
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
      alert('Failed to add recipe. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Overlay PNG background */}
      <div
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/IMAGES/OVERLAY.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 0.5,
        }}
      />
  <div className="w-full max-w-xl p-8 bg-white bg-opacity-100 rounded-3xl shadow-2xl border-4 border-indigo-300">
  <button className="mb-8 px-6 py-2 rounded-full bg-white bg-opacity-80 text-indigo-700 font-bold shadow hover:bg-indigo-100 transition border-2 border-indigo-300" onClick={onBack}>← Back</button>
        <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-700 drop-shadow-lg tracking-wide">Add a New Recipe</h1>
        <RecipeForm onAddRecipe={handleAddRecipe} />
      </div>
    </div>
  );
};

export default AddRecipePage;
