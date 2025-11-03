import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import axios from 'axios';
import AddRecipePage from './pages/AddRecipePage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

export interface Recipe {
  _id?: string;
  id?: number;
  name: string;
  ingredients: string;
  instructions: string;
}

interface User {
  email: string;
  name?: string;
  isLoggedIn: boolean;
}

const AppContent = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (err) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkAuth();
    setLoading(false);

    const timer = setInterval(checkAuth, 300);
    return () => clearInterval(timer);
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/recipes');
      setRecipes(res.data);
    } catch (err) {
      console.error('Error fetching recipes:', err);
    }
  };

  useEffect(() => {
    if (user?.isLoggedIn) {
      fetchRecipes();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user?.isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage recipes={recipes} setRecipes={setRecipes} />} />
      <Route path="/recipes" element={<HomePage recipes={recipes} onBack={() => window.location.href = '/'} onRefresh={fetchRecipes} />} />
      <Route path="/add" element={<AddRecipePage onBack={() => window.location.href = '/'} recipes={recipes} setRecipes={setRecipes as any} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

interface LandingPageProps {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
}

function LandingPage({ recipes, setRecipes }: LandingPageProps) {
  const [page, setPage] = useState<'landing' | 'recipes' | 'add'>('landing');

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  if (page === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <Navbar title="RecipeHub" onLogout={handleLogout} />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent leading-tight">
                    Cook Like a Pro
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Discover, create, and share amazing recipes. Join thousands of food enthusiasts exploring culinary excellence.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setPage('recipes')}
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                     Explore Recipes
                  </button>
                  <button
                    onClick={() => setPage('add')}
                    className="px-8 py-3 border-2 border-orange-500 text-orange-600 rounded-lg font-bold hover:bg-orange-50 transition-all"
                  >
                     Share Your Recipe
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-8">
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-orange-600">{recipes.length}+</p>
                    <p className="text-gray-600">Recipes</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-orange-600">100%</p>
                    <p className="text-gray-600">Delicious</p>
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl p-8 shadow-2xl">
                    <div className="text-9xl text-center animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Why RecipeHub?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: '', title: 'Easy to Use', desc: 'Simple and intuitive interface' },
                { icon: '', title: 'Secure', desc: 'Your recipes are safely stored' },
                { icon: '', title: 'Community', desc: 'Share and discover recipes' },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all group"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'recipes') {
    return <HomePage recipes={recipes} onBack={() => setPage('landing')} onRefresh={() => {}} />;
  }

  if (page === 'add') {
    return (
      <AddRecipePage onBack={() => setPage('landing')} recipes={recipes} setRecipes={setRecipes as any} />
    );
  }

  return null;
}

export default App;
