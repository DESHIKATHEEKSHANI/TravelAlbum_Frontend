import React, { useState, useEffect } from "react";

const Stories = () => {
  // Sample stories data - in a real app, this would come from an API call
  const [stories, setStories] = useState([
    {
      id: 1,
      author: "Alex Miller",
      title: "Backpacking Through Southeast Asia",
      location: "Thailand, Vietnam, Cambodia",
      excerpt: "Three months of adventure, cultural immersion, and unforgettable experiences across Southeast Asia.",
      image: "/assests/southeast-asia.jpg",
      likes: 243,
      comments: 42,
      date: "March 15, 2024"
    },
    {
      id: 2,
      author: "Sophia Chen",
      title: "Solo Journey Across Europe",
      location: "France, Italy, Spain",
      excerpt: "Discovering myself while exploring the historic cities and scenic landscapes of Western Europe.",
      image: "/assests/europe-trip.jpg",
      likes: 187,
      comments: 31,
      date: "April 2, 2024"
    },
    {
      id: 3,
      author: "James Wilson",
      title: "African Safari Adventures",
      location: "Kenya, Tanzania",
      excerpt: "Witnessing the majestic wildlife and breathtaking sunsets of the African savanna.",
      image: "/assests/safari.jpg",
      likes: 312,
      comments: 57,
      date: "February 24, 2024"
    },
    {
      id: 4,
      author: "Elena Rodriguez",
      title: "Spiritual Journey Through India",
      location: "Varanasi, Rishikesh, Dharamshala",
      excerpt: "Finding inner peace and spiritual connections in the sacred sites of northern India.",
      image: "/assests/india.jpg",
      likes: 176,
      comments: 29,
      date: "January 10, 2024"
    }
  ]);

  const [featuredStory, setFeaturedStory] = useState(null);
  const [filter, setFilter] = useState("popular");

  // Set the first story as featured on component mount
  useEffect(() => {
    if (stories.length > 0) {
      setFeaturedStory(stories[0]);
    }
  }, []);

  // Handle story click to set as featured
  const handleStoryClick = (story) => {
    setFeaturedStory(story);
  };

  // Filter stories
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    // In a real app, you would fetch filtered stories from an API
    // For demo purposes, we'll just simulate filtering
    if (newFilter === "recent") {
      setStories([...stories].sort((a, b) => new Date(b.date) - new Date(a.date)));
    } else if (newFilter === "popular") {
      setStories([...stories].sort((a, b) => b.likes - a.likes));
    }
  };

  // Handle like action
  const handleLike = (id) => {
    const updatedStories = stories.map(story => {
      if (story.id === id) {
        return { ...story, likes: story.likes + 1 };
      }
      return story;
    });
    
    setStories(updatedStories);
    
    // Update featured story if it was liked
    if (featuredStory && featuredStory.id === id) {
      setFeaturedStory({ ...featuredStory, likes: featuredStory.likes + 1 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-600 to-cyan-400 text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="bg-white/20 text-xs px-4 py-1.5 rounded-full font-medium tracking-wide">
            TRAVEL STORIES
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200">
              Inspiration from
            </span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-100">
              Fellow Explorers
            </span>
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Dive into captivating travel narratives from adventurers around the globe. Get inspired, share your own stories, and connect with a community of passionate travelers.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center space-x-4 mb-12">
          <button 
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === 'popular' ? 'bg-amber-100/20 text-white' : 'bg-transparent text-white/70 hover:text-white'}`}
            onClick={() => handleFilterChange('popular')}
          >
            Popular
          </button>
          <button 
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === 'recent' ? 'bg-amber-100/20 text-white' : 'bg-transparent text-white/70 hover:text-white'}`}
            onClick={() => handleFilterChange('recent')}
          >
            Recent
          </button>
          <button 
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === 'following' ? 'bg-amber-100/20 text-white' : 'bg-transparent text-white/70 hover:text-white'}`}
            onClick={() => handleFilterChange('following')}
          >
            Following
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Story - Large Display */}
          {featuredStory && (
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 shadow-xl transform transition-all hover:scale-[1.01]">
              <div className="relative h-96">
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${featuredStory.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100/20 flex items-center justify-center mr-3">
                      {featuredStory.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{featuredStory.author}</p>
                      <p className="text-sm text-white/70">{featuredStory.date}</p>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-2">{featuredStory.title}</h2>
                  <p className="text-white/80 mb-4">{featuredStory.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="bg-amber-50/10 backdrop-blur-sm text-xs px-3 py-1 rounded-full flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {featuredStory.location}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button 
                        className="flex items-center space-x-1 text-white/70 hover:text-white transition-all"
                        onClick={() => handleLike(featuredStory.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span>{featuredStory.likes}</span>
                      </button>
                      <div className="flex items-center space-x-1 text-white/70">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span>{featuredStory.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  {["adventure", "backpacking", "culture", "foodie", "photography"].map((tag) => (
                    <span key={tag} className="bg-amber-50/10 text-xs px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-white/80 mb-6">
                  {featuredStory.excerpt} As I ventured through the bustling markets of Bangkok, the serene temples of Chiang Mai, and the pristine beaches of Phuket, I discovered not just the beauty of these places but also the warmth of the local people who welcomed me with open arms.
                </p>
                
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center space-x-2">
                  <span>Read Full Story</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          {/* Stories List */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xl font-bold mb-4">More Stories</h3>
            
            {stories.filter(story => !featuredStory || story.id !== featuredStory.id).slice(0, 3).map((story) => (
              <div 
                key={story.id}
                className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 cursor-pointer transform transition-all hover:scale-[1.02]"
                onClick={() => handleStoryClick(story)}
              >
                <div className="flex">
                  <div 
                    className="w-24 h-24 bg-cover bg-center"
                    style={{ backgroundImage: `url(${story.image})` }}
                  ></div>
                  <div className="p-4 flex-1">
                    <h4 className="font-bold text-lg mb-1">{story.title}</h4>
                    <p className="text-white/70 text-sm mb-2">{story.location}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/60">{story.author}</span>
                      <div className="flex items-center space-x-3">
                        <button 
                          className="flex items-center space-x-1 text-white/70 hover:text-white transition-all"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(story.id);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                          <span>{story.likes}</span>
                        </button>
                        <div className="flex items-center space-x-1 text-white/70">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                          <span>{story.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <button className="w-full bg-amber-50/10 px-6 py-3 rounded-full font-medium hover:bg-amber-50/20 transition-all text-center">
              View All Stories
            </button>
            
            {/* Share Your Story CTA */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl p-6 mt-8 border border-amber-100/10">
              <h3 className="font-bold text-xl mb-3">Share Your Adventure</h3>
              <p className="text-white/80 text-sm mb-4">
                Have an amazing travel experience? Let the community know about your journey!
              </p>
              <button className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-blue-900 font-medium px-6 py-3 rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14"></path>
                  <path d="M5 12h14"></path>
                </svg>
                <span>Create New Story</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center">
            <div className="text-4xl font-bold text-amber-200 mb-2">10,000+</div>
            <div className="text-white/70">Stories Shared</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center">
            <div className="text-4xl font-bold text-amber-200 mb-2">150+</div>
            <div className="text-white/70">Countries Covered</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center">
            <div className="text-4xl font-bold text-amber-200 mb-2">25,000+</div>
            <div className="text-white/70">Traveler Community</div>
          </div>
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-16 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-3">Get Travel Stories in Your Inbox</h3>
            <p className="text-white/70 mb-6">
              Subscribe to our newsletter and receive the best travel stories, tips, and exclusive destination guides.
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white focus:outline-none focus:border-amber-200/50"
              />
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;