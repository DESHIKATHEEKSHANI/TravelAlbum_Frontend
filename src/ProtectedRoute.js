import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

/**
 * A route component that protects routes based on authentication and role
 * @param {Object} props - Component props
 * @param {string} props.requiredRole - The role required to access this route (optional)
 * @param {string} props.redirectPath - Where to redirect if not authenticated or authorized
 */
function ProtectedRoute({ requiredRole, redirectPath = "/" }) {
  const { user, role, loading } = useAuth();
  
  // If still loading auth state, don't render anything yet
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // Check if user is authenticated
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  
  // If a specific role is required, check if user has that role
  if (requiredRole && role !== requiredRole) {
    // Redirect to dashboard or unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }
  
  // User is authenticated and authorized
  return <Outlet />;
}

export default ProtectedRoute;