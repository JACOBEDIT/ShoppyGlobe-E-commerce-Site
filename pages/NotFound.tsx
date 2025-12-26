
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NotFound: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="relative mb-8">
        <h1 className="text-[12rem] font-extrabold text-gray-100 leading-none">404</h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <i className="fas fa-map-signs text-blue-500 text-6xl mb-4 animate-bounce"></i>
          <p className="text-2xl font-bold text-gray-800">Page Not Found</p>
        </div>
      </div>
      
      <div className="max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100 mb-8">
        <p className="text-gray-600 mb-6">
          The page you are looking for <span className="font-mono bg-gray-100 px-2 rounded font-bold text-red-500">{location.pathname}</span> could not be found. 
          It might have been removed, renamed, or did not exist in the first place.
        </p>
        <Link 
          to="/" 
          className="inline-block bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg"
        >
          Return to ShoppyGlobe
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
