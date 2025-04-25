import React from "react";

const Features = () => {
  // Feature sections data
  const featureSections = [
    {
      id: "memories",
      title: "Preserve Your Travel Memories",
      description: "Automatically organize and enhance your travel photos with AI-powered tools that recognize landmarks and suggest smart categorization.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      ),
      features: [
        {
          title: "Smart Photo Organization",
          description: "Our AI automatically categorizes your photos by location, landmarks, and activities."
        },
        {
          title: "Landmark Recognition",
          description: "Instantly identify famous landmarks and points of interest in your photos."
        },
        {
          title: "Timeline Creation",
          description: "Create beautiful chronological timelines of your journeys with automatic date sorting."
        }
      ]
    },
    {
      id: "planning",
      title: "Plan Your Next Adventure",
      description: "Discover new destinations, create detailed itineraries, and get personalized recommendations based on your travel preferences.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
      features: [
        {
          title: "Itinerary Builder",
          description: "Create day-by-day plans with activities, accommodation, and transportation details."
        },
        {
          title: "Budget Tracker",
          description: "Set travel budgets and track expenses by category for better financial planning."
        },
        {
          title: "Weather Forecasts",
          description: "Get accurate weather predictions for your destinations to pack appropriately."
        }
      ]
    },
    {
      id: "sharing",
      title: "Share Your Experiences",
      description: "Create beautiful travel stories and share them with friends, family, or the TravelScape community.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
          <polyline points="16 6 12 2 8 6"></polyline>
          <line x1="12" y1="2" x2="12" y2="15"></line>
        </svg>
      ),
      features: [
        {
          title: "Interactive Maps",
          description: "Create shareable maps that showcase your entire journey with photos attached to locations."
        },
        {
          title: "Story Templates",
          description: "Choose from beautiful templates to create engaging travel narratives with minimal effort."
        },
        {
          title: "Social Integration",
          description: "Share your travel stories directly to social media or via private links with selected contacts."
        }
      ]
    },
    {
      id: "ai",
      title: "AI Travel Assistant",
      description: "Get personalized recommendations and assistance with our AI-powered travel companion.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
      features: [
        {
          title: "Smart Recommendations",
          description: "Get destination suggestions based on your travel history and preferences."
        },
        {
          title: "Local Insights",
          description: "Discover hidden gems and local favorites with AI-curated recommendations."
        },
        {
          title: "Trip Optimization",
          description: "Optimize your itineraries for time, cost, and experience with smart suggestions."
        }
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 min-h-screen py-16 px-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <span className="bg-white/20 text-xs px-4 py-1.5 rounded-full font-medium tracking-wide">
          FEATURES
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-amber-200">
          Everything You Need For Your Travel Journey
        </h2>
        <p className="mt-4 text-lg text-white/80 max-w-3xl mx-auto">
          From planning your next adventure to preserving and sharing your memories,
          our platform provides powerful tools for every step of your travel experience.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto">
        {featureSections.map((section, index) => (
          <div 
            key={section.id}
            className={`mb-24 flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}
          >
            {/* Feature visualization/image */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="relative w-full max-w-md mx-auto">
                {/* Decorative background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-xl blur-xl"></div>
                
                {/* Feature showcase card */}
                <div className="relative bg-gradient-to-br from-blue-700 to-blue-800 border border-white/10 rounded-xl p-8 backdrop-blur-sm overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-300/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl"></div>
                  
                  {/* Icon */}
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg inline-flex mb-6 text-white">
                    {section.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{section.title}</h3>
                  <p className="text-white/80 mb-8">{section.description}</p>
                  
                  {/* Feature demonstration visualization would go here */}
                  <div className="h-48 bg-gradient-to-br from-blue-800/50 to-blue-900/50 rounded-lg border border-white/10 flex items-center justify-center">
                    <span className="text-white/50">Feature visualization</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature details */}
            <div className="md:w-1/2 px-4">
              <h3 className="text-3xl font-bold mb-6 text-white">{section.title}</h3>
              <p className="text-lg text-white/80 mb-8">{section.description}</p>
              
              <div className="space-y-6">
                {section.features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <div className="bg-amber-400/20 p-2 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-200">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{feature.title}</h4>
                      <p className="text-white/70 mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all border border-white/10 flex items-center space-x-2">
                <span>Explore {section.title.split(' ')[0]} Features</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto mt-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-400/20 rounded-xl blur-2xl"></div>
        <div className="relative bg-gradient-to-br from-blue-800 to-blue-900 border border-white/10 rounded-xl p-10 backdrop-blur-sm text-center">
          <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-200">
            Ready to Transform Your Travel Experience?
          </h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who are using TravelScape to capture, organize, and share their adventures in beautiful new ways.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all">
              Get Started For Free
            </button>
            <button className="border border-white/20 bg-white/5 px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials - Brief section */}
      <div className="max-w-6xl mx-auto mt-24 text-center">
        <h3 className="text-2xl font-bold mb-12 text-white">Loved by travelers worldwide</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-blue-800/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center mb-4 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FCD34D" stroke="#FCD34D" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
              <p className="text-white/80 italic mb-4">
                "TravelScape has completely changed how I document my trips. The AI features are incredible!"
              </p>
              <p className="font-bold text-white">- Happy Traveler {i}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;