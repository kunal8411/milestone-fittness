import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import DashboardLayout from '@/components/admin/DashboardLayout';

export default function MembersList() {
  const router = useRouter();
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [membershipFilter, setMembershipFilter] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
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
    fetchMembers();
  }, []);

  useEffect(() => {
    filterMembers();
  }, [members, searchTerm, statusFilter, membershipFilter, sortField, sortDirection]);

  // Fetch all members
  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch members');
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch members');
      }
      
      setMembers(data.users || []);
    } catch (error) {
      console.error('Error fetching members:', error);
      setError('Failed to load members. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and sort members based on search, filters and sort options
  const filterMembers = () => {
    let results = [...members];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active';
      results = results.filter(member => member.isActive === isActive);
    }
    
    // Apply membership type filter
    if (membershipFilter !== 'all') {
      results = results.filter(member => member.membershipType === membershipFilter);
    }
    
    // Apply search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      results = results.filter(member => {
        return (
          member.name?.toLowerCase().includes(search) ||
          member.email?.toLowerCase().includes(search) ||
          member.phone?.toLowerCase().includes(search)
        );
      });
    }
    
    // Apply sorting
    results.sort((a, b) => {
      let comparison = 0;
      
      // Handle different field types
      switch (sortField) {
        case 'name':
        case 'email':
        case 'phone':
        case 'membershipType':
          comparison = (a[sortField] || '').localeCompare(b[sortField] || '');
          break;
        case 'subscriptionAmount':
          comparison = parseFloat(a[sortField] || 0) - parseFloat(b[sortField] || 0);
          break;
        case 'joiningDate':
        case 'subscriptionExpiryDate':
          comparison = new Date(a[sortField] || 0) - new Date(b[sortField] || 0);
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredMembers(results);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Format currency for display
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };
  
  // Handle sort button click
  const handleSort = (field) => {
    if (field === sortField) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Get sort indicator element
  const getSortIndicator = (field) => {
    if (sortField !== field) return null;
    
    return (
      <span className="ml-1">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };
  
  // Check if subscription is expired
  const isExpired = (expiryDate) => {
    if (!expiryDate) return true;
    return new Date(expiryDate) < new Date();
  };

  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode(viewMode === 'table' ? 'card' : 'table');
  };

  return (
    <DashboardLayout title="Members">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          Members List
        </h1>
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
          <Link href="/admin/members/add">
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Member
            </button>
          </Link>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          {/* Mobile filter toggle */}
          <div className="sm:hidden mb-4">
            <button 
              onClick={toggleMobileFilters}
              className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white"
            >
              <span className="text-sm text-gray-700">Filters and Search</span>
              <svg 
                className={`h-5 w-5 text-gray-500 transform transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className={`sm:grid sm:grid-cols-1 md:grid-cols-4 gap-4 ${showMobileFilters || 'hidden sm:grid'}`}>
            {/* Search input */}
            <div className="col-span-1 md:col-span-2 mb-3 sm:mb-0">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search by name, email or phone"
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Status filter */}
            <div className="mb-3 sm:mb-0">
              <label htmlFor="statusFilter" className="sr-only">Status</label>
              <select
                id="statusFilter"
                name="statusFilter"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
            
            {/* Membership type filter */}
            <div>
              <label htmlFor="membershipFilter" className="sr-only">Membership</label>
              <select
                id="membershipFilter"
                name="membershipFilter"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={membershipFilter}
                onChange={(e) => setMembershipFilter(e.target.value)}
              >
                <option value="all">All Memberships</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Bi-Annual">Bi-Annual</option>
                <option value="Annual">Annual</option>
              </select>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            {searchTerm || statusFilter !== 'all' || membershipFilter !== 'all' ? (
              <p>No members found matching your filters.</p>
            ) : (
              <p>No members found. Add your first member to get started.</p>
            )}
          </div>
        ) : viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort('name')}
                      className="flex items-center font-medium uppercase tracking-wider text-gray-500 hover:text-gray-700"
                    >
                      Member {getSortIndicator('name')}
                    </button>
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    <button 
                      onClick={() => handleSort('membershipType')}
                      className="flex items-center font-medium uppercase tracking-wider text-gray-500 hover:text-gray-700"
                    >
                      Membership {getSortIndicator('membershipType')}
                    </button>
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      onClick={() => handleSort('subscriptionExpiryDate')}
                      className="flex items-center font-medium uppercase tracking-wider text-gray-500 hover:text-gray-700"
                    >
                      Expiry {getSortIndicator('subscriptionExpiryDate')}
                    </button>
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Status
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    <button 
                      onClick={() => handleSort('joiningDate')}
                      className="flex items-center font-medium uppercase tracking-wider text-gray-500 hover:text-gray-700"
                    >
                      Joined {getSortIndicator('joiningDate')}
                    </button>
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member._id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500 sm:hidden">{member.email}</div>
                          <div className="text-sm text-gray-500 sm:hidden">{member.membershipType}</div>
                          <div className="md:hidden">
                            <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              member.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {member.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">{member.membershipType}</div>
                      <div className="text-sm text-gray-500">{formatCurrency(member.subscriptionAmount)}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${isExpired(member.subscriptionExpiryDate) ? 'text-red-600' : 'text-gray-900'}`}>
                        {formatDate(member.subscriptionExpiryDate)}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        member.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {member.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                      {formatDate(member.joiningDate)}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        href={`/admin/members/${member._id}`}
                        className="text-blue-600 hover:text-blue-900 mr-2 md:mr-4 inline-block"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => router.push(`/admin/members/${member._id}`)}
                        className="text-blue-600 hover:text-blue-900 inline-block"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Card View for Mobile
          <div className="grid grid-cols-1 gap-4 p-4">
            {filteredMembers.map((member) => (
              <div key={member._id} className="bg-white border rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    member.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {member.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-gray-500">Email:</span>
                    <span className="text-sm text-gray-700">{member.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-gray-500">Membership:</span>
                    <span className="text-sm text-gray-700">{member.membershipType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-gray-500">Amount:</span>
                    <span className="text-sm text-gray-700">{formatCurrency(member.subscriptionAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-gray-500">Joined:</span>
                    <span className="text-sm text-gray-700">{formatDate(member.joiningDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-gray-500">Expires:</span>
                    <span className={`text-sm ${isExpired(member.subscriptionExpiryDate) ? 'text-red-600 font-medium' : 'text-gray-700'}`}>
                      {formatDate(member.subscriptionExpiryDate)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-4 pt-2 border-t">
                  <Link 
                    href={`/admin/members/${member._id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => router.push(`/admin/members/${member._id}`)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <p className="text-sm text-gray-700 mb-2 sm:mb-0">
              {filteredMembers.length} {filteredMembers.length === 1 ? 'member' : 'members'} found
            </p>
            {(searchTerm || statusFilter !== 'all' || membershipFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setMembershipFilter('all');
                }}
                className="text-blue-600 hover:text-blue-900 text-sm"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 