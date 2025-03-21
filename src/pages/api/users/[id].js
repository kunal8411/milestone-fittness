import { connectToDatabase } from '@/utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  
  // Validate ID
  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, error: 'Invalid user ID' });
  }
  
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    
    // Convert ID to ObjectId
    const objectId = new ObjectId(id);
    
    // GET - Fetch a single user
    if (req.method === 'GET') {
      const user = await usersCollection.findOne({ _id: objectId });
      
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      
      return res.status(200).json({ success: true, user });
    }
    
    // PUT - Update a user
    if (req.method === 'PUT') {
      const updateData = req.body;
      
      // Remove _id if present (can't update MongoDB _id)
      if (updateData._id) {
        delete updateData._id;
      }
      
      // Optional: validate required fields
      if (updateData.name !== undefined && !updateData.name.trim()) {
        return res.status(400).json({ success: false, error: 'Name is required' });
      }
      
      if (updateData.email !== undefined && !updateData.email.trim()) {
        return res.status(400).json({ success: false, error: 'Email is required' });
      }
      
      // Format dates if needed
      if (updateData.joiningDate) {
        updateData.joiningDate = new Date(updateData.joiningDate);
      }
      
      if (updateData.subscriptionExpiryDate) {
        updateData.subscriptionExpiryDate = new Date(updateData.subscriptionExpiryDate);
      }
      
      // Update the user in the database
      const result = await usersCollection.updateOne(
        { _id: objectId },
        { $set: updateData }
      );
      
      if (result.matchedCount === 0) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      
      // Fetch the updated user to return
      const updatedUser = await usersCollection.findOne({ _id: objectId });
      
      return res.status(200).json({ success: true, user: updatedUser });
    }
    
    // DELETE - Remove a user
    if (req.method === 'DELETE') {
      const result = await usersCollection.deleteOne({ _id: objectId });
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      
      return res.status(200).json({ success: true, message: 'User deleted successfully' });
    }
    
    // Method not allowed
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
} 