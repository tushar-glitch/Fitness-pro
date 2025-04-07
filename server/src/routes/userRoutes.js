const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.patch('/profile', userController.updateProfile);
router.get('/profile/:userId', userController.getUserProfile);
router.get('/connections', userController.getUserConnections);
router.post('/connections', userController.addConnection);
router.delete('/connections/:connectionId', userController.removeConnection);
router.get('/potential-connections', userController.findPotentialConnections);

module.exports = router;