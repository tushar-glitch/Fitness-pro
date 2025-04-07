/**
 * Authentication service for handling user login, registration, and session management
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fitness-pro-42uw.onrender.com/api';

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - User data and token
 */
export async function register(userData) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    // Store token in localStorage
    if (data.data.token) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }
    
    return data.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

/**
 * Log in a user
 * @param {Object} credentials - User login credentials
 * @returns {Promise<Object>} - User data and token
 */
export async function login(credentials) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    // Store token in localStorage
    if (data.data.token) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }
    
    return data.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/**
 * Get current user profile
 * @returns {Promise<Object>} - User profile data
 */
export async function getCurrentUser() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get user profile');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
}

/**
 * Log out the current user
 */
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

/**
 * Check if user is authenticated
 * @returns {boolean} - True if user is authenticated
 */
export function isAuthenticated() {
  if (typeof window === 'undefined') {
    return false;
  }
  return !!localStorage.getItem('token');
}

/**
 * Get authentication token
 * @returns {string|null} - The authentication token or null
 */
export function getToken() {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem('token');
}