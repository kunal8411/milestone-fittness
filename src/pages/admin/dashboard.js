import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentMembers, setRecentMembers] = useState([]);
  const [error, setError] = useState(null);
  const [, setMonthlyData] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check authentication and load dashboard data
  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      // Check for authentication cookie
      const authCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('gym_dashboard_token='));
      
      // Also check sessionStorage as fallback
      const authToken = sessionStorage.getItem('gym_dashboard_token');
      
      const isAuth = !!authCookie || !!authToken;
      
      if (!isAuth) {
        // If not authenticated, redirect to login
        window.location.href = '/admin/login';
        return;
      }

      setIsAuthenticated(true);
      
      try {
        // Fetch stats
        const statsResponse = await fetch('/api/dashboard/stats');
        if (!statsResponse.ok) {
          throw new Error('Failed to fetch stats');
        }
        const statsData = await statsResponse.json();
        
        // Fetch recent members
        const membersResponse = await fetch('/api/users?limit=5');
        if (!membersResponse.ok) {
          throw new Error('Failed to fetch members');
        }
        const membersData = await membersResponse.json();
        
        setStats(statsData.stats);
        setRecentMembers(membersData.users || []);

        // Generate or fetch monthly data for chart
        // This is placeholder data - ideally this would come from your API
        const mockMonthlyData = [
          { name: 'Jan', users: 4 },
          { name: 'Feb', users: 6 },
          { name: 'Mar', users: 8 },
          { name: 'Apr', users: 10 },
          { name: 'May', users: 7 },
          { name: 'Jun', users: 9 },
          { name: 'Jul', users: 12 },
          { name: 'Aug', users: 14 },
          { name: 'Sep', users: 16 },
          { name: 'Oct', users: 15 },
          { name: 'Nov', users: 18 },
          { name: 'Dec', users: 20 },
        ];
        setMonthlyData(mockMonthlyData);
      } catch (error) {
        console.error('Dashboard data error:', error);
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthAndLoadData();
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('gym_dashboard_token');
    document.cookie = 'gym_dashboard_token=; Max-Age=0; Path=/;';
    window.location.href = '/admin/login';
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Dashboard | Milestone Fitness</title>
      </Head>
      
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
          <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-900 rounded-md bg-gray-100">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Milestone Fitness</h1>
            </Link>
            
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/admin/dashboard" className="px-3 py-2 text-sm font-medium text-gray-900 rounded-md bg-gray-100">
              Dashboard
            </Link>
            <Link href="/admin/members" className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
              Members
            </Link>
            <Link href="/admin/expiring" className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
              Expiring Soon
            </Link>
            <Link href="/admin/members/add" className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
              Add Member
            </Link>
            <button 
              onClick={handleLogout}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
            >
              Logout
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on menu state */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <Link href="/admin/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 bg-gray-100">
                Dashboard
              </Link>
              <Link href="/admin/members" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                Members
              </Link>
              <Link href="/admin/expiring" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                Expiring Soon
              </Link>
              <Link href="/admin/members/add" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                Add Member
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm font-medium">Total Members</p>
                <p className="text-2xl font-semibold text-gray-800">{stats?.totalUsers || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-800">{formatCurrency(stats?.totalRevenue || 0)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm font-medium">Expiring This Week</p>
                <p className="text-2xl font-semibold text-gray-800">{stats?.expiringThisWeek || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm font-medium">New This Month</p>
                <p className="text-2xl font-semibold text-gray-800">{stats?.newUsersThisMonth || 0}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* User Growth Chart */}
        {/* <div className="bg-white rounded-lg shadow mb-8 p-4 md:p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Member Growth</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#3B82F6" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div> */}
        
        {/* Recent members */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="py-4 px-4 md:px-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">Recent Members</h2>
            <Link href="/admin/members" className="text-blue-600 hover:text-blue-800 flex items-center">
              <span>View All</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Email</th>
                    <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Joined</th>
                    <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                    <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentMembers.length > 0 ? (
                    recentMembers.map((member) => (
                      <tr key={member._id} className="hover:bg-gray-50">
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                          <div className="text-sm text-gray-500">{formatDate(member.joiningDate)}</div>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatDate(member.subscriptionExpiryDate)}</div>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                          <div className="text-sm text-gray-500">{formatCurrency(member.subscriptionAmount)}</div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-4 md:px-6 py-4 text-center text-gray-500">
                        No members found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Actions card */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              href="/admin/members/add"
              className="flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span>Add New Member</span>
            </Link>
            
            <Link
              href="/admin/expiring"
              className="flex items-center justify-center px-4 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>View Expiring Memberships</span>
            </Link>
            
            <Link
              href="/admin/members"
              className="flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Manage All Members</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 