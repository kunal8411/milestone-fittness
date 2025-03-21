export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Clear the authentication cookie
    res.setHeader('Set-Cookie', 'gym_dashboard_token=; Path=/; Max-Age=0; HttpOnly');
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
} 