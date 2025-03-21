import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  joiningDate: {
    type: Date,
    required: [true, 'Please provide a joining date'],
    default: Date.now,
  },
  subscriptionAmount: {
    type: Number,
    required: [true, 'Please provide a subscription amount'],
  },
  subscriptionExpiryDate: {
    type: Date,
    required: [true, 'Please provide a subscription expiry date'],
  },
  membershipType: {
    type: String,
    enum: ['Monthly', 'Quarterly', 'Bi-Annual', 'Annual'],
    default: 'Monthly',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  notes: {
    type: String,
  }
}, { 
  timestamps: true 
});

export default mongoose.models.User || mongoose.model('User', UserSchema); 