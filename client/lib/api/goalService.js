/**
 * Goal service for handling user fitness goals
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
 * Create a new goal
 * @param {Object} goalData - Goal data to create
 * @returns {Promise<Object>} - Created goal data
 */
export async function createGoal(goalData) {
  try {
    const headers = getAuthHeader();
    if (!headers) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/goals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(goalData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create goal');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Create goal error:', error);
    throw error;
  }
}

/**
 * Get user goals
 * @returns {Promise<Array>} - List of user goals
 */
export async function getUserGoals() {
  try {
    const headers = getAuthHeader();
    if (!headers) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/goals`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get goals');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Get goals error:', error);
    throw error;
  }
}

/**
 * Get goal by ID
 * @param {string} goalId - Goal ID
 * @returns {Promise<Object>} - Goal data
 */
export async function getGoalById(goalId) {
  try {
    const headers = getAuthHeader();
    if (!headers) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/goals/${goalId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get goal');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Get goal error:', error);
    throw error;
  }
}

/**
 * Update a goal
 * @param {string} goalId - Goal ID to update
 * @param {Object} goalData - Updated goal data
 * @returns {Promise<Object>} - Updated goal data
 */
export async function updateGoal(goalId, goalData) {
  try {
    const headers = getAuthHeader();
    if (!headers) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/goals/${goalId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(goalData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update goal');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Update goal error:', error);
    throw error;
  }
}

/**
 * Delete a goal
 * @param {string} goalId - Goal ID to delete
 * @returns {Promise<boolean>} - True if deleted successfully
 */
export async function deleteGoal(goalId) {
  try {
    const headers = getAuthHeader();
    if (!headers) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/goals/${goalId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete goal');
    }

    return true;
  } catch (error) {
    console.error('Delete goal error:', error);
    throw error;
  }
}