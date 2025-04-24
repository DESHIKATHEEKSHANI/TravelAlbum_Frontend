import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

// Re-using icons from the original code
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

const IconDollar = () => (
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
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
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

const IconCheck = () => (
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
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

// Packing list generator based on trip details
const generatePackingList = (destination, duration, startDate) => {
  // Parse start date to determine season (simplified)
  const month = new Date(startDate).getMonth();
  const isWinter = month >= 11 || month <= 1;
  const isSpring = month >= 2 && month <= 4;
  const isSummer = month >= 5 && month <= 7;
  const isFall = month >= 8 && month <= 10;
  
  // Basic essentials for any trip
  const essentials = [
    "Passport/ID",
    "Flight/travel tickets",
    "Hotel reservations",
    "Travel insurance documents",
    "Credit/debit cards",
    "Cash/local currency",
    "Phone & charger",
    "Power adapter",
    "Medications",
    "First aid kit",
    "Sunscreen",
    "Hand sanitizer",
    "Face masks"
  ];
  
  // Base clothing items
  let clothing = [
    "Underwear",
    "Socks",
    "T-shirts/tops",
    "Pants/jeans",
    "Pajamas",
    "Comfortable walking shoes"
  ];
  
  // Add clothing based on destination keywords
  const destinationLower = destination.toLowerCase();
  
  // Beach destination
  if (
    destinationLower.includes("beach") ||
    destinationLower.includes("island") ||
    destinationLower.includes("coast") ||
    destinationLower.includes("hawaii") ||
    destinationLower.includes("caribbean") ||
    destinationLower.includes("bali") ||
    destinationLower.includes("cancun")
  ) {
    clothing = clothing.concat([
      "Swimwear",
      "Beach towel",
      "Flip flops/sandals",
      "Sun hat",
      "Sunglasses",
      "Beach cover-up",
      "Light, breathable clothing"
    ]);
  }
  
  // City destination
  if (
    destinationLower.includes("city") ||
    destinationLower.includes("york") ||
    destinationLower.includes("london") ||
    destinationLower.includes("paris") ||
    destinationLower.includes("tokyo") ||
    destinationLower.includes("rome") ||
    destinationLower.includes("barcelona")
  ) {
    clothing = clothing.concat([
      "Smart casual outfits",
      "Comfortable walking shoes",
      "One formal outfit",
      "Crossbody bag/anti-theft backpack",
      "Light jacket/blazer"
    ]);
  }
  
  // Mountain/hiking destination
  if (
    destinationLower.includes("mountain") ||
    destinationLower.includes("alps") ||
    destinationLower.includes("hiking") ||
    destinationLower.includes("trek") ||
    destinationLower.includes("national park") ||
    destinationLower.includes("colorado") ||
    destinationLower.includes("switzerland")
  ) {
    clothing = clothing.concat([
      "Hiking boots",
      "Moisture-wicking shirts",
      "Hiking pants/shorts",
      "Thick socks",
      "Insulated jacket",
      "Rain jacket",
      "Hat with brim",
      "Gloves",
      "Backpack"
    ]);
  }
  
  // Season-specific clothing
  if (isWinter) {
    clothing = clothing.concat([
      "Heavy coat/jacket",
      "Sweaters/thermals",
      "Warm hat",
      "Gloves/mittens",
      "Scarf",
      "Warm socks",
      "Boots"
    ]);
  } else if (isSpring || isFall) {
    clothing = clothing.concat([
      "Light jacket/cardigan",
      "Light sweaters",
      "Layers for changing temperatures",
      "Light scarf",
      "Umbrella/rain jacket"
    ]);
  } else if (isSummer) {
    clothing = clothing.concat([
      "Shorts",
      "Lightweight dresses/skirts",
      "Sleeveless tops",
      "Light, breathable clothing",
      "Sun hat",
      "Sunglasses",
      "Sandals"
    ]);
  }
  
  // Long trip extras
  if (duration > 7) {
    essentials.push("Laundry bag");
    essentials.push("Travel-size laundry detergent");
  }
  
  return {
    essentials,
    clothing: [...new Set(clothing)] // Remove duplicates
  };
};

const AddNewTrip = ({ onCancel }) => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const initialFormState = {
    destination: "",
    startDate: "",
    endDate: "",
    duration: 7,
    budget: 1000,
    description: "",
    username: user,
    accommodations: [{ name: "", address: "", checkIn: "", checkOut: "" }],
    imageUrl: null,
    packingList: {
      essentials: [],
      clothing: []
    },
    status: "PLANNING"
  };

  const [formData, setFormData] = useState(initialFormState);
  
  const resetForm = () => {
    setFormData(initialFormState);
    setSelectedImage(null);
    setImagePreview(null);
    setActiveStep(1);
  };
  // Calculate duration when dates change
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setFormData(prev => ({
        ...prev,
        duration: diffDays
      }));
    }
  }, [formData.startDate, formData.endDate]);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle accommodation changes
  const handleAccommodationChange = (index, field, value) => {
    const updatedAccommodations = [...formData.accommodations];
    updatedAccommodations[index] = {
      ...updatedAccommodations[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      accommodations: updatedAccommodations
    }));
  };
  
  // Add new accommodation
  const addAccommodation = () => {
    setFormData(prev => ({
      ...prev,
      accommodations: [
        ...prev.accommodations,
        { name: "", address: "", checkIn: "", checkOut: "" }
      ]
    }));
  };
  
  // Remove accommodation
  const removeAccommodation = (index) => {
    const updatedAccommodations = [...formData.accommodations];
    updatedAccommodations.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      accommodations: updatedAccommodations
    }));
  };
  
  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Generate packing list based on trip details
  const handleGeneratePackingList = () => {
    if (!formData.destination || !formData.startDate) {
      setError("Destination and start date are required to generate a packing list");
      return;
    }
    
    const packingList = generatePackingList(
      formData.destination,
      formData.duration,
      formData.startDate
    );
    
    setFormData(prev => ({
      ...prev,
      packingList
    }));
  };
  
  // Submit trip to backend
  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let createdTrip;
      
      // Update status based on date
      const now = new Date();
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      let status = "PLANNING";
      if (startDate <= now && endDate >= now) {
        status = "ACTIVE";
      } else if (endDate < now) {
        status = "COMPLETED";
      } else if (startDate > now) {
        status = "UPCOMING";
      }

      const packingListItems = [
        ...formData.packingList.essentials.map(item => ({
          name: item.replace("✓ ", ""),
          category: "ESSENTIALS",
          packed: item.startsWith("✓ ")
        })),
        ...formData.packingList.clothing.map(item => ({
          name: item.replace("✓ ", ""),
          category: "CLOTHING",
          packed: item.startsWith("✓ ")
        }))
      ];
      
      const tripData = {
        ...formData,
        status,
        username: user,
        startDate: formData.startDate,
        endDate: formData.endDate,
        packingList: {
          essentials: formData.packingList.essentials,
          clothing: formData.packingList.clothing
        },
        // Ensure accommodations are properly formatted
        accommodations: formData.accommodations.map(acc => ({
          ...acc,
          checkIn: acc.checkIn || formData.startDate,
          checkOut: acc.checkOut || formData.endDate
        }))
      };
      
      if (selectedImage) {
        // If we have an image, use the with-image endpoint
        const formPayload = new FormData();
        formPayload.append("file", selectedImage);
        
        // Convert tripDTO to JSON and append
        const tripDtoBlob = new Blob([JSON.stringify(tripData)], {
          type: 'application/json'
        });
        formPayload.append("tripDTO", tripDtoBlob);
        
        const response = await fetch("http://localhost:8080/api/trips/with-image", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: formPayload
        });
        
        if (!response.ok) {
          throw new Error(`Failed to create trip: ${response.status}`);
        }
        
        createdTrip = await response.json();
        console.log("Trip created successfully:", createdTrip);
      
      // Show success message and reset form
      setSaveSuccess(true);
      resetForm();
      setTimeout(() => {
        navigate(`/trips/${createdTrip.id}`);
      }, 1500);
      } else {
        // If no image, use the regular endpoint
        const response = await fetch("http://localhost:8080/api/trips", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(tripData)
        });
        
        if (!response.ok) {
          throw new Error(`Failed to create trip: ${response.status}`);
        }
        
        createdTrip = await response.json();
      }
      
      console.log("Trip created successfully:", createdTrip);
      
      // Show success message
      setSaveSuccess(true);
      
      // Navigate after a short delay to allow user to see success message
      setTimeout(() => {
        navigate(`/trips/${createdTrip.id}`);
      }, 1500);
    } catch (error) {
      console.error("Error saving trip:", error);
      setError(error.message || "Failed to save trip. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Navigation between steps
  const nextStep = () => {
    if (activeStep === 2) {
      // Generate packing list before moving to step 3
      handleGeneratePackingList();
    }
    setActiveStep(activeStep + 1);
  };
  
  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };
  
  // Custom checkbox component with stop propagation to prevent event bubbling
  const Checkbox = ({ label, checked, onChange }) => {
    const handleClick = (e) => {
      e.stopPropagation();
      onChange();
    };
    
    return (
      <label className="flex items-center py-1 cursor-pointer group">
        <div
          className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
            checked ? 'bg-blue-600 border-blue-600' : 'border-blue-300 group-hover:border-blue-500'
          }`}
          onClick={handleClick}
        >
          {checked && <IconCheck />}
        </div>
        <span className="text-blue-700">{label}</span>
      </label>
    );
  };
  
  // Toggle item in packing list - fixed to ensure state updates properly
  const togglePackingItem = (category, index) => {
    const updatedList = [...formData.packingList[category]];
    const currentItem = updatedList[index];
    updatedList[index] = currentItem.startsWith("✓ ") 
      ? currentItem.substring(2) 
      : "✓ " + currentItem;
    
    setFormData(prev => ({
      ...prev,
      packingList: {
        ...prev.packingList,
        [category]: updatedList
      }
    }));
  };
  
  // Add custom item to packing list
  const [newItem, setNewItem] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("essentials");
  
  const addCustomItem = () => {
    if (newItem.trim()) {
      setFormData(prev => ({
        ...prev,
        packingList: {
          ...prev.packingList,
          [newItemCategory]: [...prev.packingList[newItemCategory], newItem.trim()]
        }
      }));
      setNewItem("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={onCancel}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <IconArrowLeft className="mr-1" />
            <span>Back</span>
          </button>
          <h2 className="text-2xl font-bold text-center text-blue-800">Add New Trip</h2>
          <div className="w-16"></div> {/* Spacer for alignment */}
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 border border-red-200">
            {error}
          </div>
        )}
        
        {saveSuccess && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 border border-green-200">
            Trip saved successfully! Redirecting to trip details...
          </div>
        )}
        
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-blue-200 -z-10"></div>
          {[1, 2, 3].map((step) => (
            <div 
              key={step}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === activeStep 
                  ? "bg-blue-600 text-white" 
                  : step < activeStep 
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-600 border-2 border-blue-200"
              }`}
            >
              {step < activeStep ? <IconCheck /> : step}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-2 text-sm">
          <span className={activeStep >= 1 ? "text-blue-600 font-medium" : "text-blue-400"}>
            Trip Details
          </span>
          <span className={activeStep >= 2 ? "text-blue-600 font-medium" : "text-blue-400"}>
            Accommodations
          </span>
          <span className={activeStep >= 3 ? "text-blue-600 font-medium" : "text-blue-400"}>
            Packing List
          </span>
        </div>
      </div>
      
      {/* Step 1: Basic Trip Details */}
      {activeStep === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-blue-700 font-medium mb-2">
                Destination
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-blue-500">
                  <IconMap />
                </span>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g. Paris, France"
                  className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-blue-700 font-medium mb-2">
                Budget ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-blue-500">
                  <IconDollar />
                </span>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  min="0"
                  className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-blue-700 font-medium mb-2">
                Start Date
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-blue-500">
                  <IconCalendar />
                </span>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-blue-700 font-medium mb-2">
                End Date
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-blue-500">
                  <IconCalendar />
                </span>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={formData.startDate}
                  className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-blue-700 font-medium mb-2">
              Trip Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your trip plans and goals..."
              className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
            />
          </div>
          
          <div>
            <label className="block text-blue-700 font-medium mb-2">
              Trip Image (Optional)
            </label>
            <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 text-center">
              {imagePreview ? (
                <div className="mb-3">
                  <img 
                    src={imagePreview} 
                    alt="Trip preview" 
                    className="h-40 mx-auto object-cover rounded"
                  />
                  <button 
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                    }}
                    className="mt-2 text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="text-blue-400 mb-3">
                  Upload an image for your trip
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="trip-image"
              />
              <label
                htmlFor="trip-image"
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 cursor-pointer inline-block"
              >
                {imagePreview ? "Change Image" : "Select Image"}
              </label>
            </div>
          </div>
        </div>
      )}
      
      {/* Step 2: Accommodations */}
      {activeStep === 2 && (
        <div>
          <h3 className="font-medium text-blue-800 mb-4">Where are you staying?</h3>
          
          {formData.accommodations.map((accommodation, index) => (
            <div key={index} className="p-4 border border-blue-100 rounded-lg mb-4 bg-blue-50">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-blue-700">Accommodation {index + 1}</h4>
                {formData.accommodations.length > 1 && (
                  <button 
                    onClick={() => removeAccommodation(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-blue-700 text-sm mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={accommodation.name}
                    onChange={(e) => handleAccommodationChange(index, "name", e.target.value)}
                    placeholder="Hotel, Airbnb, etc."
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-blue-700 text-sm mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={accommodation.address}
                    onChange={(e) => handleAccommodationChange(index, "address", e.target.value)}
                    placeholder="Street address, city, country"
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-blue-700 text-sm mb-1">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={accommodation.checkIn}
                    onChange={(e) => handleAccommodationChange(index, "checkIn", e.target.value)}
                    min={formData.startDate}
                    max={formData.endDate}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-blue-700 text-sm mb-1">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={accommodation.checkOut}
                    onChange={(e) => handleAccommodationChange(index, "checkOut", e.target.value)}
                    min={accommodation.checkIn || formData.startDate}
                    max={formData.endDate}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button
            onClick={addAccommodation}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <span className="mr-1">+</span> Add Another Accommodation
          </button>
        </div>
      )}
      
      {/* Step 3: Packing List */}
      {activeStep === 3 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-blue-800">Your Packing List</h3>
            <button
              onClick={handleGeneratePackingList}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Re-generate List
            </button>
          </div>
          
          <div className="text-sm text-blue-600 mb-4">
            We've generated a custom packing list based on your destination and trip dates. Feel free to add or remove items as needed.
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Essentials</h4>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-2">
                {formData.packingList.essentials.length > 0 ? (
                  formData.packingList.essentials.map((item, index) => (
                    <div key={index} className="mb-1 last:mb-0">
                      <Checkbox
                        label={item.replace("✓ ", "")}
                        checked={item.startsWith("✓ ")}
                        onChange={() => togglePackingItem("essentials", index)}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-blue-400">No essential items added yet.</div>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Clothing</h4>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-2">
                {formData.packingList.clothing.length > 0 ? (
                  formData.packingList.clothing.map((item, index) => (
                    <div key={index} className="mb-1 last:mb-0">
                      <Checkbox
                        label={item.replace("✓ ", "")}
                        checked={item.startsWith("✓ ")}onChange={() => togglePackingItem("clothing", index)}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-blue-400">No clothing items added yet.</div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-blue-700 mb-2">Add Custom Item</h4>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Enter custom item..."
                  className="flex-1 px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value)}
                  className="px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="essentials">Essentials</option>
                  <option value="clothing">Clothing</option>
                </select>
                <button
                  onClick={addCustomItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          {activeStep > 1 ? (
            <button
              onClick={prevStep}
              className="px-6 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-all"
            >
              Back
            </button>
          ) : (
            <button
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-500 rounded-lg hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          )}
          
          {activeStep < 3 ? (
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              disabled={activeStep === 1 && (!formData.destination || !formData.startDate || !formData.endDate)}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Trip"}
            </button>
          )}
        </div>
        
        {/* Error display at bottom if needed */}
        {error && activeStep === 3 && (
          <div className="mt-4 bg-red-50 text-red-700 p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}
      </div>
    );
  };
  
  export default AddNewTrip;