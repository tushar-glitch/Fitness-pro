const { User, Workout, Goal, Sequelize } = require('../models');
const { Op } = Sequelize;

/**
 * Calculate similarity score between two users based on their fitness profiles
 * @param {Object} user1 - First user object
 * @param {Object} user2 - Second user object
 * @returns {Number} - Similarity score between 0 and 1
 */
const calculateSimilarityScore = (user1, user2) => {
  let score = 0;
  const maxScore = 5; // Maximum possible score

  // Compare fitness level (exact match = 1 point)
  if (user1.fitnessLevel === user2.fitnessLevel) {
    score += 1;
  }

  // Compare primary goal (exact match = 2 points)
  if (user1.primaryGoal === user2.primaryGoal) {
    score += 2;
  }

  // Compare workout types (partial match = up to 2 points)
  // This would require fetching workout data, which we'll simulate here
  // In a real implementation, you'd analyze the actual workout history
  if (user1.workouts && user2.workouts) {
    const user1Types = new Set(user1.workouts.map(w => w.workoutType));
    const user2Types = new Set(user2.workouts.map(w => w.workoutType));
    
    // Calculate Jaccard similarity for workout types
    const intersection = new Set([...user1Types].filter(x => user2Types.has(x)));
    const union = new Set([...user1Types, ...user2Types]);
    
    if (union.size > 0) {
      score += (intersection.size / union.size) * 2;
    }
  }

  // Normalize score to be between 0 and 1
  return score / maxScore;
};

/**
 * Get recommended connections for a user based on similarity
 * @param {String} userId - ID of the user to get recommendations for
 * @param {Number} limit - Maximum number of recommendations to return
 * @param {Number} minScore - Minimum similarity score threshold (0-1)
 * @returns {Array} - Array of recommended users with similarity scores
 */
exports.getRecommendedConnections = async (userId, limit = 10, minScore = 0.3) => {
  try {
    // Get the user with their workouts
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Workout,
          as: 'workouts',
          attributes: ['workoutType'],
          limit: 10,
          order: [['createdAt', 'DESC']]
        },
        {
          model: User,
          as: 'connections',
          attributes: ['id']
        }
      ],
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Get existing connection IDs
    const connectionIds = user.connections.map(connection => connection.id);
    connectionIds.push(userId); // Add the user's own ID

    // Find potential connections
    const potentialUsers = await User.findAll({
      where: {
        id: { [Op.notIn]: connectionIds }
      },
      include: [
        {
          model: Workout,
          as: 'workouts',
          attributes: ['workoutType'],
          limit: 10,
          order: [['createdAt', 'DESC']]
        }
      ],
      attributes: { exclude: ['password'] }
    });

    // Calculate similarity scores
    const recommendations = potentialUsers.map(potentialUser => {
      const similarityScore = calculateSimilarityScore(user, potentialUser);
      return {
        user: potentialUser,
        similarityScore
      };
    });

    // Filter by minimum score and sort by similarity (highest first)
    return recommendations
      .filter(rec => rec.similarityScore >= minScore)
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
};

/**
 * Get workout buddies who have similar workout schedules
 * @param {String} userId - ID of the user to get workout buddies for
 * @param {Number} limit - Maximum number of buddies to return
 * @returns {Array} - Array of recommended workout buddies
 */
exports.getWorkoutBuddies = async (userId, limit = 5) => {
  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Workout,
          as: 'workouts',
          limit: 10,
          order: [['date', 'DESC']]
        },
        {
          model: User,
          as: 'connections',
          attributes: ['id']
        }
      ]
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Get existing connection IDs
    const connectionIds = user.connections.map(connection => connection.id);

    // Find users with similar workout patterns
    // This is a simplified version - in a real app, you'd analyze workout times/days
    const workoutBuddies = await User.findAll({
      where: {
        id: { [Op.notIn]: [...connectionIds, userId] },
        fitnessLevel: user.fitnessLevel
      },
      include: [
        {
          model: Workout,
          as: 'workouts',
          where: {
            workoutType: {
              [Op.in]: user.workouts.map(w => w.workoutType)
            }
          },
          limit: 5
        }
      ],
      attributes: { exclude: ['password'] },
      limit
    });

    return workoutBuddies;
  } catch (error) {
    console.error('Error getting workout buddies:', error);
    throw error;
  }
};