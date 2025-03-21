import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/admin/DashboardLayout';

export default function MemberDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const [member, setMember] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    joiningDate: '',
    subscriptionAmount: '',
    membershipType: 'Monthly',
    subscriptionExpiryDate: '',
    notes: '',
    isActive: true
  });

  useEffect(() => {
    if (id) {
      fetchMember();
    }
  }, [id]);

  // Fetch member data
  const fetchMember = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/users/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch member');
      }
      
      const data = await response.json();
      
      if (!data.success || !data.user) {
        throw new Error('Invalid response format from API');
      }
      
      const memberData = data.user;
      
      // Format dates for input fields
      const formattedData = {
        ...memberData,
        joiningDate: new Date(memberData.joiningDate).toISOString().split('T')[0],
        subscriptionExpiryDate: new Date(memberData.subscriptionExpiryDate).toISOString().split('T')[0]
      };
      
      setMember(memberData);
      setFormData(formattedData);
    } catch (error) {
      console.error('Error fetching member:', error);
      setError('Failed to load member details');
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
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update member');
      }
      
      // Update local state with new data
      setMember(data.user);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating member:', error);
      setError(error.message || 'Failed to update member');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Calculate days remaining
  const getDaysRemaining = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  // Renew membership for 30 more days
  const handleRenewMembership = async () => {
    try {
      const currentExpiry = new Date(member.subscriptionExpiryDate);
      let newExpiry;
      
      // If already expired, start from today
      if (currentExpiry < new Date()) {
        newExpiry = new Date();
      } else {
        newExpiry = new Date(currentExpiry);
      }
      
      // Add days based on membership type
      switch (member.membershipType) {
        case 'Monthly':
          newExpiry.setMonth(newExpiry.getMonth() + 1);
          break;
        case 'Quarterly':
          newExpiry.setMonth(newExpiry.getMonth() + 3);
          break;
        case 'Bi-Annual':
          newExpiry.setMonth(newExpiry.getMonth() + 6);
          break;
        case 'Annual':
          newExpiry.setFullYear(newExpiry.getFullYear() + 1);
          break;
        default:
          newExpiry.setMonth(newExpiry.getMonth() + 1);
      }
      
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionExpiryDate: newExpiry.toISOString()
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to renew membership');
      }
      
      // Refresh member data
      fetchMember();
    } catch (error) {
      console.error('Error renewing membership:', error);
      setError('Failed to renew membership');
    }
  };

  // Delete member
  const handleDeleteMember = async () => {
    if (window.confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/users/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete member');
        }
        
        // Redirect to members list
        router.push('/admin/members');
      } catch (error) {
        console.error('Error deleting member:', error);
        setError('Failed to delete member');
      }
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Member Details">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error && !member) {
    return (
      <DashboardLayout title="Member Details">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => router.push('/admin/members')}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Back to Members
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={isEditing ? 'Edit Member' : 'Member Details'}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditing ? 'Edit Member Information' : member?.name}
          </h2>
          <div className="flex space-x-2">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={handleRenewMembership}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Renew Membership
                </button>
                <button
                  onClick={handleDeleteMember}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
        
        {isEditing ? (
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name field */}
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                
                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                
                {/* Phone field */}
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                {/* Joining Date field */}
                <div>
                  <label htmlFor="joiningDate" className="block text-gray-700 font-medium mb-2">
                    Joining Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="joiningDate"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                
                {/* Membership Type field */}
                <div>
                  <label htmlFor="membershipType" className="block text-gray-700 font-medium mb-2">
                    Membership Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="membershipType"
                    name="membershipType"
                    value={formData.membershipType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly (3 Months)</option>
                    <option value="Bi-Annual">Bi-Annual (6 Months)</option>
                    <option value="Annual">Annual (12 Months)</option>
                  </select>
                </div>
                
                {/* Subscription Amount field */}
                <div>
                  <label htmlFor="subscriptionAmount" className="block text-gray-700 font-medium mb-2">
                    Subscription Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      id="subscriptionAmount"
                      name="subscriptionAmount"
                      value={formData.subscriptionAmount}
                      onChange={handleChange}
                      className="w-full pl-8 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>
                
                {/* Expiry Date field */}
                <div>
                  <label htmlFor="subscriptionExpiryDate" className="block text-gray-700 font-medium mb-2">
                    Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="subscriptionExpiryDate"
                    name="subscriptionExpiryDate"
                    value={formData.subscriptionExpiryDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                
                {/* Active status field */}
                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isActive" className="ml-2 block text-gray-700 font-medium">
                      Active Member
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Inactive members won&apos;t be counted in active statistics
                  </p>
                </div>
              </div>
              
              {/* Notes field */}
              <div className="mb-6">
                <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows={4}
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg ${
                    isSaving ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Member Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{member?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{member?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{member?.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Joining Date</p>
                    <p className="font-medium">{formatDate(member?.joiningDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Member Status</p>
                    <p className={`font-medium ${member?.isActive ? 'text-green-600' : 'text-red-600'}`}>
                      {member?.isActive ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Membership Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Membership Type</p>
                    <p className="font-medium">{member?.membershipType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Subscription Amount</p>
                    <p className="font-medium">{formatCurrency(member?.subscriptionAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expiry Date</p>
                    <p className="font-medium">{formatDate(member?.subscriptionExpiryDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Days Remaining</p>
                    {(() => {
                      const daysRemaining = getDaysRemaining(member?.subscriptionExpiryDate);
                      const className = daysRemaining <= 0 
                        ? 'text-red-600' 
                        : daysRemaining <= 7 
                          ? 'text-orange-600' 
                          : 'text-green-600';
                      
                      return (
                        <p className={`font-medium ${className}`}>
                          {daysRemaining <= 0 ? 'Expired' : `${daysRemaining} days`}
                        </p>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
            
            {member?.notes && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Notes</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-line">{member.notes}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 