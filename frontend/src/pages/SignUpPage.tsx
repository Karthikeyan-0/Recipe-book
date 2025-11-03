import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { name, email, password, confirmPassword } = formData;

      // Validation
      if (!name || !email || !password || !confirmPassword) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      // Store user info and redirect
      localStorage.setItem('user', JSON.stringify({ name, email, isLoggedIn: true }));
      navigate('/');
    } catch (err) {
      setError('Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="login-container">
      <div className="login-card animate-fade-in">
        <div className="login-header">
          <h1 className="login-title">🍳 Create Account</h1>
          <p className="login-subtitle">Join Our Recipe Community</p>
        </div>

        <form onSubmit={handleSignUp} className="login-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-input"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="form-input"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="login-button btn-glow"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="login-divider">
          <span>Already have an account?</span>
        </div>

        <button
          onClick={handleBackToLogin}
          className="signup-button"
          disabled={loading}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
