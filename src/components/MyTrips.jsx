import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../AuthContext"; // Adjust the path to your AuthContext
import AddNewTrip from "./AddNewTrip";

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

// TripDetail component with improved date formatting and editing functionality
const TripDetail = ({ trip, onClose, onDelete, onUpdate }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTrip, setEditedTrip] = useState({
    ...trip,
    itinerary: trip.itinerary || [],
    packingList: trip.packingList || { essentials: [], clothing: [] }
  });
  const { token } = useAuth();

  // Helper function to properly format dates from ISO to YYYY-MM-DD
  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    // Check if this is a date string with timezone info
    if (typeof isoDate === 'string' && isoDate.includes('T')) {
      return isoDate.split('T')[0];
    }
    return isoDate;
  };

  // Helper function to display formatted dates
  const displayDate = (isoDate) => {
    if (!isoDate) return "";
    // If it's already a formatted date (YYYY-MM-DD), display it properly
    if (typeof isoDate === 'string' && !isoDate.includes('T')) {
      const dateParts = isoDate.split('-');
      const year = dateParts[0];
      const month = parseInt(dateParts[1]) - 1; // Month is 0-indexed in JavaScript
      const day = dateParts[2];
      const date = new Date(year, month, day);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
    
    // Handle ISO date strings
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Initialize edited trip when trip changes
  useEffect(() => {
    setEditedTrip({
      ...trip,
      itinerary: trip.itinerary || [],
      packingList: trip.packingList || { essentials: [], clothing: [] }
    });
  }, [trip]);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/trips/${trip.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(editedTrip)
      });

      if (response.ok) {
        const updatedTrip = await response.json();
        onUpdate(updatedTrip);
        setIsEditing(false);
      } else {
        console.error("Failed to update trip");
      }
    } catch (error) {
      console.error("Error updating trip:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/trips/${trip.id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          onDelete(trip.id);
        } else {
          console.error("Failed to delete trip");
        }
      } catch (error) {
        console.error("Error deleting trip:", error);
      }
    }
  };

  // Add new accommodation to the list
  const addNewAccommodation = () => {
    const newAccommodation = {
      name: "New Accommodation",
      address: "Address",
      checkIn: formatDate(new Date().toISOString()),
      checkOut: formatDate(new Date().toISOString())
    };
    
    setEditedTrip({
      ...editedTrip,
      accommodations: [...(editedTrip.accommodations || []), newAccommodation]
    });
  };

  // Remove accommodation from the list
  const removeAccommodation = (index) => {
    const updatedAccommodations = [...editedTrip.accommodations];
    updatedAccommodations.splice(index, 1);
    setEditedTrip({...editedTrip, accommodations: updatedAccommodations});
  };

  // Add new day to itinerary
  const addNewDay = () => {
    const newDay = {
      date: formatDate(new Date().toISOString()),
      activities: []
    };
    
    setEditedTrip({
      ...editedTrip,
      itinerary: [...(editedTrip.itinerary || []), newDay]
    });
  };

  // Add new activity to a day
  const addNewActivity = (dayIndex) => {
    const newActivity = {
      time: "12:00",
      name: "New Activity",
      description: "Description"
    };
    
    const updatedItinerary = [...editedTrip.itinerary];
    updatedItinerary[dayIndex].activities.push(newActivity);
    
    setEditedTrip({...editedTrip, itinerary: updatedItinerary});
  };

  // Remove activity from a day
  const removeActivity = (dayIndex, activityIndex) => {
    const updatedItinerary = [...editedTrip.itinerary];
    updatedItinerary[dayIndex].activities.splice(activityIndex, 1);
    
    setEditedTrip({...editedTrip, itinerary: updatedItinerary});
  };

  // Remove day from itinerary
  const removeDay = (dayIndex) => {
    const updatedItinerary = [...editedTrip.itinerary];
    updatedItinerary.splice(dayIndex, 1);
    
    setEditedTrip({...editedTrip, itinerary: updatedItinerary});
  };

  // Add new item to a packing list category
  const addPackingItem = (category) => {
    const updatedPackingList = {...(editedTrip.packingList || {})};
    if (!updatedPackingList[category]) {
      updatedPackingList[category] = [];
    }
    updatedPackingList[category].push("New Item");
    
    setEditedTrip({...editedTrip, packingList: updatedPackingList});
  };

  // Remove item from packing list
  const removePackingItem = (category, index) => {
    const updatedPackingList = {...editedTrip.packingList};
    updatedPackingList[category].splice(index, 1);
    
    // If the category is now empty, initialize it as an empty array
    if (!updatedPackingList[category]) {
      updatedPackingList[category] = [];
    }
    
    setEditedTrip({...editedTrip, packingList: updatedPackingList});
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-amber-100/20">
      <div className="relative">
        <img
          src={trip.imageUrl || "/placeholder-image.jpg"}
          alt={trip.destination}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 text-white w-full">
            {isEditing ? (
              <input
                type="text"
                value={editedTrip.destination}
                onChange={(e) => setEditedTrip({...editedTrip, destination: e.target.value})}
                className="text-2xl font-bold bg-transparent border-b border-white w-full"
              />
            ) : (
              
              <h2 className="text-2xl font-bold">{trip.destination}</h2>
            )}
            <div className="flex items-center mt-2">
              <IconCalendar />
              {isEditing ? (
                <div className="ml-2">
                  <input
                    type="date"
                    value={formatDate(editedTrip.startDate)}
                    onChange={(e) => setEditedTrip({...editedTrip, startDate: e.target.value})}
                    className="text-sm bg-transparent border-b border-white"
                  />
                  <span> to </span>
                  <input
                    type="date"
                    value={formatDate(editedTrip.endDate)}
                    onChange={(e) => setEditedTrip({...editedTrip, endDate: e.target.value})}
                    className="text-sm bg-transparent border-b border-white"
                  />
                </div>
              ) : (
                <span className="ml-2 text-sm">
                  {displayDate(trip.startDate)} - {displayDate(trip.endDate)}
                </span>
              )}
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
            {isEditing ? (
              <div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <span><IconClock /></span>
                    <h3 className="text-sm font-medium text-blue-600 mb-2">Duration</h3>
                    <input
                      type="number"
                      value={editedTrip.duration}
                      onChange={(e) => setEditedTrip({...editedTrip, duration: e.target.value})}
                      className="text-lg font-semibold text-blue-800 bg-transparent border-b border-blue-200"
                    />
                    <span className="text-blue-800 ml-1">days</span>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-600 mb-2">Budget</h3>
                    <span className="text-blue-800">$</span>
                    <input
                      type="number"
                      value={editedTrip.budget}
                      onChange={(e) => setEditedTrip({...editedTrip, budget: e.target.value})}
                      className="text-lg font-semibold text-blue-800 bg-transparent border-b border-blue-200"
                    />
                  </div>
                </div>
                
                <h3 className="font-medium text-blue-800 mb-2">Description</h3>
                <textarea
                  value={editedTrip.description}
                  onChange={(e) => setEditedTrip({...editedTrip, description: e.target.value})}
                  className="text-blue-600 mb-6 w-full border border-blue-200 rounded p-2"
                  rows="3"
                />
              </div>
            ) : (
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
              </div>
            )}
            
            <h3 className="font-medium text-blue-800 mb-2">Accommodations</h3>
            <div className="mb-6">
              {(editedTrip.accommodations || []).map((accommodation, index) => (
                <div key={index} className="border-b border-blue-100 py-2 last:border-b-0">
                  {isEditing ? (
                    <div>
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          value={accommodation.name}
                          onChange={(e) => {
                            const updatedAccommodations = [...editedTrip.accommodations];
                            updatedAccommodations[index].name = e.target.value;
                            setEditedTrip({...editedTrip, accommodations: updatedAccommodations});
                          }}
                          className="font-medium border-b border-blue-200 w-full mr-2"
                        />
                        <button 
                          onClick={() => removeAccommodation(index)}
                          className="text-red-500 hover:text-red-700 flex items-center"
                        >
                          <IconTrash /><span className="ml-1">Remove</span>
                        </button>
                      </div>
                      <input
                        type="text"
                        value={accommodation.address}
                        onChange={(e) => {
                          const updatedAccommodations = [...editedTrip.accommodations];
                          updatedAccommodations[index].address = e.target.value;
                          setEditedTrip({...editedTrip, accommodations: updatedAccommodations});
                        }}
                        className="text-sm text-blue-600 w-full border-b border-blue-200 mt-1"
                      />
                      <div className="flex items-center mt-2 space-x-2">
                        <div className="flex items-center">
                          <label className="text-sm text-blue-500 mr-1">Check-in:</label>
                          <input
                            type="date"
                            value={formatDate(accommodation.checkIn)}
                            onChange={(e) => {
                              const updatedAccommodations = [...editedTrip.accommodations];
                              updatedAccommodations[index].checkIn = e.target.value;
                              setEditedTrip({...editedTrip, accommodations: updatedAccommodations});
                            }}
                            className="text-sm border border-blue-200 rounded p-1"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="text-sm text-blue-500 mr-1">Check-out:</label>
                          <input
                            type="date"
                            value={formatDate(accommodation.checkOut)}
                            onChange={(e) => {
                              const updatedAccommodations = [...editedTrip.accommodations];
                              updatedAccommodations[index].checkOut = e.target.value;
                              setEditedTrip({...editedTrip, accommodations: updatedAccommodations});
                            }}
                            className="text-sm border border-blue-200 rounded p-1"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="font-medium">{accommodation.name}</p>
                      <p className="text-sm text-blue-600">{accommodation.address}</p>
                      <div className="flex items-center mt-1 text-sm text-blue-500">
                        <IconCalendar />
                        <span className="ml-1">
                          {displayDate(accommodation.checkIn)} - {displayDate(accommodation.checkOut)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              ))}
              
              {isEditing && (
                <button 
                  onClick={addNewAccommodation}
                  className="mt-2 text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <IconPlus />
                  <span className="ml-1">Add Accommodation</span>
                </button>
              )}
            </div>
            
            <div className="flex space-x-4">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all flex items-center"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={() => {
                      setEditedTrip({
                        ...trip,
                        itinerary: trip.itinerary || [],
                        packingList: trip.packingList || { essentials: [], clothing: [] }
                      });
                      setIsEditing(false);
                    }}
                    className="px-4 py-2 border border-gray-500 text-gray-500 rounded-full hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all flex items-center"
                  >
                    <IconEdit /><span className="ml-1">Edit Trip</span>
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="px-4 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition-all flex items-center"
                  >
                    <IconTrash /><span className="ml-1">Delete</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === "itinerary" && (
          <div>
            {isEditing ? (
              <div>
                {(editedTrip.itinerary || []).map((day, dayIndex) => (
                  <div key={dayIndex} className="mb-6 last:mb-0 border border-blue-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">
                          {dayIndex + 1}
                        </div>
                        <h3 className="font-medium text-blue-800">
                          Day {dayIndex + 1}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="date"
                          value={formatDate(day.date)}
                          onChange={(e) => {
                            const updatedItinerary = [...editedTrip.itinerary];
                            updatedItinerary[dayIndex].date = e.target.value;
                            setEditedTrip({...editedTrip, itinerary: updatedItinerary});
                          }}
                          className="border border-blue-200 rounded p-1 text-sm"
                        />
                        <button 
                          onClick={() => removeDay(dayIndex)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          {/* IconTrash will be added by you */}
                          Remove Day
                        </button>
                      </div>
                    </div>
                    
                    {day.activities.map((activity, actIndex) => (
                      <div 
                        key={actIndex}
                        className="ml-11 border-l border-blue-200 pl-4 pb-4 last:pb-0 relative"
                      >
                        <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-blue-200"></div>
                        <div className="flex items-start justify-between">
                          <div className="flex-grow">
                            <div className="flex items-center mb-1">
                              {/* IconClock will be added by you */}
                              <input
                                type="time"
                                value={activity.time}
                                onChange={(e) => {
                                  const updatedItinerary = [...editedTrip.itinerary];
                                  updatedItinerary[dayIndex].activities[actIndex].time = e.target.value;
                                  setEditedTrip({...editedTrip, itinerary: updatedItinerary});
                                }}
                                className="ml-2 border border-blue-200 rounded p-1 text-sm"
                              />
                            </div>
                            <input
                              type="text"
                              value={activity.name}
                              onChange={(e) => {
                                const updatedItinerary = [...editedTrip.itinerary];
                                updatedItinerary[dayIndex].activities[actIndex].name = e.target.value;
                                setEditedTrip({...editedTrip, itinerary: updatedItinerary});
                              }}
                              className="font-medium border-b border-blue-200 w-full"
                            />
                            <textarea
                              value={activity.description}
                              onChange={(e) => {
                                const updatedItinerary = [...editedTrip.itinerary];
                                updatedItinerary[dayIndex].activities[actIndex].description = e.target.value;
                                setEditedTrip({...editedTrip, itinerary: updatedItinerary});
                              }}
                              className="text-sm text-blue-600 mt-1 w-full border border-blue-200 rounded p-1"
                              rows="2"
                            />
                          </div>
                          <button 
                            onClick={() => removeActivity(dayIndex, actIndex)}
                            className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
                          >
                            <IconTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <button 
                      onClick={() => addNewActivity(dayIndex)}
                      className="ml-11 mt-2 text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <IconPlus />
                      <span className="ml-1">Add Activity</span>
                    </button>
                  </div>
                ))}
                
                <button 
                  onClick={addNewDay}
                  className="mt-4 text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <IconPlus />
                  <span className="ml-1">Add Day</span>
                </button>
                
                <div className="mt-6 flex space-x-4">
                  <button 
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={() => {
                      setEditedTrip(trip);
                      setIsEditing(false);
                    }}
                    className="px-4 py-2 border border-gray-500 text-gray-500 rounded-full hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {(trip.itinerary || []).map((day, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">
                        {index + 1}
                      </div>
                      <h3 className="font-medium text-blue-800">
                        Day {index + 1} - {displayDate(day.date)}
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
                
                <button 
                  onClick={() => setIsEditing(true)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all flex items-center"
                >
                  <IconEdit />
                  <span className="ml-1">Edit Itinerary</span>
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "packing" && (
          <div>
            {isEditing ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-blue-800">Essentials</h3>
                      <button 
                        onClick={() => addPackingItem('essentials')}
                        className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                      >
                        <IconPlus />
                        <span className="ml-1">Add Item</span>
                      </button>
                    </div>
                    <ul className="space-y-2">
                      {(editedTrip.packingList?.essentials || []).map((item, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <div className="flex items-center flex-grow">
                            <input 
                              type="checkbox" 
                              id={`essential-${index}`} 
                              className="rounded text-blue-600 mr-2"
                            />
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => {
                                const updatedPackingList = {...editedTrip.packingList};
                                updatedPackingList.essentials[index] = e.target.value;
                                setEditedTrip({...editedTrip, packingList: updatedPackingList});
                              }}
                              className="border-b border-blue-200 text-blue-700 w-full"
                            />
                          </div>
                          <button 
                            onClick={() => removePackingItem('essentials', index)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <IconTrash />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-blue-800">Clothing</h3>
                      <button 
                        onClick={() => addPackingItem('clothing')}
                        className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                      >
                        <IconPlus/>
                        <span className="ml-1">Add Item</span>
                      </button>
                    </div>
                    <ul className="space-y-2">
                      {(editedTrip.packingList?.clothing || []).map((item, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <div className="flex items-center flex-grow">
                            <input 
                              type="checkbox" 
                              id={`clothing-${index}`} 
                              className="rounded text-blue-600 mr-2"
                            />
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => {
                                const updatedPackingList = {...editedTrip.packingList};
                                updatedPackingList.clothing[index] = e.target.value;
                                setEditedTrip({...editedTrip, packingList: updatedPackingList});
                              }}
                              className="border-b border-blue-200 text-blue-700 w-full"
                            />
                          </div>
                          <button 
                            onClick={() => removePackingItem('clothing', index)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <IconTrash />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-4">
                  <button 
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={() => {
                      setEditedTrip(trip);
                      setIsEditing(false);
                    }}
                    className="px-4 py-2 border border-gray-500 text-gray-500 rounded-full hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-blue-800 mb-3">Essentials</h3>
                    <ul className="space-y-2">
                      {(trip.packingList?.essentials || []).map((item, index) => (
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
                      {(trip.packingList?.clothing || []).map((item, index) => (
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
                
                <button 
                  onClick={() => setIsEditing(true)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all flex items-center"
                >
                  <span className="ml-1">Edit Packing List</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// TripsList component with date formatting
const TripsList = ({ trips, onTripClick }) => {
  // Helper function to display formatted dates
  const displayDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Helper to determine trip status
  const getTripStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end < now) return "Completed";
    if (start > now) return "Upcoming";
    return "Planning";
  };

  // Helper to get status color class
  const getStatusColorClass = (status) => {
    switch(status) {
      case "Completed": return "bg-gray-700/80";
      case "Upcoming": return "bg-green-600/80";
      case "Planning": return "bg-blue-600/80";
      default: return "bg-gray-600/80";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trips.map((trip) => {
        const status = getTripStatus(trip.startDate, trip.endDate);
        const statusColorClass = getStatusColorClass(status);
        
        return (
          <div
            key={trip.id}
            className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all border border-amber-100/20 group cursor-pointer"
            onClick={() => onTripClick(trip)}
          >
            <div className="relative overflow-hidden">
              <img
                src={trip.imageUrl || "/placeholder-image.jpg"}
                alt={trip.destination}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <div className="text-white">
              
                  <h3 className="font-bold text-lg">{trip.destination}</h3>
                  <div className="flex items-center text-sm mt-1 opacity-90">
                  <span><IconCalendar /></span>
                    <span className="ml-1">
                      {displayDate(trip.startDate)} - {displayDate(trip.endDate)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className={`absolute top-3 right-3 ${statusColorClass} text-white text-xs font-medium px-2 py-1 rounded`}>
                {status}
              </div>
            </div>
            <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center text-blue-600">
              <span><IconMap /></span>
              <span className="ml-1 text-sm font-medium">{trip.destination}</span>
            </div>
            <span className="text-sm text-blue-800 font-medium">{trip.duration} days</span>
          </div>
          <p className="text-sm text-blue-600/70 line-clamp-2">
            {trip.description}
          </p>
        </div>
          </div>
        );
      })}
    </div>
  );
};

// EmptyState component
const EmptyState = ({ onAddTrip }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
      <span className="text-blue-600 text-xl"><IconMap /></span>
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

// AddTripButton component
const AddTripButton = ({ onClick }) => (
  <div className="flex justify-center my-6">
    <button
      onClick={onClick}
      className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all"
    >
      <span><IconPlus /></span>
      <span className="ml-2">Add New Trip</span>
    </button>
  </div>
);

// Main MyTrips component
const MyTrips = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [showAddNewTrip, setShowAddNewTrip] = useState(false);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchTrips = async () => {
      if (!user || !token) return;
      
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/trips?username=${user}&filter=${filterType}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setTrips(data);
        } else {
          console.error("Failed to fetch trips");
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [user, token, filterType]);

  const handleTripClick = (trip) => {
    setSelectedTrip(trip);
  };

  const handleCloseTrip = () => {
    setSelectedTrip(null);
  };

  const handleAddNewTripClick = () => {
    setShowAddNewTrip(true);
  };

  const handleCloseAddNewTrip = () => {
    setShowAddNewTrip(false);
  };

  const handleTripCreated = (newTrip) => {
    setTrips([...trips, newTrip]);
    setShowAddNewTrip(false);
  };

  const handleDeleteTrip = (tripId) => {
    setTrips(trips.filter(trip => trip.id !== tripId));
    setSelectedTrip(null);
  };

  const handleUpdateTrip = (updatedTrip) => {
    setTrips(trips.map(trip => trip.id === updatedTrip.id ? updatedTrip : trip));
    setSelectedTrip(updatedTrip);
  };

  // Filter trips based on selected filter
  const getFilteredTrips = () => {
    if (filterType === "all") return trips;
    
    const now = new Date();
    return trips.filter(trip => {
      const startDate = new Date(trip.startDate);
      const endDate = new Date(trip.endDate);
      
      if (filterType === "upcoming") return startDate > now;
      if (filterType === "past") return endDate < now;
      if (filterType === "planning") return startDate <= now && endDate >= now;
      return true;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (showAddNewTrip) {
    return <AddNewTrip onClose={handleCloseAddNewTrip} onSave={handleTripCreated} />;
  }

  const filteredTrips = getFilteredTrips();

  return (
    <div>
      {selectedTrip ? (
        <TripDetail 
          trip={selectedTrip} 
          onClose={handleCloseTrip}
          onDelete={handleDeleteTrip}
          onUpdate={handleUpdateTrip}
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
            <EmptyState onAddTrip={handleAddNewTripClick} />
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
              <AddTripButton onClick={handleAddNewTripClick} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MyTrips;