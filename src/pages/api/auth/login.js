import { loginUser } from '../../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    
    if (result.success) {
      // Set cookie with the token - ensure it's not HttpOnly for client-side access
      res.setHeader(
        'Set-Cookie', 
        `gym_dashboard_token=${result.token}; Path=/; Max-Age=${8 * 60 * 60}`
      );
      
      return res.status(200).json({ 
        success: true,
        token: result.token  // Also send token in response
      });
    } else {
      return res.status(401).json({ error: result.error || 'Authentication failed' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
} 