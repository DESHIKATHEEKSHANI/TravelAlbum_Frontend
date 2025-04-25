import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-800 min-h-screen py-16 px-6 text-white relative">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-16">
          <div className="inline-block bg-white/20 text-xs px-4 py-1.5 rounded-full mb-4 font-medium tracking-wide">
            OUR STORY
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-amber-200">
            About TravelScape
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Preserving your travel memories and helping you plan your next adventure
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-amber-200/30 transition-all">
            <div className="bg-blue-600/30 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-200"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m16 10-4 4-4-4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-amber-100">Our Mission</h2>
            <p className="text-white/70 leading-relaxed">
              At TravelScape, we're dedicated to helping travelers capture, organize, and 
              share their precious memories through innovative technology. We believe every journey 
              deserves to be preserved in its full richness and beauty, allowing you to relive your 
              adventures for years to come.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-amber-200/30 transition-all">
            <div className="bg-blue-600/30 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-200"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-amber-100">Our Vision</h2>
            <p className="text-white/70 leading-relaxed">
              We envision a world where travel experiences are seamlessly documented, 
              intelligently organized, and beautifully presented. Our platform transforms 
              how travelers plan, document, and reminisce about their journeys, creating a 
              global community of explorers sharing discoveries and inspiration.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-200">
              What We Offer
            </h2>
            <div className="h-1 w-20 bg-amber-200/30 mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:transform hover:-translate-y-1 transition-all">
              <div className="bg-gradient-to-br from-amber-400/20 to-amber-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
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
                  className="text-amber-200"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Memory Preservation</h3>
              <p className="text-white/70">
                Our AI-powered system automatically organizes your travel photos, recognizes 
                landmarks, and creates beautiful visual stories that capture the essence of your journey.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:transform hover:-translate-y-1 transition-all">
              <div className="bg-gradient-to-br from-amber-400/20 to-amber-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
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
                  className="text-amber-200"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trip Planning</h3>
              <p className="text-white/70">
                Plan your next adventure with our comprehensive tools that help you research 
                destinations, create itineraries, and get personalized recommendations based on your preferences.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:transform hover:-translate-y-1 transition-all">
              <div className="bg-gradient-to-br from-amber-400/20 to-amber-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
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
                  className="text-amber-200"
                >
                  <path d="M17 6.1H3" />
                  <path d="M21 12.1H3" />
                  <path d="M15.1 18H3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Sharing</h3>
              <p className="text-white/70">
                Connect with fellow travelers, share your experiences, and discover hidden 
                gems through our vibrant community platform of explorers around the world.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-blue-800/50 to-blue-900/50 rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-3xl font-bold mb-6 text-amber-100">Our Story</h2>
            
            <div className="space-y-6 text-white/80">
              <p>
                TravelScape began in 2025 when a group of passionate travelers and technology 
                enthusiasts came together with a shared vision: to solve the common problem of 
                disorganized travel memories and complicated trip planning.
              </p>
              
              <p>
                After countless adventures across 40+ countries, our founders experienced firsthand 
                the challenges of preserving travel experiences in a meaningful way. Photos remained 
                hidden in phones, stories faded with time, and planning new journeys involved 
                juggling multiple apps and websites.
              </p>
              
              <p>
                We built TravelScape to be the comprehensive platform we wished existed - one that 
                combines AI-powered photo organization, intelligent trip planning, and a community 
                of fellow explorers, all in one beautiful interface.
              </p>
              
              <p>
                Today, our community includes over 50,000 travelers from around the world who use 
                TravelScape to document their journeys, plan their next adventures, and connect 
                with like-minded explorers.
              </p>
            </div>
          </div>
        </div>

        {/* Contact/Join CTA */}
        <div className="bg-gradient-to-r from-blue-700 to-cyan-700 rounded-2xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          
          <h2 className="text-3xl font-bold mb-4">Start Your Journey With Us</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who are preserving their memories and planning their next adventures with TravelScape.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-amber-500 hover:bg-amber-600 text-blue-900 font-medium px-8 py-3 rounded-full transition-all flex items-center justify-center">
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
                className="ml-2"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
            
            <button className="border border-white/30 hover:border-white/50 font-medium px-8 py-3 rounded-full transition-all flex items-center justify-center">
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
                className="mr-2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>Contact Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;