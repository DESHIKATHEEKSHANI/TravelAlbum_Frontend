import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./login";
import Register from "./Register";
import Features from "../components/Features";
import Destinations from "../components/Destinations";
import Stories from "../components/Stories";
import { useAuth } from "../AuthContext";
import AboutUs from "../components/AboutUs";

const Home = () => {
  const [authMode, setAuthMode] = useState(null);
  const [activeSection, setActiveSection] = useState("home"); 
  const navigate = useNavigate();
  const { user, logout, role} = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);

  const handleDashboardClick = () => {
    if (role === "ADMIN") {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  const handleSignInClick = () => {
    setAuthMode("login");
  };

  const handleCreateAccountClick = () => {
    setAuthMode("register");
  };

  const handleToggleAuth = (mode) => {
    setAuthMode(mode);
  };

  const handleAuthSuccess = () => {
    setAuthMode(null);
  };

  const closeAuth = () => {
    setAuthMode(null);
  };

  const handleNavigate = (section) => {
    setActiveSection(section);
    setAuthMode(null); 
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-600 to-cyan-400 text-white overflow-hidden relative">
      {activeSection === "home" && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <video
            className="absolute min-w-full min-h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/assests/bgVideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Navigation Bar - Pass user and methods from AuthContext */}
      <Navbar 
        onSignInClick={handleSignInClick} 
        user={user} 
        logout={logout} 
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Render appropriate section based on activeSection state */}
      {activeSection === "home" ? (
        /* Hero Section */
        <div className="relative px-6 py-16 md:py-28 max-w-7xl mx-auto z-10">
          {/* Floating decorative elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl"></div>
          <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl"></div>

          <div className="flex flex-col md:flex-row items-center">
            {/* Left side: Hero content or Auth component */}
            <div className="md:w-1/2 z-10">
              {authMode === "login" ? (
                <Login 
                  onToggleAuth={handleToggleAuth} 
                  onClose={closeAuth}
                  onLoginSuccess={handleAuthSuccess} // Pass the success handler
                />
              ) : authMode === "register" ? (
                <Register 
                  onToggleAuth={handleToggleAuth} 
                  onClose={closeAuth}
                />
              ) : (
                // Default hero content when not showing auth
                <>
                  <div className="flex items-center mb-6">
                    <span className="bg-white/20 text-xs px-4 py-1.5 rounded-full mr-3 font-medium tracking-wide">
                      TRAVEL MEMORIES
                    </span>
                    <span className="text-amber-200 animate-pulse">✈️</span>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200">
                      Your Adventures,
                    </span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-100">
                      Perfectly Preserved
                    </span>
                  </h1>

                  <p className="mb-8 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
                    Transform your travel photos into stunning visual stories with
                    our AI-powered platform. Automatic landmark recognition, smart
                    categorization, and beautiful layouts that bring your journeys
                    to life.
                  </p>

                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                    {!user ? (
                      <button
                        className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center space-x-3"
                        onClick={handleCreateAccountClick}
                      >
                        <span>Create Free Account</span>
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
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </button>
                    ) : (
                      <button
                        className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center space-x-3"
                        onClick={handleDashboardClick}
                      >
                        <span>Go to Dashboard</span>
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
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                      </button>
                    )}

                    <button 
                      className="border border-amber-200/30 bg-amber-50/10 px-8 py-4 rounded-full font-medium hover:bg-amber-50/20 transition-all flex items-center justify-center space-x-3"
                      onClick={() => handleNavigate('features')}
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
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      <span>Explore Features</span>
                    </button>
                  </div>

                  <div className="mt-10 flex items-center space-x-4 text-sm text-white/60">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((item) => (
                        <div
                          key={item}
                          className="w-8 h-8 rounded-full bg-amber-50/10 border-2 border-amber-100/20 flex items-center justify-center"
                        >
                          {item === 4 ? (
                            <span className="text-xs">+2.4k</span>
                          ) : (
                            <span className="text-xs">
                              {String.fromCodePoint(0x1f1f1 + item)}
                            </span> // Country flag emojis
                          )}
                        </div>
                      ))}
                    </div>
                    <div>
                      Trusted by <span className="text-amber-200">travelers</span>{" "}
                      worldwide
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Right side: 3D Travel Card Showcase (only show when not in auth mode) */}
            {(
              <div className="md:w-1/2 mt-16 md:mt-0 flex justify-center relative">
                <div className="relative w-72 h-96 md:w-96 md:h-[28rem] perspective-1000">
                  {/* Card shadow */}
                  <div className="absolute inset-0 bg-black/20 rounded-2xl shadow-xl transform rotate-3 translate-x-6 translate-y-6"></div>

                  {/* Back card - Sri Lankan Mountain */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-2xl backdrop-blur-sm border border-white/10 transform -rotate-2 -translate-x-2 translate-y-4 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-30"
                      style={{
                        backgroundImage: "url('/assests/ella-rock.jpg')",
                      }}
                    ></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="font-bold text-white">
                        Ella Rock, Sri Lanka
                      </h3>
                      <p className="text-sm text-white/80 mt-1">
                        Central Highlands • 76 photos
                      </p>
                    </div>
                  </div>

                  {/* Main card - Beach */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl backdrop-blur-sm border border-amber-100/20 shadow-lg overflow-hidden transform rotate-1">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: "url('/assests/unawatuna-beach.jpg')",
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start">
                      <span className="bg-amber-50/10 backdrop-blur-sm text-xs px-3 py-1 rounded-full">
                        Featured Album
                      </span>
                      <button className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="12" cy="5" r="1"></circle>
                          <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-bold text-white text-xl">
                        Unawatuna Beach
                      </h3>
                      <p className="text-sm text-white/80 mt-1">
                        Southern Sri Lanka • 94 photos
                      </p>
                      <div className="mt-4 flex space-x-3">
                        <span className="bg-amber-50/10 backdrop-blur-sm text-xs px-3 py-1 rounded-full">
                          #srilanka
                        </span>
                        <span className="bg-amber-50/10 backdrop-blur-sm text-xs px-3 py-1 rounded-full">
                          #paradise
                        </span>
                        <span className="bg-amber-50/10 backdrop-blur-sm text-xs px-3 py-1 rounded-full">
                          #tropical
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Decorative footer elements */}
          <div className="absolute bottom-8 left-8 text-xs opacity-40 font-mono hidden md:block">
            <div className="mb-1">TRAVELSCAPE v2.0</div>
            <div className="h-px w-16 bg-amber-100/40 mb-1"></div>
            <div>DESIGNED FOR EXPLORERS</div>
          </div>

          <div className="absolute bottom-8 right-8 text-xs opacity-40 font-mono hidden md:block">
            © 2024 TRAVELSCAPE INC
          </div>

          {!authMode && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-sm opacity-80 flex items-center animate-bounce">
              <span className="text-amber-100">SCROLL TO EXPLORE</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 text-amber-200"
              >
                <path d="M12 5v14"></path>
                <path d="M19 12l-7 7-7-7"></path>
              </svg>
            </div>
          )}
        </div>
      ) : activeSection === "features" ? (
        <Features />
      ) : activeSection === "destinations" ? (
        <Destinations />
      ): activeSection === "stories" ? (
        <Stories />
      ): activeSection === "about" ? (
        <AboutUs />
      )
      : null}
    </div>
  );
};

// Updated Navbar Component to handle active section
const Navbar = ({ onSignInClick, user, logout, activeSection, onNavigate }) => {
  // Array of navigation items
  const navItems = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "destinations", label: "Destinations" },
    { id: "stories", label: "Stories" },
    { id: "about", label: "About Us" },
  ];

  return (
    <nav className="flex items-center justify-between p-6 backdrop-blur-sm bg-blue-900/30 border-b border-amber-100/10 relative z-20">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate("home")}>
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
          className="text-amber-200"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-amber-100 to-amber-300">
          TravelScape
        </span>
      </div>

      <div className="hidden md:flex space-x-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`relative group ${
              activeSection === item.id ? "text-white" : "text-white/80 hover:text-white"
            } transition-all`}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
            <span 
              className={`absolute bottom-0 left-0 h-0.5 bg-amber-200 transition-all duration-300 
                ${activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"}`}
            ></span>
          </button>
        ))}
      </div>

      {user ? (
        <div className="flex items-center space-x-4">
          <span className="text-white">Welcome, {user}</span>
          <button 
            onClick={logout}
            className="bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-red-500/30 transition-all flex items-center space-x-2"
          >
            <span>Logout</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      ) : (
        <button
          onClick={onSignInClick}
          className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-blue-600/30 transition-all flex items-center space-x-2 border border-amber-100/10"
        >
          <span>Sign In</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
          </svg>
        </button>
      )}
    </nav>
  );
};

export default Home;