import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'gym-dashboard-secret-key';
const TOKEN_NAME = 'gym_dashboard_token';

// Login function to authenticate and create token
export async function loginUser(credentials) {
  const { email, password } = credentials;
  
  // Check if the credentials match the test credentials
  if (email === 'testgym@gmail.com' && password === 'gymtest') {
    const token = sign(
      { email, role: 'admin', userId: 'admin-user' }, 
      JWT_SECRET, 
      { expiresIn: '8h' }
    );
    
    // Return token instead of setting cookie directly
    return { 
      success: true,
      token: token
    };
  }
  
  return { success: false, error: 'Invalid credentials' };
}

// Function to verify if user is authenticated
export function verifyToken(token) {
  if (!token) {
    return false;
  }
  
  try {
    verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// Function to get current user data
export function getUserFromToken(token) {
  if (!token) {
    return null;
  }
  
  try {
    const userData = verify(token, JWT_SECRET);
    return userData;
  } catch {
    return null;
  }
}

// Authentication middleware for routes
export function withAuth(handler) {
  return async function(req, res) {
    // Get token from Authorization header or cookie in the request
    const authHeader = req.headers?.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : req.cookies?.[TOKEN_NAME];
    
    if (!token || !verifyToken(token)) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
    
    // Add user to request
    req.user = getUserFromToken(token);
    
    return handler(req, res);
  };
} 