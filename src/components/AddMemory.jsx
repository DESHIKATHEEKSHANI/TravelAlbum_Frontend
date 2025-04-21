import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";

// Icon components
const IconMap = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="10" r="3"></circle>
    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"></path>
  </svg>
);

const IconCalendar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const IconImage = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

const IconX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);

const IconUpload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const IconLoading = () => (
  <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
  </svg>
);

const AddMemory = ({ isOpen, onClose, username }) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    location: "",
    date: "",
    description: "",
    image: null,
    imagePreview: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.image) {
      setError("Please upload an image");
      return;
    }
    if (!formData.location || !formData.date || !formData.description) {
      setError("Please fill all required fields");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      if (!token) {
        throw new Error("Authentication token not found - please login again");
      }
      
      const data = new FormData();
      data.append("file", formData.image); // Note: backend expects "file" not "image"
      data.append("username", username);
      data.append("location", formData.location);
      data.append("date", formData.date);
      data.append("description", formData.description);
      
      // Log FormData contents for debugging
      for (let [key, value] of data.entries()) {
        console.log(key, value);
      }
      
      const response = await axios.post(
        "http://localhost:8080/api/memory-upload", 
        data,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      
      console.log("Memory created successfully:", response.data);
      
      // Reset form
      setFormData({
        location: "",
        date: "",
        description: "",
        image: null,
        imagePreview: null
      });
      
      onClose();
      
      // Optionally refresh the page to show new memory
      window.location.reload();
      
    } catch (err) {
      console.error("Error creating memory:", err);
      setError(
        err.response?.data?.message || 
        err.message || 
        "Failed to upload memory. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white/90 backdrop-blur-md rounded-lg shadow-xl w-full max-w-md overflow-hidden border border-amber-100/20 z-10">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-amber-100/20">
          <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Add New Memory
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition-all"
            disabled={isLoading}
          >
            <IconX />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            {/* Location input */}
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-600">
                  <IconMap />
                </div>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Paris, France"
                  className="w-full pl-10 pr-4 py-2 bg-blue-50/50 border border-blue-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            {/* Date input */}
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-600">
                  <IconCalendar />
                </div>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 bg-blue-50/50 border border-blue-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            {/* Description input */}
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your travel memory..."
                rows="3"
                className="w-full p-3 bg-blue-50/50 border border-blue-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
                disabled={isLoading}
              ></textarea>
            </div>
            
            {/* Image upload */}
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Upload Image
              </label>
              <div className="flex items-center justify-center w-full">
                {formData.imagePreview ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <img 
                      src={formData.imagePreview} 
                      alt="Memory Preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, image: null, imagePreview: null})}
                      className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all"
                      disabled={isLoading}
                    >
                      <IconX />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-200 border-dashed rounded-lg cursor-pointer bg-blue-50/50 hover:bg-blue-100/50 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <IconImage className="w-10 h-10 mb-3 text-blue-500" />
                      <p className="mb-2 text-sm text-blue-700">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-blue-500">
                        PNG, JPG or WEBP (Max. 5MB)
                      </p>
                    </div>
                    <input 
                      type="file" 
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={isLoading}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
          
          {/* Submit button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? (
                <IconLoading className="mr-2" />
              ) : (
                <IconUpload className="mr-2" />
              )}
              {isLoading ? "Uploading..." : "Save Memory"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemory;