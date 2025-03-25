import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function DashboardLayout({ children, title = 'Dashboard' }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const authCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('gym_dashboard_token='));
        
        // Also check session storage as fallback
        const authToken = sessionStorage.getItem('gym_dashboard_token');
        
        if (!authCookie && !authToken) {
          router.push('/admin/login');
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Handle logout
  const handleLogout = async () => {
    try {
      // Remove token from both cookie and session storage
      document.cookie = 'gym_dashboard_token=; Max-Age=0; Path=/;';
      sessionStorage.removeItem('gym_dashboard_token');
      
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
    },
    {
      name: 'Add Member',
      path: '/admin/members/add',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      )
    }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div>
      <Head>
        <title>{title} | Milestone Fitness Admin</title>
        <meta name="description" content="Admin dashboard for Milestone Fitness" />
      </Head>
      
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar overlay */}
        <div 
          className={`${isMenuOpen ? 'block' : 'hidden'} fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden`} 
          onClick={() => setIsMenuOpen(false)}
        ></div>
      
        {/* Sidebar */}
        <div 
          className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-gray-800 lg:translate-x-0 lg:static lg:inset-0 transition duration-300 ease-in-out transform`}
        >
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center">
              <Link href="/" className="text-white text-2xl font-semibold hover:text-red-500 transition-colors">
                Milestone Fitness
              </Link>
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
            
            <Link 
              href="/"
              className="flex items-center px-6 py-2 mt-8 text-gray-400 hover:text-gray-100 hover:bg-gray-700 hover:bg-opacity-25 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3" />
              </svg>
              <span>Back to Home</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-6 py-2 mt-4 text-gray-400 hover:text-gray-100 hover:bg-gray-700 hover:bg-opacity-25 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </nav>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          {/* Header */}
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
              <Link href="/" className="mr-4 text-sm text-gray-700 hover:text-red-500 transition-colors md:hidden">
                Back to Home
              </Link>
              <div className="relative">
                <div className="flex items-center text-gray-700">
                  <span className="mr-2 text-sm">Admin</span>
                  <div className="w-8 h-8 overflow-hidden rounded-full">
                    <img 
                      src="/images/gymdemo1.jpg" 
                      alt="Admin" 
                      className="object-cover w-full h-full" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          {/* Page content */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 