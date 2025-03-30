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
      // Sending data as query parameters instead of JSON
      const response = await axios.post("http://localhost:8080/api/auth/login", null, {
        params: { username, password }, // Send credentials as query params
      });

      localStorage.setItem("token", response.data); // Store JWT
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Login
        </h2>

        {error && (
          <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-200"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
