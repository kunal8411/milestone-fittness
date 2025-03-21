import { connectToDatabase } from '@/utils/mongodb';

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    
    // Handle GET request - Fetch users with optional filters
    if (req.method === 'GET') {
      const { 
        specialty,
        expiringSoon,
        limit,
        active
      } = req.query;
      
      // Build query based on filters
      const query = {};
      
      // Filter by specialty
      if (specialty) {
        query.specialties = specialty;
      }
      
      // Filter by active status
      if (active === 'true') {
        query.isActive = true;
      } else if (active === 'false') {
        query.isActive = false;
      }
      
      // Filter for expiring memberships (within next 7 days)
      if (expiringSoon === 'true') {
        const today = new Date();
        const sevenDaysLater = new Date();
        sevenDaysLater.setDate(today.getDate() + 7);
        
        query.subscriptionExpiryDate = {
          $gte: today,
          $lte: sevenDaysLater
        };
        
        // Only include active members for expiring soon
        query.isActive = true;
      }
      
      // Execute the query
      let users = await usersCollection.find(query).toArray();
      
      // If limit is provided, limit the result set
      if (limit && !isNaN(parseInt(limit))) {
        users = users.slice(0, parseInt(limit));
      }
      
      // Return the users
      return res.status(200).json({ success: true, users });
    }
    
    // Handle POST request - Create a new user
    if (req.method === 'POST') {
      const userData = req.body;
      
      // Validate required fields
      if (!userData.name || !userData.name.trim()) {
        return res.status(400).json({ success: false, error: 'Name is required' });
      }
      
      if (!userData.email || !userData.email.trim()) {
        return res.status(400).json({ success: false, error: 'Email is required' });
      }
      
      // Format dates
      if (userData.joiningDate) {
        userData.joiningDate = new Date(userData.joiningDate);
      } else {
        userData.joiningDate = new Date();
      }
      
      if (userData.subscriptionExpiryDate) {
        userData.subscriptionExpiryDate = new Date(userData.subscriptionExpiryDate);
      }
      
      // Set default values
      if (userData.isActive === undefined) {
        userData.isActive = true;
      }
      
      // Check if email already exists
      const existingUser = await usersCollection.findOne({ email: userData.email });
      if (existingUser) {
        return res.status(400).json({ success: false, error: 'Email already exists' });
      }
      
      // Insert the new user
      const result = await usersCollection.insertOne(userData);
      
      // Get the inserted user
      const newUser = await usersCollection.findOne({ _id: result.insertedId });
      
      return res.status(201).json({ success: true, user: newUser });
    }
    
    // Method not allowed
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
} 