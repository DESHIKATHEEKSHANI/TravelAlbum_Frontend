import React, { useState } from "react";
import { useAuth } from "../AuthContext";

// Icon components
const IconSave = () => (
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
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
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

const IconBell = () => (
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
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
  </svg>
);

const IconShield = () => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const IconGlobe = () => (
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
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const IconTheme = () => (
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
    <circle cx="12" cy="12" r="5"></circle>
    <path d="M12 1v2"></path>
    <path d="M12 21v2"></path>
    <path d="M4.22 4.22l1.42 1.42"></path>
    <path d="M18.36 18.36l1.42 1.42"></path>
    <path d="M1 12h2"></path>
    <path d="M21 12h2"></path>
    <path d="M4.22 19.78l1.42-1.42"></path>
    <path d="M18.36 5.64l1.42-1.42"></path>
  </svg>
);

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    fullName: user || "Travel Enthusiast",
    email: "user@example.com",
    bio: "Passionate traveler exploring the world one destination at a time.",
    profilePicture: null,
    notifications: {
      email: true,
      push: true,
      tripReminders: true,
      newsletter: false,
    },
    privacy: {
      publicProfile: true,
      shareMemories: true,
      allowLocationTracking: false,
    },
    preferences: {
      language: "English",
      currency: "USD",
      distanceUnit: "Miles",
      theme: "Light",
    },
  });

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (category, setting) => {
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [setting]: !formData[category][setting],
      },
    });
  };

  // Handle select changes
  const handleSelectChange = (category, setting, value) => {
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [setting]: value,
      },
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        profilePicture: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  // Handle save settings
  const handleSave = (e) => {
    e.preventDefault();
    // Here you would typically send the updated settings to your backend
    alert("Settings saved successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-amber-100/20 overflow-hidden mb-8">
        <div className="md:flex">
          {/* Settings navigation sidebar */}
          <div className="md:w-64 bg-blue-50/50 border-r border-amber-100/20">
            <div className="p-4">
              <h2 className="font-semibold text-blue-800 mb-4">Settings</h2>
              <nav>
                <ul className="space-y-1">
                  <li>
                    <button
                      className={`flex items-center w-full p-2 rounded-lg transition-all ${
                        activeTab === "profile"
                          ? "bg-blue-600 text-white"
                          : "text-blue-800 hover:bg-blue-100"
                      }`}
                      onClick={() => setActiveTab("profile")}
                    >
                      <IconUser />
                      <span className="ml-3">Profile</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center w-full p-2 rounded-lg transition-all ${
                        activeTab === "notifications"
                          ? "bg-blue-600 text-white"
                          : "text-blue-800 hover:bg-blue-100"
                      }`}
                      onClick={() => setActiveTab("notifications")}
                    >
                      <IconBell />
                      <span className="ml-3">Notifications</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center w-full p-2 rounded-lg transition-all ${
                        activeTab === "privacy"
                          ? "bg-blue-600 text-white"
                          : "text-blue-800 hover:bg-blue-100"
                      }`}
                      onClick={() => setActiveTab("privacy")}
                    >
                      <IconShield />
                      <span className="ml-3">Privacy</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center w-full p-2 rounded-lg transition-all ${
                        activeTab === "preferences"
                          ? "bg-blue-600 text-white"
                          : "text-blue-800 hover:bg-blue-100"
                      }`}
                      onClick={() => setActiveTab("preferences")}
                    >
                      <IconGlobe />
                      <span className="ml-3">Preferences</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Settings content area */}
          <div className="flex-1 p-6">
            <form onSubmit={handleSave}>
              {/* Profile Settings */}
              {activeTab === "profile" && (
                <div>
                  <h3 className="text-xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600">
                    Profile Settings
                  </h3>

                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white">
                          {formData.profilePicture ? (
                            <img
                              src={formData.profilePicture}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <IconUser />
                          )}
                        </div>
                        <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-all shadow-md">
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
                            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                            <circle cx="12" cy="13" r="3"></circle>
                          </svg>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-blue-800">
                          Profile Picture
                        </h4>
                        <p className="text-sm text-blue-600/70">
                          Upload a profile picture to personalize your account
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block mb-2 text-sm font-medium text-blue-800"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-blue-100 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white/60"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-blue-800"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-blue-100 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white/60"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="bio"
                        className="block mb-2 text-sm font-medium text-blue-800"
                      >
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-2 rounded-lg border border-blue-100 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white/60"
                      ></textarea>
                      <p className="mt-1 text-sm text-blue-600/70">
                        Write a short bio about yourself as a traveler
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <div>
                  <h3 className="text-xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600">
                    Notification Settings
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-blue-800">
                          Email Notifications
                        </h4>
                        <p className="text-sm text-blue-600/70">
                          Receive trip updates and reminders via email
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={formData.notifications.email}
                          onChange={() =>
                            handleCheckboxChange("notifications", "email")
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-blue-800">
                          Push Notifications
                        </h4>
                        <p className="text-sm text-blue-600/70">
                          Receive push notifications on your device
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={formData.notifications.push}
                          onChange={() =>
                            handleCheckboxChange("notifications", "push")
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-blue-800">
                          Trip Reminders
                        </h4>
                        <p className="text-sm text-blue-600/70">
                          Get reminders before your upcoming trips
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={formData.notifications.tripReminders}
                          onChange={() =>
                            handleCheckboxChange(
                              "notifications",
                              "tripReminders"
                            )
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-blue-800">
                          Newsletter
                        </h4>
                        <p className="text-sm text-blue-600/70">
                          Receive our monthly travel inspiration newsletter
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={formData.notifications.newsletter}
                          onChange={() =>
                            handleCheckboxChange("notifications", "newsletter")
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeTab === "privacy" && (
                <div>
                  <h3 className="text-xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600">
                    Privacy Settings
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-blue-800">
                          Public Profile
                        </h4>
                        <p className="text-sm text-blue-600/70">
                          Make your profile visible to other travelers
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={formData.privacy.publicProfile}
                          onChange={() =>
                            handleCheckboxChange("privacy", "publicProfile")
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-blue-800">
                          Share Memories
                        </h4>
                        <p className="text-sm text-blue-600/70">
                          Allow your memories to be featured in the community
                          feed
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={formData.privacy.shareMemories}
                          onChange={() =>
                            handleCheckboxChange("privacy", "shareMemories")
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-blue-800">
                          Location Tracking
                        </h4>
                        <p className="text-sm text-blue-600/70">
                          Allow the app to track your location for trip features
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={formData.privacy.allowLocationTracking}
                          onChange={() =>
                            handleCheckboxChange(
                              "privacy",
                              "allowLocationTracking"
                            )
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-medium text-blue-800 mb-4">
                      Data Management
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      <button
                        type="button"
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all"
                      >
                        Download My Data
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all"
                      >
                        Delete My Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Settings */}
              {activeTab === "preferences" && (
                <div>
                  <h3 className="text-xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600">
                    Preferences
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="language"
                        className="block mb-2 text-sm font-medium text-blue-800"
                      >
                        Language
                      </label>
                      <select
                        id="language"
                        className="w-full px-4 py-2 rounded-lg border border-blue-100 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white/60"
                        value={formData.preferences.language}
                        onChange={(e) =>
                          handleSelectChange(
                            "preferences",
                            "language",
                            e.target.value
                          )
                        }
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Japanese">Japanese</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="currency"
                        className="block mb-2 text-sm font-medium text-blue-800"
                      >
                        Currency
                      </label>
                      <select
                        id="currency"
                        className="w-full px-4 py-2 rounded-lg border border-blue-100 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white/60"
                        value={formData.preferences.currency}
                        onChange={(e) =>
                          handleSelectChange(
                            "preferences",
                            "currency",
                            e.target.value
                          )
                        }
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="JPY">JPY (¥)</option>
                        <option value="CAD">CAD ($)</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="distanceUnit"
                        className="block mb-2 text-sm font-medium text-blue-800"
                      >
                        Distance Unit
                      </label>
                      <select
                        id="distanceUnit"
                        className="w-full px-4 py-2 rounded-lg border border-blue-100 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white/60"
                        value={formData.preferences.distanceUnit}
                        onChange={(e) =>
                          handleSelectChange(
                            "preferences",
                            "distanceUnit",
                            e.target.value
                          )
                        }
                      >
                        <option value="Miles">Miles</option>
                        <option value="Kilometers">Kilometers</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="theme"
                        className="block mb-2 text-sm font-medium text-blue-800"
                      >
                        Theme
                      </label>
                      <select
                        id="theme"
                        className="w-full px-4 py-2 rounded-lg border border-blue-100 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white/60"
                        value={formData.preferences.theme}
                        onChange={(e) =>
                          handleSelectChange(
                            "preferences",
                            "theme",
                            e.target.value
                          )
                        }
                      >
                        <option value="Light">Light</option>
                        <option value="Dark">Dark</option>
                        <option value="System">System Default</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-medium text-blue-800 mb-4">
                      App Appearance
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.preferences.theme === "Light"
                            ? "border-blue-600 bg-blue-50"
                            : "border-transparent bg-gray-50"
                        }`}
                        onClick={() =>
                          handleSelectChange("preferences", "theme", "Light")
                        }
                      >
                        <div className="mb-2 flex justify-center">
                          <IconTheme />
                        </div>
                        <p className="text-center text-sm font-medium">Light</p>
                      </div>

                      <div
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.preferences.theme === "Dark"
                            ? "border-blue-600 bg-blue-50"
                            : "border-transparent bg-gray-50"
                        }`}
                        onClick={() =>
                          handleSelectChange("preferences", "theme", "Dark")
                        }
                      >
                        <div className="mb-2 flex justify-center">
                          <IconTheme />
                        </div>
                        <p className="text-center text-sm font-medium">Dark</p>
                      </div>

                      <div
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.preferences.theme === "System"
                            ? "border-blue-600 bg-blue-50"
                            : "border-transparent bg-gray-50"
                        }`}
                        onClick={() =>
                          handleSelectChange("preferences", "theme", "System")
                        }
                      >
                        <div className="mb-2 flex justify-center">
                          <IconTheme />
                        </div>
                        <p className="text-center text-sm font-medium">
                          System
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save button (shown for all tabs) */}
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
                >
                  <IconSave />
                  <span className="ml-2">Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
