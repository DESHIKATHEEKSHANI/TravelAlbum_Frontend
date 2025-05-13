import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, role, logout, token} = useAuth();
  const [activeTab, setActiveTab] = useState("admin-dashboard");
  const [users, setUsers] = useState([]);
  const [trips, setTrips] = useState([]);
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTrips: 0,
    totalMemories: 0,
    upcomingTrips: 0,
    pastTrips: 0,
  });

  useEffect(() => {
    // Redirect if not admin or not logged in
    if (!user || role !== "ADMIN") {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchUsers(),
          fetchTrips(),
          fetchMemories(),
        ]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data");
        setLoading(false);
      }
    };

    fetchData();
  }, [user, role, navigate]);

  useEffect(() => {
    // Calculate stats whenever underlying data changes
    calculateStats();
  }, [users, trips, memories]);

  const fetchUsers = async () => {
    try {
      // Mocked for now - would be replaced with actual API call
      const response = await fetch("http://localhost:8080/api/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error("Failed to fetch users");
      
      const data = await response.json();
      setUsers(data);
      return data;
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users");
      return [];
    }
  };

  const fetchTrips = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/trips", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error("Failed to fetch trips");
      
      const data = await response.json();
      setTrips(data);
      return data;
    } catch (err) {
      console.error("Error fetching trips:", err);
      setError("Failed to load trips");
      return [];
    }
  };

  const fetchMemories = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/memories", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error("Failed to fetch memories");
      
      const data = await response.json();
      setMemories(data);
      return data;
    } catch (err) {
      console.error("Error fetching memories:", err);
      setError("Failed to load memories");
      return [];
    }
  };

  const calculateStats = () => {
    const upcomingTripsCount = trips.filter(trip => trip.isUpcoming).length;
    const pastTripsCount = trips.filter(trip => trip.isPast).length;

    setStats({
      totalUsers: users.length,
      totalTrips: trips.length,
      totalMemories: memories.length,
      upcomingTrips: upcomingTripsCount,
      pastTrips: pastTripsCount,
    });
  };

  const handleDeleteUser = async (username) => {
    if (!confirm(`Are you sure you want to delete user ${username}?`)) return;

    try {
      const response = await fetch(`http://localhost:8080/api/users/${username}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error("Failed to delete user");
      
      // Update UI after successful deletion
      setUsers(users.filter(user => user.username !== username));
      
      // Also filter out related trips and memories
      setTrips(trips.filter(trip => trip.username !== username));
      setMemories(memories.filter(memory => memory.username !== username));
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user");
    }
  };

  const handleDeleteTrip = async (id) => {
    if (!confirm("Are you sure you want to delete this trip?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/trips/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error("Failed to delete trip");
      
      // Update UI after successful deletion
      setTrips(trips.filter(trip => trip.id !== id));
    } catch (err) {
      console.error("Error deleting trip:", err);
      setError("Failed to delete trip");
    }
  };

  const handleDeleteMemory = async (id) => {
    if (!confirm("Are you sure you want to delete this memory?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/memories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error("Failed to delete memory");
      
      // Update UI after successful deletion
      setMemories(memories.filter(memory => memory.id !== id));
    } catch (err) {
      console.error("Error deleting memory:", err);
      setError("Failed to delete memory");
    }
  };

  const handleViewUserDetails = (username) => {
    setSelectedUser(username);
    setActiveTab("userDetails");
  };

  const filteredUsers = users.filter(user => {
    return user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          trip.username.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterOption === "all") return matchesSearch;
    if (filterOption === "upcoming") return matchesSearch && trip.isUpcoming;
    if (filterOption === "past") return matchesSearch && trip.isPast;
    if (filterOption === "planning") return matchesSearch && !trip.isUpcoming && !trip.isPast;
    if (selectedUser) return matchesSearch && trip.username === selectedUser;
    
    return matchesSearch;
  });

  const filteredMemories = memories.filter(memory => {
    const matchesSearch = memory.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          memory.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (memory.category && memory.category.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterOption === "all") return matchesSearch;
    if (filterOption === "favorite") return matchesSearch && memory.favorite;
    if (selectedUser) return matchesSearch && memory.username === selectedUser;
    
    return matchesSearch;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getUserTripsAndMemories = (username) => {
    const userTrips = trips.filter(trip => trip.username === username);
    const userMemories = memories.filter(memory => memory.username === username);
    return { trips: userTrips, memories: userMemories };
  };

  // Find the selected user's details
  const userDetails = users.find(u => u.username === selectedUser);
  const userContent = selectedUser ? getUserTripsAndMemories(selectedUser) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      {/* Admin Dashboard Header */}
      <header className="bg-blue-900/80 backdrop-blur-sm shadow-lg border-b border-amber-100/10 p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="bg-amber-500 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                <path d="M12 14a7 7 0 0 0-7 7"></path>
                <path d="M12 14a7 7 0 0 1 7 7"></path>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-100 to-amber-300">Admin Dashboard</h1>
              <p className="text-blue-200">TravelScape Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-800/50 p-2 rounded-full">
              <span className="text-amber-200 font-medium">{user}</span>
              <span className="ml-2 bg-amber-500/20 text-amber-200 text-xs px-2 py-1 rounded-full">
                Admin
              </span>
            </div>
            <button 
              onClick={() => navigate("/")}
              className="bg-blue-700/50 hover:bg-blue-700/70 px-4 py-2 rounded-lg transition-all flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Home
            </button>
            <button 
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="bg-blue-800/50 rounded-xl p-6 border border-blue-700/50 shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-blue-200 font-medium">Total Users</h3>
              <div className="bg-blue-700/50 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
          </div>
          
          <div className="bg-blue-800/50 rounded-xl p-6 border border-blue-700/50 shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-blue-200 font-medium">Total Trips</h3>
              <div className="bg-blue-700/50 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18"></path>
                  <path d="M15 10.5V7a4 4 0 0 0-4-4h0a4 4 0 0 0-4 4v3.5"></path>
                  <path d="M5 10.5a2 2 0 1 0 4 0l-2-4-2 4Z"></path>
                  <path d="M15 10.5a2 2 0 1 0 4 0l-2-4-2 4Z"></path>
                  <path d="M5 14h14"></path>
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold mt-2">{stats.totalTrips}</p>
          </div>
          
          <div className="bg-blue-800/50 rounded-xl p-6 border border-blue-700/50 shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-blue-200 font-medium">Total Memories</h3>
              <div className="bg-blue-700/50 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"></path>
                  <path d="m21 15-5-5L5 21"></path>
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold mt-2">{stats.totalMemories}</p>
          </div>
          
          <div className="bg-blue-800/50 rounded-xl p-6 border border-blue-700/50 shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-blue-200 font-medium">Upcoming Trips</h3>
              <div className="bg-blue-700/50 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold mt-2">{stats.upcomingTrips}</p>
          </div>
          
          <div className="bg-blue-800/50 rounded-xl p-6 border border-blue-700/50 shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-blue-200 font-medium">Past Trips</h3>
              <div className="bg-blue-700/50 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                  <path d="M7 18a2 2 0 1 0 4 0v-5a2 2 0 1 0-4 0"></path>
                  <path d="M7 13h5a2 2 0 0 0 0-4h-1a2 2 0 0 1 0-4h3"></path>
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold mt-2">{stats.pastTrips}</p>
          </div>
        </div>
      </div>

      {/* Activity Charts */}
      <div className="max-w-7xl mx-auto mb-8 px-4">
        <div className="bg-blue-800/30 rounded-xl p-6 border border-blue-700/50 shadow-lg backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4 text-amber-200">Activity Overview</h2>
          <ActivityChart trips={trips} memories={memories} />
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Tab Navigation */}
        <div className="mb-6 border-b border-blue-700/50">
          <div className="flex overflow-x-auto">
            <button 
              className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === "users" ? "border-b-2 border-amber-300 text-amber-200" : "text-blue-200 hover:text-amber-200"}`}
              onClick={() => {
                setActiveTab("users");
                setSelectedUser(null);
              }}
            >
              Users Management
            </button>
            <button 
              className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === "trips" ? "border-b-2 border-amber-300 text-amber-200" : "text-blue-200 hover:text-amber-200"}`}
              onClick={() => {
                setActiveTab("trips");
                setSelectedUser(null);
              }}
            >
              Trips Management
            </button>
            <button 
              className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === "memories" ? "border-b-2 border-amber-300 text-amber-200" : "text-blue-200 hover:text-amber-200"}`}
              onClick={() => {
                setActiveTab("memories");
                setSelectedUser(null);
              }}
            >
              Memories Management
            </button>
            {selectedUser && (
              <button 
                className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === "userDetails" ? "border-b-2 border-amber-300 text-amber-200" : "text-blue-200 hover:text-amber-200"}`}
                onClick={() => setActiveTab("userDetails")}
              >
                User Details: {selectedUser}
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-300"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-600/20 border border-red-600 rounded-lg p-4 mb-6">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Tab Content */}
        {!loading && !error && (
          <>
            {/* Users Management Tab */}
            {activeTab === "users" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-amber-200">Users Management</h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="bg-blue-900/50 border border-blue-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-300 text-blue-100 placeholder-blue-400"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-2.5 text-blue-400">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </div>
                </div>

                {/* Users Table */}
                <div className="bg-blue-800/30 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-blue-900/50 text-blue-200">
                        <tr>
                          <th className="px-4 py-3 text-left">Username</th>
                          <th className="px-4 py-3 text-left">Email</th>
                          <th className="px-4 py-3 text-center">Trips</th>
                          <th className="px-4 py-3 text-center">Memories</th>
                          <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blue-700/50">
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user, index) => {
                            const userContent = getUserTripsAndMemories(user.username);
                            return (
                              <tr key={index} className="hover:bg-blue-700/30">
                                <td className="px-4 py-4 font-medium">{user.username}</td>
                                <td className="px-4 py-4 text-blue-200">{user.email || "N/A"}</td>
                                <td className="px-4 py-4 text-center">{userContent.trips.length}</td>
                                <td className="px-4 py-4 text-center">{userContent.memories.length}</td>
                                <td className="px-4 py-4 text-center">
                                  <div className="flex justify-center space-x-2">
                                    <button 
                                      onClick={() => handleViewUserDetails(user.username)}
                                      className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-all"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                      </svg>
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteUser(user.username)}
                                      className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition-all"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 6h18"></path>
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                      </svg>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="5" className="px-4 py-8 text-center text-blue-300">No users found with the current search criteria.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Trips Management Tab */}
            {activeTab === "trips" && (
              <div>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                  <h2 className="text-xl font-bold text-amber-200">Trips Management</h2>
                  <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="relative flex-grow">
                      <input
                        type="text"
                        placeholder="Search trips..."
                        className="bg-blue-900/50 border border-blue-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-300 text-blue-100 placeholder-blue-400 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-2.5 text-blue-400">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                      </svg>
                    </div>
                    <select
                      className="bg-blue-900/50 border border-blue-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-300 text-blue-100"
                      value={filterOption}
                      onChange={(e) => setFilterOption(e.target.value)}
                    >
                      <option value="all">All Trips</option>
                      <option value="upcoming">Upcoming Trips</option>
                      <option value="past">Past Trips</option>
                      <option value="planning">Planning Phase</option>
                    </select>
                  </div>
                </div>

                {/* Trips Table */}
                <div className="bg-blue-800/30 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-blue-900/50 text-blue-200">
                        <tr>
                          <th className="px-4 py-3 text-left">Destination</th>
                          <th className="px-4 py-3 text-left">User</th>
                          <th className="px-4 py-3 text-left">Start Date</th>
                          <th className="px-4 py-3 text-left">End Date</th>
                          <th className="px-4 py-3 text-center">Status</th>
                          <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blue-700/50">
                        {filteredTrips.length > 0 ? (
                          filteredTrips.map((trip, index) => (
                            <tr key={index} className="hover:bg-blue-700/30">
                              <td className="px-4 py-4 font-medium">{trip.destination}</td>
                              <td className="px-4 py-4 text-blue-200">{trip.username}</td>
                              <td className="px-4 py-4 text-blue-200">{formatDate(trip.startDate)}</td>
                              <td className="px-4 py-4 text-blue-200">{formatDate(trip.endDate)}</td>
                              <td className="px-4 py-4 text-center">
                                {trip.isUpcoming && (
                                  <span className="bg-green-600/20 text-green-300 text-xs px-2 py-1 rounded-full">
                                    Upcoming
                                  </span>
                                )}
                                {trip.isPast && (
                                  <span className="bg-gray-600/20 text-gray-300 text-xs px-2 py-1 rounded-full">
                                    Past
                                  </span>
                                )}
                                {!trip.isUpcoming && !trip.isPast && (
                                  <span className="bg-blue-600/20 text-blue-300 text-xs px-2 py-1 rounded-full">
                                    Planning
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-4 text-center">
                                <div className="flex justify-center space-x-2">
                                  <button 
                                    onClick={() => navigate(`/trips/${trip.id}`)}
                                    className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-all"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                      <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteTrip(trip.id)}
                                    className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition-all"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M3 6h18"></path>
                                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                      <line x1="10" y1="11" x2="10" y2="17"></line>
                                      <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="px-4 py-8 text-center text-blue-300">No trips found with the current search criteria.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Memories Management Tab */}
            {activeTab === "memories" && (
              <div>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                  <h2 className="text-xl font-bold text-amber-200">Memories Management</h2>
                  <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="relative flex-grow">
                      <input
                        type="text"
                        placeholder="Search memories..."
                        className="bg-blue-900/50 border border-blue-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-300 text-blue-100 placeholder-blue-400 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-2.5 text-blue-400">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                      </svg>
                    </div>
                    <select
                      className="bg-blue-900/50 border border-blue-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-300 text-blue-100"
                      value={filterOption}
                      onChange={(e) => setFilterOption(e.target.value)}
                    >
                      <option value="all">All Memories</option>
                      <option value="favorite">Favorites Only</option>
                    </select>
                  </div>
                </div>

                {/* Memories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredMemories.length > 0 ? (
                    filteredMemories.map((memory, index) => (
                      <div key={index} className="bg-blue-800/30 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm border border-blue-700/50 flex flex-col">
                        <div className="h-40 bg-blue-900/50 relative">
                          {memory.imageUrl ? (
                            <img 
                              src={memory.imageUrl}
                              alt={memory.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                                <circle cx="9" cy="9" r="2"></circle>
                                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                              </svg>
                            </div>
                          )}
                          {memory.favorite && (
                            <div className="absolute top-2 right-2 bg-amber-500 p-1 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="p-4 flex-grow">
                          <h3 className="font-bold text-lg truncate">{memory.title}</h3>
                          <p className="text-blue-200 text-sm truncate">{memory.location}</p>
                          <div className="flex items-center mt-2 text-blue-300 text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <span>{memory.username}</span>
                          </div>
                          {memory.category && (
                            <div className="mt-2">
                              <span className="bg-blue-700/40 text-blue-200 text-xs px-2 py-1 rounded-full">
                                {memory.category}
                              </span>
                            </div>
                          )}
                          <p className="text-blue-200 mt-2 text-sm line-clamp-2">{memory.description}</p>
                        </div>
                        <div className="p-4 border-t border-blue-700/50 flex justify-between">
                          <button 
                            onClick={() => navigate(`/memories/${memory.id}`)}
                            className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded-lg transition-all text-sm flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            View
                          </button>
                          <button 
                            onClick={() => handleDeleteMemory(memory.id)}
                            className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded-lg transition-all text-sm flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full bg-blue-800/30 rounded-xl p-8 text-center text-blue-300">
                      No memories found with the current search criteria.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* User Details Tab */}
            {activeTab === "userDetails" && userDetails && (
              <div>
                <div className="mb-6 flex items-center">
                  <button 
                    onClick={() => {
                      setActiveTab("users");
                      setSelectedUser(null);
                    }}
                    className="mr-4 bg-blue-800 hover:bg-blue-700 p-2 rounded-lg transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m12 19-7-7 7-7"></path>
                      <path d="M19 12H5"></path>
                    </svg>
                  </button>
                  <h2 className="text-xl font-bold text-amber-200">User Details: {userDetails.username}</h2>
                </div>

                {/* User Profile Card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="bg-blue-800/30 rounded-xl p-6 border border-blue-700/50 shadow-lg backdrop-blur-sm">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-blue-700/50 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{userDetails.username}</h3>
                        <p className="text-blue-300">{userDetails.email || "No email provided"}</p>
                      </div>
                    </div>
                    <div className="border-t border-blue-700/50 pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-blue-300">Trips Created:</span>
                        <span className="font-medium">{userContent.trips.length}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-blue-300">Memories Shared:</span>
                        <span className="font-medium">{userContent.memories.length}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-blue-300">Account Type:</span>
                        <span className="font-medium">{userDetails.role || "Standard"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Joined:</span>
                        <span className="font-medium">{userDetails.createdAt ? formatDate(userDetails.createdAt) : "Unknown"}</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button 
                        onClick={() => handleDeleteUser(userDetails.username)}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all w-full flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        Delete User
                      </button>
                    </div>
                  </div>

                  {/* User Trips Preview */}
                  <div className="bg-blue-800/30 rounded-xl p-6 border border-blue-700/50 shadow-lg backdrop-blur-sm">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M3 17h18"></path>
                        <path d="M15 10.5V7a4 4 0 0 0-4-4h0a4 4 0 0 0-4 4v3.5"></path>
                        <path d="M5 10.5a2 2 0 1 0 4 0l-2-4-2 4Z"></path>
                        <path d="M15 10.5a2 2 0 1 0 4 0l-2-4-2 4Z"></path>
                        <path d="M5 14h14"></path>
                      </svg>
                      Trips
                    </h3>
                    {userContent.trips.length > 0 ? (
                      <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                        {userContent.trips.slice(0, 5).map((trip, index) => (
                          <div key={index} className="bg-blue-900/30 p-3 rounded-lg flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{trip.destination}</h4>
                              <p className="text-blue-300 text-sm">{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</p>
                            </div>
                            <div>
                              {trip.isUpcoming && (
                                <span className="bg-green-600/20 text-green-300 text-xs px-2 py-1 rounded-full">
                                  Upcoming
                                </span>
                              )}
                              {trip.isPast && (
                                <span className="bg-gray-600/20 text-gray-300 text-xs px-2 py-1 rounded-full">
                                  Past
                                </span>
                              )}
                              {!trip.isUpcoming && !trip.isPast && (
                                <span className="bg-blue-600/20 text-blue-300 text-xs px-2 py-1 rounded-full">
                                  Planning
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-blue-900/30 p-4 rounded-lg text-center text-blue-300">
                        No trips created yet
                      </div>
                    )}
                    {userContent.trips.length > 5 && (
                      <div className="mt-4 text-center">
                        <button 
                          onClick={() => {
                            setActiveTab("trips");
                            setFilterOption("all");
                            setSearchTerm(userDetails.username);
                          }}
                          className="text-amber-300 hover:text-amber-200 text-sm"
                        >
                          View all {userContent.trips.length} trips
                        </button>
                      </div>
                    )}
                  </div>

                  {/* User Memories Preview */}
                  <div className="bg-blue-800/30 rounded-xl p-6 border border-blue-700/50 shadow-lg backdrop-blur-sm">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"></path>
                        <path d="m21 15-5-5L5 21"></path>
                      </svg>
                      Memories
                    </h3>
                    {userContent.memories.length > 0 ? (
                      <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                        {userContent.memories.slice(0, 5).map((memory, index) => (
                          <div key={index} className="bg-blue-900/30 p-3 rounded-lg">
                            <h4 className="font-medium flex items-center">
                              {memory.title}
                              {memory.favorite && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 text-amber-400">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                              )}
                            </h4>
                            <p className="text-blue-300 text-sm">{memory.location}</p>
                            {memory.category && (
                              <span className="bg-blue-700/40 text-blue-200 text-xs px-2 py-1 rounded-full mt-2 inline-block">
                                {memory.category}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-blue-900/30 p-4 rounded-lg text-center text-blue-300">
                        No memories shared yet
                      </div>
                    )}
                    {userContent.memories.length > 5 && (
                      <div className="mt-4 text-center">
                        <button 
                          onClick={() => {
                            setActiveTab("memories");
                            setFilterOption("all");
                            setSearchTerm(userDetails.username);
                          }}
                          className="text-amber-300 hover:text-amber-200 text-sm"
                        >
                          View all {userContent.memories.length} memories
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* User Activity Chart */}
                <div className="bg-blue-800/30 rounded-xl p-6 border border-blue-700/50 shadow-lg backdrop-blur-sm mb-6">
                  <h3 className="text-lg font-bold mb-4">User Activity</h3>
                  <UserActivityChart trips={userContent.trips} memories={userContent.memories} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Activity Chart Component
const ActivityChart = ({ trips, memories }) => {
  // This is a placeholder. In a real application, you would implement a chart using
  // a library like Chart.js, Recharts, or D3.js
  
  // Simulate monthly data for the chart
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonth = new Date().getMonth();
  
  // Generate some fake data for display purposes
  const data = monthNames.map((month, index) => {
    const isPastMonth = index <= currentMonth;
    
    // Calculate random values for trips and memories, with past months having more data
    const tripCount = isPastMonth ? Math.floor(Math.random() * (trips.length / 3)) : 0;
    const memoryCount = isPastMonth ? Math.floor(Math.random() * (memories.length / 3)) : 0;
    
    return {
      month,
      trips: tripCount,
      memories: memoryCount
    };
  });
  
  return (
    <div className="h-64">
      <div className="flex justify-between mb-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="flex space-x-1">
              <div 
                className="w-2 bg-amber-500" 
                style={{ height: `${item.trips * 10}px`, maxHeight: '120px' }}
              ></div>
              <div 
                className="w-2 bg-blue-500" 
                style={{ height: `${item.memories * 10}px`, maxHeight: '120px' }}
              ></div>
            </div>
            <span className="text-xs mt-2 text-blue-300">{item.month}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-amber-500 mr-2"></div>
          <span className="text-xs text-blue-200">Trips</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 mr-2"></div>
          <span className="text-xs text-blue-200">Memories</span>
        </div>
      </div>
    </div>
  );
};

// User Activity Chart Component
const UserActivityChart = ({ trips, memories }) => {
  // Similar to ActivityChart but focused on a single user
  // This is a placeholder for demonstration purposes
  
  const last6Months = [];
  const currentDate = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const month = new Date(currentDate);
    month.setMonth(currentDate.getMonth() - i);
    last6Months.push(month.toLocaleDateString('en-US', { month: 'short' }));
  }
  
  // Generate some fake data for display purposes
  const data = last6Months.map((month) => {
    return {
      month,
      trips: Math.floor(Math.random() * Math.min(5, trips.length)),
      memories: Math.floor(Math.random() * Math.min(8, memories.length))
    };
  });
  
  return (
    <div className="h-48">
      <div className="flex h-36 items-end justify-between mb-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center w-1/6">
            <div className="flex space-x-1 h-full items-end">
              <div 
                className="w-4 bg-amber-500 rounded-t" 
                style={{ height: `${item.trips * 15}px`, minHeight: '1px' }}
              ></div>
              <div 
                className="w-4 bg-blue-500 rounded-t" 
                style={{ height: `${item.memories * 10}px`, minHeight: '1px' }}
              ></div>
            </div>
            <span className="text-xs mt-2 text-blue-300">{item.month}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-amber-500 mr-2"></div>
          <span className="text-xs text-blue-200">Trips</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 mr-2"></div>
          <span className="text-xs text-blue-200">Memories</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;