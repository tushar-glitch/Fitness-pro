const recommendationService = require('../services/recommendationService');

/**
 * Get recommended connections for a user based on similarity
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getRecommendedConnections = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { limit = 10, minScore = 0.3 } = req.query;
    
    const recommendations = await recommendationService.getRecommendedConnections(
      userId,
      parseInt(limit, 10),
      parseFloat(minScore)
    );

    res.status(200).json({
      status: 'success',
      data: {
        recommendations
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get workout buddies who have similar workout schedules
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getWorkoutBuddies = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { limit = 5 } = req.query;
    
    const workoutBuddies = await recommendationService.getWorkoutBuddies(
      userId,
      parseInt(limit, 10)
    );

    res.status(200).json({
      status: 'success',
      data: {
        workoutBuddies
      }
    });
  } catch (err) {
    next(err);
  }
};