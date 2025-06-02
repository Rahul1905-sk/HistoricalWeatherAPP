import React from 'react';
import { Cloud } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-5 md:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Cloud className="h-8 w-8 text-white animate-pulse" />
            <h1 className="text-2xl font-bold">Weather Dashboard</h1>
          </div>
        </div>
        
       
      </div>
    </header>
  );
};

export default Header;