import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import AddMemory from "../components/AddMemory";
import Memories from "../components/Memories";
import MyTrips from "../components/MyTrips";
import Settings from "../components/Settings";

const IconHome = () => (
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
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const IconMap = () => (
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
    <circle cx="12" cy="10" r="3"></circle>
    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"></path>
  </svg>
);

const IconCamera = () => (
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
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
    <circle cx="12" cy="13" r="3"></circle>
  </svg>
);

const IconSettings = () => (
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
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const IconLogOut = () => (
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
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const IconUser = () => (
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
    <circle cx="12" cy="8" r="5"></circle>
    <path d="M20 21a8 8 0 1 0-16 0"></path>
  </svg>
);

const IconMenu = () => (
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
    <line x1="4" y1="12" x2="20" y2="12"></line>
    <line x1="4" y1="6" x2="20" y2="6"></line>
    <line x1="4" y1="18" x2="20" y2="18"></line>
  </svg>
);

const IconX = () => (
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
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);

const IconPlus = () => (
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
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </svg>
);

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAddMemoryOpen, setIsAddMemoryOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("dashboard");

  const [memories, setMemories] = useState([]);
  const [trips, setTrips] = useState([]);
  const [upcomingTrip, setUpcomingTrip] = useState(null);
  const [stats, setStats] = useState({
    totalTrips: 0,
    countriesVisited: 0,
    totalMemories: 0,
  });
  const [loading, setLoading] = useState({
    memories: true,
    trips: true,
  });
  const [error, setError] = useState({
    memories: null,
    trips: null,
  });

  // Redirect if no user is logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Fetch memories from backend
  useEffect(() => {
    const fetchMemories = async () => {
      if (!user || !token) return;

      try {
        setLoading((prev) => ({ ...prev, memories: true }));

        // Use the full URL including http://localhost:8080
        const response = await fetch(
          `http://localhost:8080/api/memories?username=${user}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching memories: ${response.status}`);
        }

        const data = await response.json();
        setMemories(data);
        setStats((prev) => ({ ...prev, totalMemories: data.length }));
        setError((prev) => ({ ...prev, memories: null }));
      } catch (err) {
        console.error("Failed to fetch memories:", err);
        setError((prev) => ({ ...prev, memories: err.message }));
      } finally {
        setLoading((prev) => ({ ...prev, memories: false }));
      }
    };

    fetchMemories();
  }, [user, token]);

  useEffect(() => {
    const fetchTrips = async () => {
      if (!user || !token) return;

      try {
        setLoading((prev) => ({ ...prev, trips: true }));

        const response = await fetch(`http://localhost:8080/api/trips?username=${user}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Error fetching trips: ${response.status} - ${errorData}`);
        }
    
        const data = await response.json();

        const validTrips = data.filter(trip => 
          trip && 
          trip.destination && 
          trip.startDate && 
          trip.endDate
        );
        
        if (validTrips.length < data.length) {
          console.warn(`Filtered out ${data.length - validTrips.length} invalid trip records`);
        }
        
        setTrips(validTrips);

        // Find upcoming trip - ensuring we have valid date fields
        const upcoming = validTrips
          .filter((trip) => {
            try {
              return (
                trip.isUpcoming ||
                (trip.startDate && new Date(trip.startDate) > new Date())
              );
            } catch (err) {
              console.warn("Invalid date in trip record:", trip.id);
              return false;
            }
          })
          .sort((a, b) => {
            try {
              return new Date(a.startDate) - new Date(b.startDate);
            } catch (err) {
              return 0;
            }
          })[0];

        setUpcomingTrip(upcoming);

        // Calculate stats - with safeguards
        if (validTrips.length > 0) {
          const countries = [
            ...new Set(
              validTrips
                .map((trip) => {
                  try {
                    const destParts = trip.destination?.split(",");
                    return destParts && destParts.length > 0
                      ? destParts[destParts.length - 1].trim()
                      : null;
                  } catch (err) {
                    console.warn("Error processing destination:", trip.id);
                    return null;
                  }
                })
                .filter((country) => country !== null)
            ),
          ];

          setStats((prev) => ({
            ...prev,
            totalTrips: validTrips.length,
            countriesVisited: countries.length,
          }));
        } else {
          setStats((prev) => ({
            ...prev,
            totalTrips: 0,
            countriesVisited: 0,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch trips:", err);

        setError((prev) => ({ ...prev, trips: err.message }));

        // Reset trips data on error
        setTrips([]);
        setUpcomingTrip(null);
        setStats((prev) => ({
          ...prev,
          totalTrips: 0,
          countriesVisited: 0,
        }));
      } finally {
        setLoading((prev) => ({ ...prev, trips: false }));
      }
    };

    fetchTrips();
  }, [user, token]);

  // You could then add a retry button in your UI that calls retryFetchTrips()

  // Toggle the Add Memory modal
  const toggleAddMemory = () => {
    setIsAddMemoryOpen(!isAddMemoryOpen);
    if (isAddMemoryOpen) {
      setSelectedMemory(null);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Handle memory selection
  const handleMemoryClick = (memory) => {
    setSelectedMemory(memory);
  };

  // Close memory detail view
  const handleCloseMemory = () => {
    setSelectedMemory(null);
  };

  // Handle trip selection
  const handleTripClick = (trip) => {
    setSelectedTrip(trip);
  };

  // Close trip detail view
  const handleCloseTrip = () => {
    setSelectedTrip(null);
  };

  // Handle navigation change
  const handleNavChange = (navItem) => {
    setActiveNav(navItem);
    setSelectedMemory(null);
    setSelectedTrip(null);
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle memory refresh after adding a new one
  const handleAddMemorySuccess = async () => {
    toggleAddMemory();

    try {
      const response = await fetch(
        `http://localhost:8080/api/memories?username=${user}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error refreshing memories: ${response.status}`);
      }

      const data = await response.json();
      setMemories(data);
      setStats((prev) => ({ ...prev, totalMemories: data.length }));
    } catch (err) {
      console.error("Failed to refresh memories:", err);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-100 to-cyan-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-amber-200/10 blur-3xl"></div>
      </div>

      {/* Mobile sidebar toggle */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md md:hidden text-blue-700"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <IconX /> : <IconMenu />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out bg-white/80 backdrop-blur-md shadow-lg w-64 z-40 border-r border-amber-100/20`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-amber-100/20">
            <div className="flex items-center space-x-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-500"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                TravelScape
              </span>
            </div>
            <div className="flex items-center mt-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white">
                <IconUser />
              </div>
              <div className="ml-3">
                <p className="font-medium">{user || "Guest"}</p>
                <p className="text-sm text-blue-600">Travel Enthusiast</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <button
                  className={`flex items-center w-full p-2 rounded-lg ${
                    activeNav === "dashboard"
                      ? "bg-blue-600 text-white"
                      : "text-blue-800 hover:bg-blue-100 hover:text-blue-700"
                  } transition-all`}
                  onClick={() => handleNavChange("dashboard")}
                >
                  <span className="mr-3">
                    <IconHome />
                  </span>
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full p-2 rounded-lg ${
                    activeNav === "trips"
                      ? "bg-blue-600 text-white"
                      : "text-blue-800 hover:bg-blue-100 hover:text-blue-700"
                  } transition-all`}
                  onClick={() => handleNavChange("trips")}
                >
                  <span className="mr-3">
                    <IconMap />
                  </span>
                  My Trips
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full p-2 rounded-lg ${
                    activeNav === "memories"
                      ? "bg-blue-600 text-white"
                      : "text-blue-800 hover:bg-blue-100 hover:text-blue-700"
                  } transition-all`}
                  onClick={() => handleNavChange("memories")}
                >
                  <span className="mr-3">
                    <IconCamera />
                  </span>
                  Memories
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full p-2 rounded-lg ${
                    activeNav === "settings"
                      ? "bg-blue-600 text-white"
                      : "text-blue-800 hover:bg-blue-100 hover:text-blue-700"
                  } transition-all`}
                  onClick={() => handleNavChange("settings")}
                >
                  <span className="mr-3">
                    <IconSettings />
                  </span>
                  Settings
                </button>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t border-amber-100/20">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full p-2 rounded-lg text-red-600 hover:bg-red-50"
            >
              <span className="mr-2">
                <IconLogOut />
              </span>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm p-4 border-b border-amber-100/20">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              {activeNav === "dashboard"
                ? `Welcome, ${user || "Traveler"}`
                : activeNav === "memories"
                ? "My Memories"
                : activeNav === "trips"
                ? "My Trips"
                : activeNav === "settings"
                ? "Settings"
                : `Welcome, ${user || "Traveler"}`}
            </h1>
            {(activeNav === "dashboard" || activeNav === "memories") && (
              <button
                onClick={toggleAddMemory}
                className="hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                <span className="mr-2">
                  <IconPlus />
                </span>
                Add Memory
              </button>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {selectedMemory ? (
            <div className="p-6">
              <Memories
                memory={selectedMemory}
                onClose={handleCloseMemory}
                onAddMemory={toggleAddMemory}
              />
            </div>
          ) : selectedTrip ? (
            <div className="p-6">
              <MyTrips trip={selectedTrip} onClose={handleCloseTrip} />
            </div>
          ) : activeNav === "memories" ? (
            <div className="p-6">
              <Memories
                memories={memories}
                onMemoryClick={handleMemoryClick}
                onAddMemory={toggleAddMemory}
                loading={loading.memories}
                error={error.memories}
              />
            </div>
          ) : activeNav === "trips" ? (
            <div className="p-6">
              <MyTrips
                trips={trips}
                onTripClick={handleTripClick}
                loading={loading.trips}
                error={error.trips}
              />
            </div>
          ) : activeNav === "settings" ? (
            <div className="p-6">
              <Settings />
            </div>
          ) : (
            // Dashboard content
            <div className="p-6 overflow-auto">
              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-amber-100/20">
                  <h3 className="text-lg font-medium text-blue-600/80">
                    Total Trips
                  </h3>
                  <p className="text-3xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600">
                    {loading.trips ? "..." : stats.totalTrips}
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-amber-100/20">
                  <h3 className="text-lg font-medium text-blue-600/80">
                    Countries Visited
                  </h3>
                  <p className="text-3xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600">
                    {loading.trips ? "..." : stats.countriesVisited}
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-amber-100/20">
                  <h3 className="text-lg font-medium text-blue-600/80">
                    Total Memories
                  </h3>
                  <p className="text-3xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600">
                    {loading.memories ? "..." : stats.totalMemories}
                  </p>
                </div>
              </div>

              {/* Recent memories */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600">
                    Recent Memories
                  </h2>
                  <button
                    onClick={() => handleNavChange("memories")}
                    className="text-blue-600 hover:text-blue-800 transition-all"
                  >
                    View all
                  </button>
                </div>

                {loading.memories ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                  </div>
                ) : error.memories ? (
                  <div className="bg-red-50 text-red-500 p-4 rounded-lg">
                    Error loading memories: {error.memories}
                  </div>
                ) : memories.length === 0 ? (
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg text-center">
                    <p className="text-blue-600">
                      No memories yet. Create your first travel memory!
                    </p>
                    <button
                      onClick={toggleAddMemory}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                    >
                      Add Memory
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {memories.slice(0, 3).map((memory) => (
                      <div
                        key={memory.id}
                        className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all border border-amber-100/20 group cursor-pointer"
                        onClick={() => handleMemoryClick(memory)}
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={memory.imageUrl || "/api/placeholder/400/300"}
                            alt={memory.description}
                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <button className="text-white bg-blue-600/80 hover:bg-blue-700 px-3 py-1 rounded-full text-sm">
                              View Details
                            </button>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center text-blue-600 mb-2">
                            <span className="mr-1">
                              <IconMap />
                            </span>
                            <span className="text-sm">{memory.location}</span>
                          </div>
                          <h3 className="font-medium mb-2 text-blue-800">
                            {memory.description}
                          </h3>
                          <p className="text-sm text-blue-600/70">
                            {formatDate(memory.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Upcoming trip reminder */}
              {loading.trips ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                </div>
              ) : error.trips ? (
                <div className="bg-red-50 text-red-500 p-4 rounded-lg">
                  Error loading trips: {error.trips}
                </div>
              ) : upcomingTrip ? (
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md p-6 text-white border border-amber-100/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-amber-400/10 backdrop-blur-sm"></div>
                  <div className="relative z-10">
                    <h2 className="text-xl font-semibold mb-2">
                      Upcoming Trip
                    </h2>
                    <p className="mb-4">
                      {upcomingTrip.destination} -{" "}
                      {formatDate(upcomingTrip.startDate)}
                    </p>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => {
                          setSelectedTrip(upcomingTrip);
                          setActiveNav("trips");
                        }}
                        className="px-4 py-2 bg-white text-blue-600 rounded-full hover:shadow-lg transition-all"
                      >
                        View Details
                      </button>
                      <button className="px-4 py-2 border border-white text-white rounded-full hover:bg-white/20 transition-all">
                        Edit Trip
                      </button>
                    </div>
                  </div>
                  <div className="absolute -top-1/2 -right-1/4 w-64 h-64 rounded-full bg-amber-200/20 blur-2xl"></div>
                  <div className="absolute -bottom-1/2 -left-1/4 w-80 h-80 rounded-full bg-blue-300/20 blur-3xl"></div>
                </div>
              ) : (
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg text-center shadow-sm">
                  <p className="text-blue-600 mb-4">
                    No upcoming trips planned.
                  </p>
                  <button
                    onClick={() => handleNavChange("trips")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                  >
                    Plan a Trip
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile action button */}
      {(activeNav === "dashboard" || activeNav === "memories") && (
        <button
          onClick={toggleAddMemory}
          className="fixed bottom-6 right-6 z-20 md:hidden w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-blue-500/30 flex items-center justify-center transition-all"
        >
          <IconPlus />
        </button>
      )}

      {/* Add Memory Modal */}
      <AddMemory
        isOpen={isAddMemoryOpen}
        onClose={toggleAddMemory}
        onSuccess={handleAddMemorySuccess}
        username={user}
        token={token} // Pass token if AddMemory needs it
      />
    </div>
  );
};

export default Dashboard;