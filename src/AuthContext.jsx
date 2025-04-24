import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Store token in state
  const [loading, setLoading] = useState(true);

  // Function to check if user is authenticated on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        
        if (storedToken) {
          try {
            // Validate the token with your backend
            const response = await fetch('http://localhost:8080/api/auth/validate', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${storedToken}`
              }
            });
            
            if (response.ok) {
              const userData = await response.json();
              // Store both user data and token
              setUser(userData);
              setToken(storedToken);
              return true;
             // Set the token in state
            } else {
              // Token invalid or expired
              clearAuth();
            }
          } catch (error) {
            console.error("Token validation error:", error);
            clearAuth();
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Clear authentication data
  const clearAuth = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  // Login function
  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", 
        },
        body: new URLSearchParams({
          username: username,
          password: password
        })
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const authToken = await response.text();
      localStorage.setItem("token", authToken);
      setUser(username);
      setToken(authToken);
      
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    }
  };

  // Register function
  const register = async (username, email, password) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    clearAuth();
  };

  const value = {
    user,
    token, // Make token available to consumers
    login,
    logout,
    register,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};