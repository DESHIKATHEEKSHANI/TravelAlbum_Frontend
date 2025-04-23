import React, { useState } from "react";

// Icon components
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

const IconClock = () => (
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
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const IconArrowLeft = () => (
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
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
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

const IconEdit = () => (
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
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const IconTrash = () => (
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
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const TripDetail = ({ trip, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-amber-100/20">
      <div className="relative">
        <img
          src={trip.image}
          alt={trip.destination}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 text-white w-full">
            <h2 className="text-2xl font-bold">{trip.destination}</h2>
            <div className="flex items-center mt-2">
              <IconCalendar />
              <span className="ml-2 text-sm">
                {trip.startDate} - {trip.endDate}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 left-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
        >
          <IconArrowLeft />
        </button>
      </div>

      <div className="p-6">
        <div className="flex border-b border-blue-100 mb-4">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "overview"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-blue-400 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "itinerary"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-blue-400 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("itinerary")}
          >
            Itinerary
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "packing"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-blue-400 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("packing")}
          >
            Packing List
          </button>
        </div>

        {activeTab === "overview" && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-600 mb-2">Duration</h3>
                <p className="text-lg font-semibold text-blue-800">{trip.duration} days</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-600 mb-2">Budget</h3>
                <p className="text-lg font-semibold text-blue-800">${trip.budget}</p>
              </div>
            </div>
            
            <h3 className="font-medium text-blue-800 mb-2">Description</h3>
            <p className="text-blue-600 mb-6">{trip.description}</p>
            
            <h3 className="font-medium text-blue-800 mb-2">Accommodations</h3>
            <div className="mb-6">
              {trip.accommodations.map((accommodation, index) => (
                <div key={index} className="border-b border-blue-100 py-2 last:border-b-0">
                  <p className="font-medium">{accommodation.name}</p>
                  <p className="text-sm text-blue-600">{accommodation.address}</p>
                  <div className="flex items-center mt-1 text-sm text-blue-500">
                    <IconCalendar />
                    <span className="ml-1">
                      {accommodation.checkIn} - {accommodation.checkOut}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all flex items-center">
                <IconEdit className="mr-2" />
                Edit Trip
              </button>
              <button className="px-4 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition-all flex items-center">
                <IconTrash className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        )}

        {activeTab === "itinerary" && (
          <div>
            {trip.itinerary.map((day, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">
                    {index + 1}
                  </div>
                  <h3 className="font-medium text-blue-800">
                    Day {index + 1} - {day.date}
                  </h3>
                </div>
                
                {day.activities.map((activity, actIndex) => (
                  <div 
                    key={actIndex}
                    className="ml-11 border-l border-blue-200 pl-4 pb-4 last:pb-0 relative"
                  >
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-blue-200"></div>
                    <div className="flex items-start">
                      <div className="flex items-center text-blue-600 mr-2">
                        <IconClock />
                      </div>
                      <div>
                        <p className="text-sm text-blue-600">{activity.time}</p>
                        <p className="font-medium">{activity.name}</p>
                        <p className="text-sm text-blue-600 mt-1">{activity.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {activeTab === "packing" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-blue-800 mb-3">Essentials</h3>
                <ul className="space-y-2">
                  {trip.packingList.essentials.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`essential-${index}`} 
                        className="rounded text-blue-600 mr-2"
                      />
                      <label htmlFor={`essential-${index}`} className="text-blue-700">
                        {item}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-blue-800 mb-3">Clothing</h3>
                <ul className="space-y-2">
                  {trip.packingList.clothing.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`clothing-${index}`} 
                        className="rounded text-blue-600 mr-2"
                      />
                      <label htmlFor={`clothing-${index}`} className="text-blue-700">
                        {item}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AddTripButton = ({ onClick }) => (
  <div className="flex justify-center my-6">
    <button
      onClick={onClick}
      className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all"
    >
      <IconPlus className="mr-2" />
      <span>Add New Trip</span>
    </button>
  </div>
);

const TripsList = ({ trips, onTripClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {trips.map((trip) => (
      <div
        key={trip.id}
        className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all border border-amber-100/20 group cursor-pointer"
        onClick={() => onTripClick(trip)}
      >
        <div className="relative overflow-hidden">
          <img
            src={trip.image}
            alt={trip.destination}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <div className="text-white">
              <h3 className="font-bold text-lg">{trip.destination}</h3>
              <div className="flex items-center text-sm mt-1 opacity-90">
                <IconCalendar className="mr-1" />
                <span>
                  {trip.startDate} - {trip.endDate}
                </span>
              </div>
            </div>
          </div>
          
          {trip.isPast ? (
            <div className="absolute top-3 right-3 bg-gray-700/80 text-white text-xs font-medium px-2 py-1 rounded">
              Completed
            </div>
          ) : trip.isUpcoming ? (
            <div className="absolute top-3 right-3 bg-green-600/80 text-white text-xs font-medium px-2 py-1 rounded">
              Upcoming
            </div>
          ) : (
            <div className="absolute top-3 right-3 bg-blue-600/80 text-white text-xs font-medium px-2 py-1 rounded">
              Planning
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center text-blue-600">
              <IconMap className="mr-1" />
              <span className="text-sm font-medium">{trip.destination}</span>
            </div>
            <span className="text-sm text-blue-800 font-medium">{trip.duration} days</span>
          </div>
          <p className="text-sm text-blue-600/70 line-clamp-2">
            {trip.description}
          </p>
        </div>
      </div>
    ))}
  </div>
);

const EmptyState = ({ onAddTrip }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
      <IconMap className="text-blue-600 w-10 h-10" />
    </div>
    <h3 className="text-xl font-medium text-blue-800 mb-2">No trips yet</h3>
    <p className="text-blue-600 mb-6 max-w-md">
      Start planning your next adventure by adding your first trip
    </p>
    <button
      onClick={onAddTrip}
      className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
    >
      Add Your First Trip
    </button>
  </div>
);

const MyTrips = ({ trips: propTrips, onAddTrip }) => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [filterType, setFilterType] = useState("all");
  
  // Sample trip data if not provided from props
  const defaultTrips = [
    {
      id: 1,
      destination: "Barcelona, Spain",
      startDate: "May 15, 2025",
      endDate: "May 22, 2025",
      duration: 7,
      budget: 2500,
      isUpcoming: true,
      isPast: false,
      image: "/api/placeholder/300/200",
      description: "Exploring the vibrant culture, architecture, and beaches of Barcelona. A week of tapas, Gaudí, and Mediterranean vibes.",
      accommodations: [
        {
          name: "Hotel Arts Barcelona",
          address: "Marina 19-21, 08005 Barcelona, Spain",
          checkIn: "May 15, 2025",
          checkOut: "May 22, 2025"
        }
      ],
      itinerary: [
        {
          date: "May 15, 2025",
          activities: [
            {
              time: "10:00 AM",
              name: "Arrival & Check-in",
              description: "Arrive at Barcelona El Prat Airport and check in to Hotel Arts"
            },
            {
              time: "2:00 PM",
              name: "La Rambla Stroll",
              description: "Take a leisurely walk down Barcelona's famous boulevard"
            },
            {
              time: "7:00 PM",
              name: "Tapas Dinner",
              description: "Traditional Spanish tapas at El Xampanyet"
            }
          ]
        },
        {
          date: "May 16, 2025",
          activities: [
            {
              time: "9:30 AM",
              name: "Sagrada Familia",
              description: "Guided tour of Gaudí's masterpiece"
            },
            {
              time: "2:00 PM",
              name: "Park Güell",
              description: "Explore the famous park with mosaic works"
            },
            {
              time: "8:00 PM",
              name: "Paella Dinner",
              description: "Authentic paella at Barraca beachfront restaurant"
            }
          ]
        }
      ],
      packingList: {
        essentials: [
          "Passport",
          "Flight tickets",
          "Hotel reservation",
          "Travel insurance",
          "Credit cards",
          "Euros",
          "Power adapter",
          "Medications"
        ],
        clothing: [
          "T-shirts",
          "Shorts",
          "Light jacket",
          "Swimwear",
          "Walking shoes",
          "Sandals",
          "Hat",
          "Sunglasses"
        ]
      }
    },
    {
      id: 2,
      destination: "Tokyo, Japan",
      startDate: "September 10, 2025",
      endDate: "September 20, 2025",
      duration: 10,
      budget: 4000,
      isUpcoming: false,
      isPast: false,
      image: "/api/placeholder/300/200",
      description: "Immersing in the unique blend of tradition and futuristic technology. From ancient temples to neon-lit streets.",
      accommodations: [
        {
          name: "Shibuya Excel Hotel Tokyu",
          address: "1-12-2 Dogenzaka, Shibuya-ku, Tokyo",
          checkIn: "September 10, 2025",
          checkOut: "September 20, 2025"
        }
      ],
      itinerary: [],
      packingList: {
        essentials: [],
        clothing: []
      }
    },
    {
      id: 3,
      destination: "Rome, Italy",
      startDate: "March 5, 2025",
      endDate: "March 12, 2025",
      duration: 7,
      budget: 2200,
      isUpcoming: false,
      isPast: true,
      image: "/api/placeholder/300/200",
      description: "A week in the Eternal City exploring ancient ruins, Renaissance art, and enjoying the best Italian cuisine.",
      accommodations: [
        {
          name: "Hotel Artemide",
          address: "Via Nazionale, 22, 00184 Roma RM, Italy",
          checkIn: "March 5, 2025",
          checkOut: "March 12, 2025"
        }
      ],
      itinerary: [],
      packingList: {
        essentials: [],
        clothing: []
      }
    }
  ];
  
  const trips = propTrips || defaultTrips;
  
  // Handle trip selection
  const handleTripClick = (trip) => {
    setSelectedTrip(trip);
  };
  
  // Close trip detail view
  const handleCloseTrip = () => {
    setSelectedTrip(null);
  };
  
  // Filter trips based on selected filter
  const filteredTrips = trips.filter(trip => {
    if (filterType === "upcoming") return trip.isUpcoming;
    if (filterType === "past") return trip.isPast;
    if (filterType === "planning") return !trip.isUpcoming && !trip.isPast;
    return true; // "all" filter
  });

  return (
    <div>
      {selectedTrip ? (
        <TripDetail 
          trip={selectedTrip} 
          onClose={handleCloseTrip} 
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <button
                className={`px-3 py-1 rounded-full ${
                  filterType === "all"
                    ? "bg-blue-600 text-white"
                    : "text-blue-600 hover:bg-blue-50"
                } transition-all`}
                onClick={() => setFilterType("all")}
              >
                All Trips
              </button>
              <button
                className={`px-3 py-1 rounded-full ${
                  filterType === "upcoming"
                    ? "bg-blue-600 text-white"
                    : "text-blue-600 hover:bg-blue-50"
                } transition-all`}
                onClick={() => setFilterType("upcoming")}
              >
                Upcoming
              </button>
              <button
                className={`px-3 py-1 rounded-full ${
                  filterType === "planning"
                    ? "bg-blue-600 text-white"
                    : "text-blue-600 hover:bg-blue-50"
                } transition-all`}
                onClick={() => setFilterType("planning")}
              >
                Planning
              </button>
              <button
                className={`px-3 py-1 rounded-full ${
                  filterType === "past"
                    ? "bg-blue-600 text-white"
                    : "text-blue-600 hover:bg-blue-50"
                } transition-all`}
                onClick={() => setFilterType("past")}
              >
                Past
              </button>
            </div>
          </div>
          
          {trips.length === 0 ? (
            <EmptyState onAddTrip={onAddTrip} />
          ) : (
            <>
              <TripsList 
                trips={filteredTrips} 
                onTripClick={handleTripClick} 
              />
              {filteredTrips.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-blue-600">No trips found with the selected filter.</p>
                </div>
              )}
              <AddTripButton onClick={onAddTrip} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MyTrips;