const express = require('express');
const recommendationController = require('../controllers/recommendationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/connections', recommendationController.getRecommendedConnections);
router.get('/workout-buddies', recommendationController.getWorkoutBuddies);

module.exports = router;