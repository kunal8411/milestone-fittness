import { useState } from 'react';
import DashboardLayout from '@/components/admin/DashboardLayout';
import { useRouter } from 'next/router';

export default function AddMember() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    joiningDate: new Date().toISOString().split('T')[0],
    subscriptionAmount: '',
    membershipType: 'Monthly',
    subscriptionExpiryDate: '',
    notes: '',
    isActive: true
  });

  // Calculate default expiry date based on membership type
  const calculateExpiryDate = (membershipType, startDate = null) => {
    const start = startDate ? new Date(startDate) : new Date();
    const expiry = new Date(start);
    
    switch (membershipType) {
      case 'Monthly':
        expiry.setMonth(expiry.getMonth() + 1);
        break;
      case 'Quarterly':
        expiry.setMonth(expiry.getMonth() + 3);
        break;
      case 'Bi-Annual':
        expiry.setMonth(expiry.getMonth() + 6);
        break;
      case 'Annual':
        expiry.setFullYear(expiry.getFullYear() + 1);
        break;
      default:
        expiry.setMonth(expiry.getMonth() + 1);
    }
    
    return expiry.toISOString().split('T')[0];
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // If membership type changes, update expiry date
    if (name === 'membershipType' || name === 'joiningDate') {
      const startDate = name === 'joiningDate' ? value : formData.joiningDate;
      const membershipType = name === 'membershipType' ? value : formData.membershipType;
      
      setFormData(prev => ({
        ...prev,
        subscriptionExpiryDate: calculateExpiryDate(membershipType, startDate)
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create member');
      }
      
      // Redirect to members list on success
      router.push('/admin/members');
    } catch (error) {
      console.error('Error creating member:', error);
      setError(error.message || 'Failed to create member');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate subscription amount suggestions based on membership type
  const getAmountSuggestion = (type) => {
    switch (type) {
      case 'Monthly': return '$49.99';
      case 'Quarterly': return '$129.99';
      case 'Bi-Annual': return '$239.99';
      case 'Annual': return '$449.99';
      default: return '';
    }
  };

  return (
    <DashboardLayout title="Add New Member">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow p-6">
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
                placeholder="Enter member's full name"
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
                placeholder="Enter member's email"
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
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter member's phone number"
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
              <p className="text-sm text-gray-500 mt-1">
                Suggested amount: {getAmountSuggestion(formData.membershipType)}
              </p>
            </div>
            
            {/* Subscription Amount field */}
            <div>
              <label htmlFor="subscriptionAmount" className="block text-gray-700 font-medium mb-2">
                Subscription Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">₹</span>
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
                  placeholder="0.00"
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
                Inactive members wont be counted in active statistics
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
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Any additional notes about this member"
              rows={4}
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => router.push('/admin/members')}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Save Member'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
} 