import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function AdminSidebar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      name: 'Members',
      path: '/admin/members',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      name: 'Expiring Soon',
      path: '/admin/expiring',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];
  
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });
      
      if (response.ok) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <div 
        className={`${isMenuOpen ? 'block' : 'hidden'} fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden`} 
        onClick={() => setIsMenuOpen(false)}
      ></div>
      
      <div 
        className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-gray-800 lg:translate-x-0 lg:static lg:inset-0 transition duration-300 ease-in-out transform`}
      >
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center">
            <span className="text-white text-2xl font-semibold">Milestone Fitness</span>
          </div>
        </div>
        
        <nav className="mt-10">
          {menuItems.map((item) => (
            <Link 
              key={item.name}
              href={item.path}
              className={`flex items-center px-6 py-2 mt-4 ${
                router.pathname === item.path
                  ? 'text-gray-100 bg-gray-700 bg-opacity-40'
                  : 'text-gray-400 hover:text-gray-100 hover:bg-gray-700 hover:bg-opacity-25'
              } rounded-lg transition-colors duration-200`}
            >
              <div className="mr-3">{item.icon}</div>
              <span>{item.name}</span>
            </Link>
          ))}
          
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-6 py-2 mt-8 text-gray-400 hover:text-gray-100 hover:bg-gray-700 hover:bg-opacity-25 rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </>
  );
} 