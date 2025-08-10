// frontend/src/components/RecipeCard.tsx
interface Recipe {
  _id?: string;
  id?: number;
  name: string;
  ingredients: string;
  instructions: string;
}


const RecipeCard = ({ recipe, expanded, onExpand }: { recipe: Recipe; expanded: boolean; onExpand: () => void }) => {
  return (
  <div className={`bg-white bg-opacity-100 p-8 flex flex-col justify-between w-full max-w-lg mx-auto transition-all duration-300 border-2 border-indigo-100 rounded-3xl ${expanded ? 'h-[32rem] z-30 scale-110 shadow-2xl border-4 border-indigo-300 backdrop-blur-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'h-56 shadow-lg relative'}`}>
  <h3 className={`text-4xl font-extrabold mb-4 text-indigo-700 text-center tracking-wide ${expanded ? 'drop-shadow-lg' : ''}`}>{recipe.name}</h3>
      {expanded && (
        <div className="mt-6 px-4 py-6 rounded-xl bg-white bg-opacity-40 shadow-inner backdrop-blur-md">
          <div className="mb-4 text-xl text-gray-800 font-bold"><span className="text-indigo-700">Ingredients:</span> {recipe.ingredients}</div>
          <div className="text-xl text-gray-800 font-bold"><span className="text-indigo-700">Preparation:</span> {recipe.instructions}</div>
        </div>
      )}
      <button
        className={`mt-6 py-1 px-4 rounded-full text-base font-bold transition self-center shadow ${expanded ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-indigo-50 text-indigo-500 hover:bg-indigo-100'}`}
        onClick={onExpand}
      >
        {expanded ? 'Hide Recipe' : 'View Recipe'}
      </button>
    </div>
  );
};

export default RecipeCard;
