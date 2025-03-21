import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  // Check if already logged in
  useEffect(() => {
    const checkAuth = () => {
      const allCookies = document.cookie;
      setDebugInfo(`All cookies: ${allCookies || 'none'}`);
      
      const authCookie = allCookies
        .split('; ')
        .find(row => row.startsWith('gym_dashboard_token='));
        
      // Also check sessionStorage as fallback
      const authToken = sessionStorage.getItem('gym_dashboard_token');
      
      if (authCookie || authToken) {
        window.location.href = '/admin/dashboard';
      }
    };
    
    checkAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setRedirecting(true);
        
        // Check if cookie was set after login
        setTimeout(() => {
          const allCookies = document.cookie;
          setDebugInfo(`Cookies after login: ${allCookies || 'none'}`);
          
          const authCookie = allCookies
            .split('; ')
            .find(row => row.startsWith('gym_dashboard_token='));
          
          if (authCookie) {
            // Cookie exists, redirect
            window.location.href = '/admin/dashboard';
          } else if (data.token) {
            // Cookie wasn't set but we have a token in the response
            sessionStorage.setItem('gym_dashboard_token', data.token);
            setDebugInfo(`Using token from response: ${data.token.substring(0, 20)}...`);
            window.location.href = '/admin/dashboard';
          } else {
            // No cookie or token
            setError('Authentication failed: Cookie and token not set');
            setRedirecting(false);
            setIsLoading(false);
          }
        }, 1000);
      } else {
        setError(data.error || 'Login failed');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login | Milestone Fitness</title>
        <meta name="description" content="Login to Milestone Fitness Admin Dashboard" />
      </Head>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Admin Login</h1>
            <p className="text-gray-600 mt-2">Sign in to manage your gym</p>
          </div>
          
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          {redirecting && (
            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-green-700 mr-2"></div>
              Login successful! Redirecting to dashboard...
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading || redirecting}
              className={`w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-200 ${
                (isLoading || redirecting) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Signing in...' : redirecting ? 'Redirecting...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Need help? Contact the system administrator.
            </p>
          </div>
          
          {debugInfo && (
            <div className="mt-6 p-3 bg-gray-100 rounded-lg text-xs overflow-auto">
              <p className="font-mono">{debugInfo}</p>
            </div>
          )}
          
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">Test credentials: testgym@gmail.com / gymtest</p>
          </div>
        </div>
      </div>
    </>
  );
} 