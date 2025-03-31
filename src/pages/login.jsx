import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", null, {
        params: { username, password },
      });

      localStorage.setItem("token", response.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 p-4">
      <div className="relative w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
        <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-cyan-300/10 blur-xl"></div>
        
        {/* Login card */}
        <form
          onSubmit={handleLogin}
          className="relative bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
        >
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
            Welcome Back
          </h2>

          {error && (
            <div className="mb-4 p-3 text-sm text-white bg-red-400/80 rounded-lg backdrop-blur-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-white/80 text-sm mb-1">Username</label>
            <input
              type="text"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-white/80 text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="mt-4 text-center text-white/70 text-sm">
            Don't have an account?{' '}
            <button 
              type="button" 
              className="text-cyan-300 hover:text-cyan-200 font-medium"
              onClick={() => navigate('/register')}
            >
              Create one
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;