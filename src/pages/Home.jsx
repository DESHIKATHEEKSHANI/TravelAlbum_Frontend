import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 text-white overflow-hidden">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-6 backdrop-blur-sm bg-white/5 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-300">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-cyan-500">
            TravelScape
          </span>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <button className="relative group text-white/80 hover:text-white transition-all">
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 group-hover:w-full transition-all duration-300"></span>
          </button>
          <button className="relative group text-white/80 hover:text-white transition-all">
            Destinations
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 group-hover:w-full transition-all duration-300"></span>
          </button>
          <button className="relative group text-white/80 hover:text-white transition-all">
            Stories
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 group-hover:w-full transition-all duration-300"></span>
          </button>
          <button className="relative group text-white/80 hover:text-white transition-all">
            About Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 group-hover:w-full transition-all duration-300"></span>
          </button>
        </div>
        
        <button className="bg-gradient-to-r from-cyan-400 to-cyan-500 px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center space-x-2">
          <span>Sign In</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
          </svg>
        </button>
      </nav>
      
      {/* Hero Section */}
      <div className="relative px-6 py-16 md:py-28 max-w-7xl mx-auto">
        {/* Floating decorative elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"></div>
        
        <div className="flex flex-col md:flex-row items-center z-10">
          <div className="md:w-1/2 z-10">
            <div className="flex items-center mb-6">
              <span className="bg-white/20 text-xs px-4 py-1.5 rounded-full mr-3 font-medium tracking-wide">
                TRAVEL MEMORIES
              </span>
              <span className="text-cyan-300 animate-pulse">✈️</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-200">
                Your Adventures,
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-cyan-400">
                Perfectly Preserved
              </span>
            </h1>
            
            <p className="mb-8 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
              Transform your travel photos into stunning visual stories with our AI-powered platform. 
              Automatic landmark recognition, smart categorization, and beautiful layouts that bring 
              your journeys to life.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-gradient-to-r from-cyan-400 to-cyan-500 px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center space-x-3">
                <span>Create Free Account</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
              
              <button className="border border-white/30 px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all flex items-center justify-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                <span>How It Works</span>
              </button>
            </div>
            
            <div className="mt-10 flex items-center space-x-4 text-sm text-white/60">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="w-8 h-8 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
                    {item === 4 ? (
                      <span className="text-xs">+2.4k</span>
                    ) : (
                      <span className="text-xs">{String.fromCodePoint(0x1f1f1 + item)}</span> // Country flag emojis
                    )}
                  </div>
                ))}
              </div>
              <div>
                Trusted by <span className="text-cyan-300">travelers</span> worldwide
              </div>
            </div>
          </div>
          
          {/* 3D Travel Card Showcase */}
          <div className="md:w-1/2 mt-16 md:mt-0 flex justify-center relative">
            <div className="relative w-72 h-96 md:w-96 md:h-[28rem] perspective-1000">
              {/* Card shadow */}
              <div className="absolute inset-0 bg-black/20 rounded-2xl shadow-xl transform rotate-3 translate-x-6 translate-y-6"></div>
              
              {/* Back card - Mountain */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl backdrop-blur-sm border border-white/10 transform -rotate-2 -translate-x-2 translate-y-4 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80')] bg-cover bg-center opacity-30"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="font-bold text-white">Swiss Alps</h3>
                  <p className="text-sm text-white/80 mt-1">Winter 2023 • 89 photos</p>
                </div>
              </div>
              
              {/* Main card - Beach */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl backdrop-blur-sm border border-white/20 shadow-lg overflow-hidden transform rotate-1">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=500&q=80')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start">
                  <span className="bg-white/10 backdrop-blur-sm text-xs px-3 py-1 rounded-full">Featured Album</span>
                  <button className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="12" cy="5" r="1"></circle>
                      <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-bold text-white text-xl">Maldives Beach</h3>
                  <p className="text-sm text-white/80 mt-1">Summer 2023 • 64 photos</p>
                  <div className="mt-4 flex space-x-3">
                    <span className="bg-white/10 backdrop-blur-sm text-xs px-3 py-1 rounded-full">#beach</span>
                    <span className="bg-white/10 backdrop-blur-sm text-xs px-3 py-1 rounded-full">#paradise</span>
                    <span className="bg-white/10 backdrop-blur-sm text-xs px-3 py-1 rounded-full">#vacation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative footer elements */}
        <div className="absolute bottom-8 left-8 text-xs opacity-40 font-mono hidden md:block">
          <div className="mb-1">TRAVELSCAPE v2.0</div>
          <div className="h-px w-16 bg-white mb-1"></div>
          <div>DESIGNED FOR EXPLORERS</div>
        </div>
        
        <div className="absolute bottom-8 right-8 text-xs opacity-40 font-mono hidden md:block">
          © 2024 TRAVELSCAPE INC
        </div>
        
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-sm opacity-60 flex items-center animate-bounce">
          SCROLL TO EXPLORE
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
            <path d="M12 5v14"></path>
            <path d="M19 12l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Home;