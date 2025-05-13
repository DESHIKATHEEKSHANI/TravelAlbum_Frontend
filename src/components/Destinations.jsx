import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Destinations = () => {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const sampleDestinations = [
      {
        id: 1,
        name: "Unawatuna Beach",
        region: "asia",
        country: "Sri Lanka",
        category: "beaches",
        rating: 4.8,
        imageUrl: "/assests/unawatuna-beach.jpg",
        savedCount: 2450,
        description: "Crystal clear waters and golden sands make this beach a paradise for travelers.",
        tags: ["beach", "tropical", "snorkeling"]
      },
      {
        id: 2,
        name: "Ella Rock",
        region: "asia",
        country: "Sri Lanka",
        category: "mountains",
        rating: 4.7,
        imageUrl: "/assests/ella-rock.jpg",
        savedCount: 1830,
        description: "Breathtaking mountain views and tea plantations surrounding this natural wonder.",
        tags: ["hiking", "nature", "viewpoint"]
      },
      {
        id: 3,
        name: "Santorini",
        region: "europe",
        country: "Greece",
        category: "islands",
        rating: 4.9,
        imageUrl: "/assests/santorini.jpg",
        savedCount: 3250,
        description: "White-washed buildings with blue domes overlooking the Aegean Sea.",
        tags: ["island", "sunset", "architecture"]
      },
      {
        id: 4,
        name: "Machu Picchu",
        region: "americas",
        country: "Peru",
        category: "historical",
        rating: 4.9,
        imageUrl: "/assests/machu-picchu.jpg",
        savedCount: 2950,
        description: "Ancient Incan citadel set against a breathtaking mountain backdrop.",
        tags: ["ruins", "historical", "hiking"]
      },
      {
        id: 5,
        name: "Serengeti National Park",
        region: "africa",
        country: "Tanzania",
        category: "wildlife",
        rating: 4.8,
        imageUrl: "/assests/serengeti.jpg",
        savedCount: 2150,
        description: "Home to the annual wildebeest migration and incredible wildlife experiences.",
        tags: ["safari", "wildlife", "photography"]
      },
      {
        id: 6,
        name: "Great Barrier Reef",
        region: "oceania",
        country: "Australia",
        category: "marine",
        rating: 4.7,
        imageUrl: "/assests/great-barrier-reef.jpg",
        savedCount: 2750,
        description: "World's largest coral reef system with incredible marine diversity.",
        tags: ["diving", "snorkeling", "marine life"]
      }
    ];

    setDestinations(sampleDestinations);
  }, []);

  const filteredDestinations = destinations.filter(dest => {
    const matchesRegion = selectedRegion === "all" || dest.region === selectedRegion;
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  const handleDestinationClick = (destId) => {
    console.log(`Navigate to destination ${destId}`);
    // navigate(`/destinations/${destId}`);
  };

  const handleSaveToPlanner = (destId, event) => {
    event.stopPropagation();
    console.log(`Saved destination ${destId} to planner`);
  };

  const regions = [
    { id: "all", name: "All Destinations" },
    { id: "asia", name: "Asia" },
    { id: "europe", name: "Europe" },
    { id: "americas", name: "Americas" },
    { id: "africa", name: "Africa" },
    { id: "oceania", name: "Oceania" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-blue-600 text-white pt-6 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Discover Amazing Destinations
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Explore beautiful places around the world, save them to your travel planner,
            and create unforgettable memories from these breathtaking locations.
          </p>
        </div>

        {/* Search and filter section */}
        <div className="mb-12">
          {/* Search bar */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search destinations, countries, or activities..."
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-full py-4 px-6 pl-12 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-amber-200/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          {/* Region filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {regions.map((region) => (
              <button
                key={region.id}
                className={`px-5 py-2 rounded-full transition-all ${
                  selectedRegion === region.id
                    ? "bg-amber-200 text-blue-900 font-medium"
                    : "bg-white/10 hover:bg-white/20"
                }`}
                onClick={() => setSelectedRegion(region.id)}
              >
                {region.name}
              </button>
            ))}
          </div>
        </div>

        {/* Destinations grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:shadow-lg hover:shadow-amber-200/10 transition-all cursor-pointer group"
              onClick={() => handleDestinationClick(destination.id)}
            >
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${destination.imageUrl})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                
                {/* Country badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/10 backdrop-blur-sm text-xs px-3 py-1 rounded-full">
                    {destination.country}
                  </span>
                </div>
                
                {/* Rating */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center bg-amber-400/90 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                      className="mr-1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    {destination.rating}
                  </div>
                </div>
                
                {/* Save button */}
                <button
                  className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 p-2 rounded-full group-hover:opacity-100 opacity-0 transition-opacity"
                  onClick={(e) => handleSaveToPlanner(destination.id, e)}
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
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{destination.name}</h3>
                <p className="text-white/80 mb-4">{destination.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-amber-50/10 backdrop-blur-sm text-xs px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                {/* Saved counter */}
                <div className="flex items-center text-sm text-white/60">
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
                    className="mr-2"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  Saved by {destination.savedCount.toLocaleString()} travelers
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto text-white/40 mb-4"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <h3 className="text-2xl font-bold mb-2">No destinations found</h3>
            <p className="text-white/60">
              Try adjusting your search or filters to find more destinations
            </p>
          </div>
        )}

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Want personalized destination recommendations?
            </h3>
            <p className="text-white/80 mb-6">
              Sign up for a free account to get AI-powered destination suggestions based on your
              travel preferences and past adventures.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all">
              Get Personalized Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;