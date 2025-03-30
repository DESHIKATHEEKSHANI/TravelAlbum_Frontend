import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between text-white">
      <Link to="/" className="font-bold">Travel AI Album</Link>
      <div>
        <Link to="/dashboard" className="mr-4">Dashboard</Link>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
