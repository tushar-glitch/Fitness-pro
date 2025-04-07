/**
 * User service for handling user profile and connections
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fitness-pro-42uw.onrender.com/api';

/**
 * Get the authentication token
 * @returns {string|null} - The authentication token or null
 */
function getAuthHeader() {
  if (typeof window === 'undefined') {
    return null;
  }
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : null;
}

/**
 * Update user profile
 * @param {Object} profileData - User profile data to update
 * @returns {Promise<Object>} - Updated user profile
 */
export async function updateProfile(profileData) {
  try {
    const headers = getAuthHeader();
    if (!headers) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update profile');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
}

/**
 * Get user profile by ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - User profile data
 */
export async function getUserProfile(userId) {
  try {
    const headers = getAuthHeader();
    if (!headers) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/users/profile/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get user profile');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Get user profile error:', error);
    throw error;
  }
}

/**
 * Get user connections
 * @returns {Promise<Array>} - List of user connections
 */
export async function getUserConnections() {
  try {
    const headers = getAuthHeader();
    if (!headers) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/users/connections`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get user connections');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Get user connections error:', error);
    throw error;
  }
}

/**
 * Add a new connection
 * @param {Object} connectionData - Connection data
 * @returns {Promise<Object>} - New connection data
 */
export async function addConnection(connectionData) {
  try {
    const headers = getAuthHeader();
    if (!headers) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/users/connections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(connectionData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add connection');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Add connection error:', error);
    throw error;
  }
}

/**
 * Remove a connection
 * @param {string} connectionId - Connection ID to remove
 * @returns {Promise<void>}
 */
export async function removeConnection(connectionId) {
  try {
    const headers = getAuthHeader();
    if (!headers) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/users/connections/${connectionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to remove connection');
    }

    return true;
  } catch (error) {
    console.error('Remove connection error:', error);
    throw error;
  }
}

/**
 * Find potential connections for the user
 * @returns {Promise<Array>} - List of potential connections
 */
export async function findPotentialConnections() {
  try {
    const headers = getAuthHeader();
    if (!headers) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/users/potential-connections`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to find potential connections');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Find potential connections error:', error);
    throw error;
  }
}