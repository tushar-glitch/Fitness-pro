const express = require('express');
const goalController = require('../controllers/goalController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', goalController.createGoal);
router.get('/', goalController.getUserGoals);
router.get('/:goalId', goalController.getGoalById);
router.patch('/:goalId', goalController.updateGoal);
router.delete('/:goalId', goalController.deleteGoal);

module.exports = router;