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
  const [role, setRole] = useState(null); // Store user role
  const [loading, setLoading] = useState(true);

  // Function to check if user is authenticated on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('userRole');
        
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
              // Store user data, token and role
              setUser(userData);
              setToken(storedToken);
              setRole(storedRole);
              return true;
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

  const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setUser(null);
    setToken(null);
    setRole(null);
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
  
      // First, check the content type
      const contentType = response.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        // Parse as JSON
        data = await response.json();
        
        // Check if it's the expected structure
        if (data && typeof data === 'object') {
          const token = data.token;
          const role = data.role;
          
          if (token) {
            // Store token and role
            localStorage.setItem("token", token);
            if (role) localStorage.setItem("userRole", role);
            
            // Update state
            setToken(token);
            if (role) setRole(role);
            setUser(username);
            
            return { success: true, role: role };
          }
        }
      } else {
        // Try to parse as text (original method)
        const textData = await response.text();
        localStorage.setItem("token", textData);
        setToken(textData);
        setUser(username);
        
        return { success: true };
      }
      
      throw new Error("Invalid response format");
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

  // Check if user is admin
  const isAdmin = () => {
    return role === 'ADMIN';
  };

  const value = {
    user,
    token,
    role,
    isAdmin,
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