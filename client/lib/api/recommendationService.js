/**
 * Recommendation service for handling user recommendations
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Get the authentication headers
 * @returns {Object|null} - The authentication headers or null
 */
function getAuthHeader() {
  if (typeof window === 'undefined') {
    return null;
  }
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : null;
}

/**
 * Get recommended connections for the user
 * @returns {Promise<Array>} - List of recommended connections
 */
export async function getRecommendedConnections() {
  try {
    const headers = getAuthHeader();
    if (!headers) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/recommendations/connections`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get recommended connections');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Get recommended connections error:', error);
    throw error;
  }
}

/**
 * Get workout buddies recommendations
 * @returns {Promise<Array>} - List of workout buddies
 */
export async function getWorkoutBuddies() {
  try {
    const headers = getAuthHeader();
    if (!headers) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/recommendations/workout-buddies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get workout buddies');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Get workout buddies error:', error);
    throw error;
  }
}