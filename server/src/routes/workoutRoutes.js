const express = require('express');
const workoutController = require('../controllers/workoutController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', workoutController.createWorkout);
router.get('/', workoutController.getUserWorkouts);
router.get('/stats', workoutController.getWorkoutStats);
router.get('/:workoutId', workoutController.getWorkoutById);
router.patch('/:workoutId', workoutController.updateWorkout);
router.delete('/:workoutId', workoutController.deleteWorkout);

module.exports = router;