// Functions to handle authentication status

// Check if the user is authenticated
export const isAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  // Check for auth cookie
  const authCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('gym_dashboard_token='));
  
  // Also check sessionStorage as fallback
  const authToken = sessionStorage.getItem('gym_dashboard_token');
  
  return !!(authCookie || authToken);
};

// Log out the user by removing the auth token
export const logout = () => {
  // Remove cookie
  document.cookie = 'gym_dashboard_token=; Max-Age=0; Path=/;';
  
  // Remove from session storage
  sessionStorage.removeItem('gym_dashboard_token');
  
  // Redirect to home page
  window.location.href = '/';
}; 