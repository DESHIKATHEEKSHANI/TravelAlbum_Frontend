import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import AddMemory from "../components/AddMemory";

// Reusing the same icons from Dashboard
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

const IconFilter = () => (
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
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const IconCalendar = () => (
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
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const IconHeart = () => (
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
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const IconSearch = () => (
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
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const IconEdit = () => (
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
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const IconTrash = () => (
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
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const Memories = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAddMemoryOpen, setIsAddMemoryOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { user, logout, getToken } = useAuth();
  const navigate = useNavigate();

  // Fetch memories from the backend
  const fetchMemories = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const token = getToken();

      const response = await fetch(`/api/memories?username=${user}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setMemories(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching memories:", err);
      setError("Failed to load memories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Redirect if no user is logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      fetchMemories();
    }
  }, [user, navigate]);

  // Toggle the Add Memory modal
  const toggleAddMemory = () => {
    setIsAddMemoryOpen(!isAddMemoryOpen);
    setIsEditMode(false);
    setSelectedMemory(null);
  };

  // Toggle filter dropdown
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  // Handle filter selection
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setFilterOpen(false);
  };

  // Handle memory creation
  const handleCreateMemory = async (newMemory) => {
    try {
      const token = getToken();

      const response = await fetch("/api/memories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newMemory,
          username: user,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const createdMemory = await response.json();
      setMemories([...memories, createdMemory]);
      setIsAddMemoryOpen(false);
    } catch (err) {
      console.error("Error creating memory:", err);
      setError("Failed to create memory. Please try again.");
    }
  };

  // Handle memory update
  const handleUpdateMemory = async (updatedMemory) => {
    try {
      const token = getToken();

      const response = await fetch(`/api/memories/${updatedMemory.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedMemory),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const updated = await response.json();
      setMemories(
        memories.map((memory) => (memory.id === updated.id ? updated : memory))
      );
      setIsAddMemoryOpen(false);
      setSelectedMemory(null);
      setIsEditMode(false);
    } catch (err) {
      console.error("Error updating memory:", err);
      setError("Failed to update memory. Please try again.");
    }
  };

  // Handle memory deletion
  const handleDeleteMemory = async (id) => {
    if (window.confirm("Are you sure you want to delete this memory?")) {
      try {
        const token = getToken();

        const response = await fetch(`/api/memories/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        setMemories(memories.filter((memory) => memory.id !== id));
      } catch (err) {
        console.error("Error deleting memory:", err);
        setError("Failed to delete memory. Please try again.");
      }
    }
  };

  // Handle edit memory click
  const handleEditMemory = (memory) => {
    setSelectedMemory(memory);
    setIsEditMode(true);
    setIsAddMemoryOpen(true);
  };

  // Toggle favorite status
  const handleToggleFavorite = async (memory) => {
    const updatedMemory = { ...memory, favorite: !memory.favorite };
    await handleUpdateMemory(updatedMemory);
  };

  // Filter memories based on search term and filter selection
  const filteredMemories = memories.filter((memory) => {
    const matchesSearch =
      memory.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.description?.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "favorites") return matchesSearch && memory.favorite;
    return matchesSearch && memory.category === selectedFilter;
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Get unique categories for filter
  const categories = [
    ...new Set(memories.map((memory) => memory.category)),
  ].filter(Boolean);

  // Stats calculations
  const totalMemories = memories.length;
  const favoriteMemories = memories.filter((m) => m.favorite).length;
  const uniqueCountries = [
    ...new Set(
      memories.map((m) => {
        const parts = m.location?.split(",");
        return parts && parts.length > 1 ? parts[parts.length - 1].trim() : "";
      })
    ),
  ].filter(Boolean).length;

  const categoriesCount = memories.reduce((acc, memory) => {
    if (memory.category) {
      acc[memory.category] = (acc[memory.category] || 0) + 1;
    }
    return acc;
  }, {});

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

      

      {/* Main content */}
      <div className="flex-1 overflow-auto relative z-10">
        

        {/* Memories content */}
        <main className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Filter and Search Bar */}
          <div className="mb-8 flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IconSearch />
              </div>
              <input
                type="text"
                placeholder="Search memories by location or description..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-amber-100/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <button
                className="flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-amber-100/30 text-blue-700 hover:bg-blue-50 transition-all"
                onClick={toggleFilter}
              >
                <span className="mr-2">
                  <IconFilter />
                </span>
                Filter:{" "}
                {selectedFilter.charAt(0).toUpperCase() +
                  selectedFilter.slice(1)}
              </button>

              {filterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-20 border border-amber-100/30">
                  <div className="py-1">
                    <button
                      className={`px-4 py-2 text-left w-full hover:bg-blue-50 ${
                        selectedFilter === "all"
                          ? "bg-blue-100 text-blue-700"
                          : ""
                      }`}
                      onClick={() => handleFilterChange("all")}
                    >
                      All Memories
                    </button>
                    <button
                      className={`px-4 py-2 text-left w-full hover:bg-blue-50 ${
                        selectedFilter === "favorites"
                          ? "bg-blue-100 text-blue-700"
                          : ""
                      }`}
                      onClick={() => handleFilterChange("favorites")}
                    >
                      Favorites
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`px-4 py-2 text-left w-full hover:bg-blue-50 ${
                          selectedFilter === category
                            ? "bg-blue-100 text-blue-700"
                            : ""
                        }`}
                        onClick={() => handleFilterChange(category)}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Memory Timeline */}
          <div className="mb-6">
            <div className="mb-4 flex items-center">
              <span className="mr-2">
                <IconCalendar />
              </span>
              <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600">
                Memory Timeline
              </h2>
            </div>

            {loading ? (
              <div className="p-8 text-center bg-white/80 backdrop-blur-sm rounded-lg border border-amber-100/20">
                <p className="text-blue-700 text-lg">Loading memories...</p>
              </div>
            ) : filteredMemories.length === 0 ? (
              <div className="p-8 text-center bg-white/80 backdrop-blur-sm rounded-lg border border-amber-100/20">
                <p className="text-blue-700 text-lg">
                  No memories found matching your search criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedFilter("all");
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMemories.map((memory) => (
                  <div
                    key={memory.id}
                    className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all border border-amber-100/20 group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={memory.imageUrl || "/api/placeholder/300/200"}
                        alt={memory.description}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-0 right-0 p-2">
                        <button
                          onClick={() => handleToggleFavorite(memory)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            memory.favorite
                              ? "bg-red-500 text-white"
                              : "bg-white/80 text-gray-700"
                          }`}
                        >
                          <IconHeart />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-blue-700 text-sm mb-1">
                        <IconCalendar className="mr-1" />
                        <span>
                          {new Date(memory.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-medium text-lg mb-1">
                        {memory.location}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {memory.description}
                      </p>
                      {memory.category && (
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {memory.category}
                        </span>
                      )}
                    </div>
                    <div className="flex border-t border-amber-100/20">
                      <button
                        onClick={() => handleEditMemory(memory)}
                        className="flex-1 p-2 text-blue-700 hover:bg-blue-50 transition-all"
                      >
                        <div className="flex items-center justify-center">
                          <IconEdit className="mr-2" />
                          Edit
                        </div>
                      </button>
                      <button
                        onClick={() => handleDeleteMemory(memory.id)}
                        className="flex-1 p-2 text-red-600 hover:bg-red-50 transition-all"
                      >
                        <div className="flex items-center justify-center">
                          <IconTrash className="mr-2" />
                          Delete
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="mt-8">
            <div className="mb-4 flex items-center">
              <span className="mr-2">
                <IconSearch />
              </span>
              <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600">
                Memory Statistics
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-amber-100/20">
                <h3 className="text-blue-700 font-medium mb-1">
                  Total Memories
                </h3>
                <p className="text-3xl font-bold">{totalMemories}</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-amber-100/20">
                <h3 className="text-blue-700 font-medium mb-1">
                  Favorite Memories
                </h3>
                <p className="text-3xl font-bold">{favoriteMemories}</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-amber-100/20">
                <h3 className="text-blue-700 font-medium mb-1">
                  Countries Visited
                </h3>
                <p className="text-3xl font-bold">{uniqueCountries}</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-amber-100/20">
                <h3 className="text-blue-700 font-medium mb-1">Categories</h3>
                <p className="text-3xl font-bold">
                  {Object.keys(categoriesCount).length}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Add Memory Button */}
      <button
        onClick={toggleAddMemory}
        className="fixed bottom-6 right-6 z-20 md:hidden p-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-blue-500/40 transition-all"
      >
        <IconPlus />
      </button>

      {/* Add/Edit Memory Modal */}
      {isAddMemoryOpen && (
        <AddMemory
          isOpen={isAddMemoryOpen}
          onClose={toggleAddMemory}
          onSave={isEditMode ? handleUpdateMemory : handleCreateMemory}
          memory={selectedMemory}
          isEdit={isEditMode}
        />
      )}
    </div>
  );
};

export default Memories;
