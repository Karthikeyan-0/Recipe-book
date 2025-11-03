// frontend/src/components/Navbar.tsx
interface NavbarProps {
  title?: string;
  onBack?: () => void;
  onLogout?: () => void;
  showBackButton?: boolean;
}

const Navbar = ({ title = "RecipeHub", onBack, onLogout, showBackButton = false }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            {showBackButton && onBack && (
              <button
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
              >
                <span className="text-2xl group-hover:-translate-x-1 transition-transform duration-200">←</span>
              </button>
            )}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">🍳</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                {title}
              </h1>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            {onLogout && (
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors duration-200 rounded-lg hover:bg-orange-50"
              >
                🚪 Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
