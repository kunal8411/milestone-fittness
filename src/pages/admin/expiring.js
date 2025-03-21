import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/admin/DashboardLayout';
import Link from 'next/link';

export default function ExpiringMemberships() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  
  useEffect(() => {
    // Set initial view mode based on screen width
    const handleResize = () => {
      setViewMode(window.innerWidth < 768 ? 'card' : 'table');
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    fetchExpiringMembers();
  }, []);
  
  const fetchExpiringMembers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/users?expiringSoon=true');
      
      if (!response.ok) {
        throw new Error('Failed to fetch expiring memberships');
      }
      
      const data = await response.json();
      setMembers(data.users || []);
    } catch (error) {
      console.error('Error fetching expiring memberships:', error);
      setError('Failed to load expiring memberships');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get days remaining
  const getDaysRemaining = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  // Handle renew membership
  const handleRenew = async (id) => {
    try {
      const member = members.find(m => m._id === id);
      if (!member) return;
      
      const currentExpiry = new Date(member.subscriptionExpiryDate);
      let newExpiry;
      
      // Add 30 days to current expiry date
      newExpiry = new Date(currentExpiry);
      newExpiry.setDate(newExpiry.getDate() + 30);
      
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionExpiryDate: newExpiry.toISOString(),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to renew membership');
      }
      
      // Refresh expiring members list
      fetchExpiringMembers();
    } catch (error) {
      console.error('Error renewing membership:', error);
      alert('Failed to renew membership');
    }
  };

  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode(viewMode === 'table' ? 'card' : 'table');
  };

  // Get badge class based on days remaining
  const getDaysRemainingBadgeClass = (daysRemaining) => {
    if (daysRemaining <= 0) {
      return 'bg-red-100 text-red-800';
    } else if (daysRemaining <= 3) {
      return 'bg-orange-100 text-orange-800';
    } else {
      return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <DashboardLayout title="Expiring Memberships">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 sm:mb-0">Memberships Expiring Soon</h2>
          <div className="flex space-x-3">
            <button 
              onClick={toggleViewMode}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 md:hidden"
            >
              {viewMode === 'table' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
              {viewMode === 'table' ? 'Card View' : 'Table View'}
            </button>
            <Link
              href="/admin/members/add"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Member
            </Link>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : members.length > 0 ? (
          viewMode === 'table' ? (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="text-left bg-gray-50">
                    <th className="px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Email</th>
                    <th className="px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Phone</th>
                    <th className="px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                    <th className="px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Days Left</th>
                    <th className="px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Membership</th>
                    <th className="px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {members.map((member) => {
                    const daysRemaining = getDaysRemaining(member.subscriptionExpiryDate);
                    
                    return (
                      <tr key={member._id} className="hover:bg-gray-50">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500 md:hidden">{member.email}</div>
                          <div className="text-sm text-gray-500 sm:hidden">{member.phone || 'N/A'}</div>
                          <div className="text-sm text-gray-500 lg:hidden mt-1">
                            {member.membershipType} ({formatCurrency(member.subscriptionAmount)})
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                          <div className="text-sm text-gray-500">{member.phone || 'N/A'}</div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatDate(member.subscriptionExpiryDate)}</div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            daysRemaining <= 0 
                              ? 'bg-red-100 text-red-800' 
                              : daysRemaining <= 3 
                                ? 'bg-orange-100 text-orange-800' 
                                : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {daysRemaining <= 0 ? 'Expired' : `${daysRemaining} days`}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                          <div className="text-sm text-gray-500">
                            {member.membershipType} ({formatCurrency(member.subscriptionAmount)})
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex flex-col sm:flex-row sm:space-x-2">
                            <button
                              onClick={() => handleRenew(member._id)}
                              className="text-green-600 hover:text-green-900 mb-1 sm:mb-0"
                            >
                              Renew
                            </button>
                            <Link
                              href={`/admin/members/${member._id}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            // Card View for Mobile
            <div className="grid grid-cols-1 gap-4 p-4">
              {members.map((member) => {
                const daysRemaining = getDaysRemaining(member.subscriptionExpiryDate);
                const badgeClass = getDaysRemainingBadgeClass(daysRemaining);
                
                return (
                  <div key={member._id} className="bg-white border rounded-lg shadow-sm p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${badgeClass}`}>
                        {daysRemaining <= 0 ? 'Expired' : `${daysRemaining} days`}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs font-medium text-gray-500">Email:</span>
                        <span className="text-sm text-gray-700">{member.email}</span>
                      </div>
                      {member.phone && (
                        <div className="flex justify-between">
                          <span className="text-xs font-medium text-gray-500">Phone:</span>
                          <span className="text-sm text-gray-700">{member.phone}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-xs font-medium text-gray-500">Membership:</span>
                        <span className="text-sm text-gray-700">{member.membershipType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs font-medium text-gray-500">Amount:</span>
                        <span className="text-sm text-gray-700">{formatCurrency(member.subscriptionAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs font-medium text-gray-500">Expiry Date:</span>
                        <span className="text-sm text-gray-700">{formatDate(member.subscriptionExpiryDate)}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-4 mt-4 pt-2 border-t">
                      <button
                        onClick={() => handleRenew(member._id)}
                        className="text-green-600 hover:text-green-900 font-medium"
                      >
                        Renew
                      </button>
                      <Link
                        href={`/admin/members/${member._id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <div className="text-center p-8 text-gray-500">
            No expiring memberships found.
          </div>
        )}
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Pro Tip: Contact members with expiring memberships to encourage renewal. Offering discounts for early renewal can increase retention rates.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 