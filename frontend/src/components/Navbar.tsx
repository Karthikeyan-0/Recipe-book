// frontend/src/components/Navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex flex-col items-center">
        <span className="text-white text-2xl font-bold mb-2">Recipe Book</span>
        <div className="flex justify-center gap-8 mt-2">
          <Link to="/" className="text-white px-6 py-2 rounded hover:bg-gray-700 transition">Recipes</Link>
          <Link to="/add" className="text-white px-6 py-2 rounded hover:bg-gray-700 transition">Add Recipe</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
