import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Type definition for a recipe
interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
  image: string;
}

const RecipeDetailsPage = () => {
  // Get recipe ID from URL
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch recipe details on mount
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  // Delete recipe handler
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await axios.delete(`http://localhost:5000/recipes/${id}`);
        navigate('/'); // Redirect to home after deletion
      } catch (error) {
        console.error('Error deleting recipe:', error);
      }
    }
  };

  // Show loading spinner
  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  // Show error if recipe not found
  if (!recipe) {
    return <div className="text-center mt-8">Recipe not found.</div>;
  }

  // Show recipe details
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {/* Recipe image */}
      <img src={recipe.image} alt={recipe.name} className="w-full h-64 object-cover rounded-md mb-4" />
      {/* Recipe name */}
      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
      {/* Ingredients list */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      {/* Instructions */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
        <p>{recipe.instructions}</p>
      </div>
      {/* Delete button */}
      <button 
        onClick={handleDelete}
        className="mt-6 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
      >
        Delete Recipe
      </button>
    </div>
  );
};

export default RecipeDetailsPage;