import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register({ onToggleAuth, onClose }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER" // Default role added to match backend DTO
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard"); // Redirect to dashboard if already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      // Prepare request payload - include role field
      const requestData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: "USER" // Set default role to USER
      };
      
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Registration failed");
      }

      // Handle successful registration
      setSuccess(true);
      
      // Automatically switch to login after successful registration
      setTimeout(() => {
        if (onToggleAuth) {
          onToggleAuth("login");
        } else if (onClose) {
          onClose();
        }
      }, 2000);
      
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Decorative elements */}
      <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
      <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-cyan-300/10 blur-xl"></div>
      
      {/* Register card */}
      <form
        onSubmit={handleRegister}
        className="relative bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
      >
        {/* Close button if provided */}
        {onClose && (
          <button 
            type="button" 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white p-1 rounded-full transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
        
        {/* Watermark icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="120" 
          height="120" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="absolute -right-6 -top-6 text-white/10"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        
        <h2 className="text-3xl font-bold mb-6 text-center text-white bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500">
          Create Account
        </h2>

        {success && (
          <div className="mb-4 p-3 text-sm text-white bg-green-500/80 rounded-lg backdrop-blur-sm">
            Registration successful! Redirecting to login...
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 text-sm text-white bg-red-400/80 rounded-lg backdrop-blur-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-white/80 text-sm mb-1">Username</label>
          <input
            type="text"
            name="username"
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white/80 text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white/80 text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white/80 text-sm mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white p-3 rounded-lg font-medium shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="mt-4 text-center text-white/70 text-sm">
          Already have an account?{' '}
          <button 
            type="button" 
            className="text-cyan-300 hover:text-cyan-200 font-medium"
            onClick={onToggleAuth ? () => onToggleAuth("login") : null}
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;