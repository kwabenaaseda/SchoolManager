// utils/tokenUtils.js
export const tokenUtils = {
  // Extract payload from JWT token
  decodeToken(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  },

  // Get user ID from token
  getUserIdFromToken() {
    const token = localStorage.getItem('system_access_token');
    if (!token) return null;
    
    const payload = this.decodeToken(token);
    return payload?.sub || null;
  },

  // Get user role from token
  getUserRoleFromToken() {
    const token = localStorage.getItem('system_access_token');
    if (!token) return null;
    
    const payload = this.decodeToken(token);
    return payload?.role || null;
  },

  // Check if token is expired
  isTokenExpired(token) {
    try {
      const payload = this.decodeToken(token);
      if (!payload || !payload.exp) return true;
      
      return Date.now() >= payload.exp * 1000;
    } catch (error) {
      return true;
    }
  }
};