import React from 'react';
import EmptyState from '../components/EmptyState';

const VideosPage = () => {
  return (
    <div className="pt-20 min-h-screen bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#3B2C24]">Videos</h1>
        </div>
        
        <EmptyState 
          icon={
            <svg className="w-16 h-16 mx-auto text-[#8C6B52]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          }
          title="Videos Coming Soon"
          description="Our video content is being prepared and will be available here shortly."
        />
      </div>
    </div>
  );
};

export default VideosPage;
