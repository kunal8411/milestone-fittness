import type { NextApiRequest, NextApiResponse } from 'next';

// Define the response data type
type MembershipPlan = {
  id: string;
  name: string;
  price: number;
  duration: number; // in months
  features: string[];
};

type ResponseData = {
  success: boolean;
  message?: string;
  plans?: MembershipPlan[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // This is just a placeholder API route
  // In a real application, this would fetch data from a database
  
  // Implement token validation, authentication, etc. in a real app
  
  if (req.method === 'GET') {
    // Return mock membership plans
    const plans: MembershipPlan[] = [
      {
        id: 'monthly',
        name: '1 Month',
        price: 49,
        duration: 1,
        features: [
          'Full access to gym equipment',
          '2 Free personal training sessions',
          'Access to fitness classes',
          'Locker room access'
        ]
      },
      {
        id: 'quarterly',
        name: '3 Months',
        price: 129,
        duration: 3,
        features: [
          'Full access to gym equipment',
          '4 Free personal training sessions',
          'Unlimited fitness classes',
          'Locker room access',
          'Nutrition consultation'
        ]
      },
      {
        id: 'biannual',
        name: '6 Months',
        price: 239,
        duration: 6,
        features: [
          'Full access to gym equipment',
          '8 Free personal training sessions',
          'Unlimited fitness classes',
          'Locker room access',
          'Nutrition consultation',
          'Body composition analysis'
        ]
      },
      {
        id: 'annual',
        name: '1 Year',
        price: 449,
        duration: 12,
        features: [
          'Full access to gym equipment',
          '12 Free personal training sessions',
          'Unlimited fitness classes',
          'Locker room access',
          'Nutrition consultation',
          'Body composition analysis',
          'Free gym merchandise'
        ]
      }
    ];
    
    res.status(200).json({ success: true, plans });
  } else {
    // Method not allowed
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 