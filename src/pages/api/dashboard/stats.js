import { connectToDatabase } from '@/utils/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    
    // Get total number of users
    const totalUsers = await usersCollection.countDocuments();
    
    // Get number of active users
    const activeUsers = await usersCollection.countDocuments({ isActive: true });
    
    // Get users with expiring subscriptions this week
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    const expiringThisWeek = await usersCollection.countDocuments({
      subscriptionExpiryDate: {
        $gte: today,
        $lte: nextWeek
      },
      isActive: true
    });
    
    // Get total revenue
    const users = await usersCollection.find().toArray();
    const totalRevenue = users.reduce((sum, user) => {
      // Ensure the amount is a number
      const amount = parseFloat(user.subscriptionAmount) || 0;
      return sum + amount;
    }, 0);
    
    // Get new users this month
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const newUsersThisMonth = await usersCollection.countDocuments({
      joiningDate: { $gte: firstDayOfMonth }
    });
    
    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        expiringThisWeek,
        totalRevenue,
        newUsersThisMonth
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch dashboard stats' });
  }
} 