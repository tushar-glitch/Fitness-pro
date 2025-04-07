/**
 * Workout service for handling workout operations
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
 * Create a new workout
 * @param {Object} workoutData - Workout data to create
 * @returns {Promise<Object>} - Created workout data
 */
export async function createWorkout(workoutData) {
  try {
    const headers = getAuthHeader();
    if (!headers) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/workouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(workoutData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create workout');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Create workout error:', error);
    throw error;
  }
}

/**
 * Get user workouts
 * @returns {Promise<Array>} - List of user workouts
 */
export async function getUserWorkouts() {
  try {
    const headers = getAuthHeader();
    if (!headers) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/workouts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get workouts');
    }

    const data = await response.json();
    console.log(data)
    return data.data;
  } catch (error) {
    console.error('Get workouts error:', error);
    throw error;
  }
}

/**
 * Get workout by ID
 * @param {string} workoutId - Workout ID
 * @returns {Promise<Object>} - Workout data
 */
export async function getWorkoutById(workoutId) {
  try {
    const headers = getAuthHeader();
    if (!headers) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/workouts/${workoutId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get workout');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Get workout error:', error);
    throw error;
  }
}

/**
 * Update a workout
 * @param {string} workoutId - Workout ID to update
 * @param {Object} workoutData - Updated workout data
 * @returns {Promise<Object>} - Updated workout data
 */
export async function updateWorkout(workoutId, workoutData) {
  try {
    const headers = getAuthHeader();
    if (!headers) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/workouts/${workoutId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(workoutData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update workout');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Update workout error:', error);
    throw error;
  }
}

/**
 * Delete a workout
 * @param {string} workoutId - Workout ID to delete
 * @returns {Promise<boolean>} - True if deleted successfully
 */
export async function deleteWorkout(workoutId) {
  try {
    const headers = getAuthHeader();
    if (!headers) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/workouts/${workoutId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete workout');
    }

    return true;
  } catch (error) {
    console.error('Delete workout error:', error);
    throw error;
  }
}

/**
 * Get workout statistics
 * @returns {Promise<Object>} - Workout statistics
 */
export async function getWorkoutStats() {
  try {
    const headers = getAuthHeader();
    if (!headers) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/workouts/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get workout stats');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Get workout stats error:', error);
    throw error;
  }
}