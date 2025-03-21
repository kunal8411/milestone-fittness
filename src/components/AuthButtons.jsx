import { useState, useEffect } from 'react';
import Link from 'next/link';
import { isAuthenticated, logout } from '@/utils/auth';
import { useRouter } from 'next/router';

const AuthButtons = ({ isMobile = false }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check auth status on client-side
    setIsAuth(isAuthenticated());
    setLoading(false);
  }, []);

  // Handle login button click
  const handleLoginClick = () => {
    router.push('/admin/login');
  };

  // Handle logout button click
  const handleLogoutClick = () => {
    logout();
  };

  // Handle dashboard button click
  const handleDashboardClick = () => {
    router.push('/admin/dashboard');
  };

  if (loading) {
    return null; // Don't render anything while checking auth status
  }

  if (isMobile) {
    // Mobile layout
    return (
      <>
        {isAuth ? (
          <>
            <button
              onClick={handleDashboardClick}
              className="text-white hover:text-red-500 transition-colors py-2 w-full text-left"
            >
              Dashboard
            </button>
            <button
              onClick={handleLogoutClick}
              className="text-white hover:text-red-500 transition-colors py-2 w-full text-left"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleLoginClick}
            className="text-white hover:text-red-500 transition-colors py-2 w-full text-left"
          >
            Login
          </button>
        )}
      </>
    );
  }

  // Desktop layout
  return (
    <div className="flex items-center space-x-4">
      {isAuth && (
        <button
          onClick={handleDashboardClick}
          className="text-white hover:text-red-500 transition-colors"
        >
          Dashboard
        </button>
      )}

      <button
        onClick={isAuth ? handleLogoutClick : handleLoginClick}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
      >
        {isAuth ? 'Logout' : 'Login'}
      </button>
    </div>
  );
};

export default AuthButtons; 