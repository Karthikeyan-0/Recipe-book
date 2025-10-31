// frontend/src/components/RecipeCard.tsx
interface Recipe {
  _id?: string;
  id?: number;
  name: string;
  ingredients: string;
  instructions: string;
  image?: string;
}

const RecipeCard = ({ recipe, expanded, onExpand }: { recipe: Recipe; expanded: boolean; onExpand: () => void }) => {
  console.log('RecipeCard rendering with recipe:', recipe);
  
  // Fallback to handle undefined values
  const name = recipe.name || 'Unnamed Recipe';
  const ingredients = recipe.ingredients || 'No ingredients listed';
  const instructions = recipe.instructions || 'No instructions';
  const imageUrl = recipe.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop';
  
  if (expanded) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 p-6 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">{name}</h2>
            <button
              onClick={onExpand}
              className="text-white text-3xl hover:scale-110 transition-transform duration-200"
            >
              ✕
            </button>
          </div>

          {/* Image */}
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-64 object-cover"
          />

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Ingredients Section */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                📝 Ingredients
              </h3>
              <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{ingredients}</p>
              </div>
            </div>

            {/* Instructions Section */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                👨‍🍳 Preparation
              </h3>
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{instructions}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-100 p-6 border-t flex gap-4">
            <button
              onClick={onExpand}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold hover:shadow-lg transition-all duration-300"
            >
              Close Recipe
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer">
      <div
        onClick={onExpand}
        className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-orange-500 transform hover:-translate-y-2 h-full flex flex-col"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden h-48 bg-gradient-to-br from-orange-100 to-red-100">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 mb-3 line-clamp-2">
            {name}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">{ingredients}</p>

          {/* Button */}
          <button
            onClick={onExpand}
            className="mt-auto px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            View Recipe →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
