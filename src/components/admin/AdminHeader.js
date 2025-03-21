import { useState } from 'react';

export default function AdminHeader({ title }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-2 border-gray-200">
      <div className="flex items-center">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="text-gray-500 focus:outline-none lg:hidden"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div className="ml-4">
          <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="relative">
          <div className="flex items-center text-gray-700">
            <span className="mr-2 text-sm">Admin</span>
            <div className="w-8 h-8 overflow-hidden rounded-full">
              <img 
                src="/images/admin-avatar.png" 
                alt="Admin" 
                onError={(e) => { e.target.src = '/images/gym1enhance.webp' }} 
                className="object-cover w-full h-full" 
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 