import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate inputs
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Simple validation - accept any email format and password >= 6 chars
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({ email, isLoggedIn: true }));
      
      // Navigate to home and reload to ensure Auth context updates
      setLoading(false);
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 500);
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-card animate-fade-in">
        <div className="login-header">
          <h1 className="login-title">🍳 Recipe Book</h1>
          <p className="login-subtitle">Your Personal Recipe Collection</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="login-button btn-glow"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-divider">
          <span>Don't have an account?</span>
        </div>

        <button
          onClick={handleSignUp}
          className="signup-button"
          disabled={loading}
        >
          Create Account
        </button>

        <div className="demo-login">
          <p className="demo-text">Demo Credentials:</p>
          <p className="demo-info">Email: <code>demo@example.com</code></p>
          <p className="demo-info">Password: <code>password123</code></p>
        </div>
      </div>
    </div>
  );
}
