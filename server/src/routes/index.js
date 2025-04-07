const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const workoutRoutes = require('./workoutRoutes');
const goalRoutes = require('./goalRoutes');
const recommendationRoutes = require('./recommendationRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/workouts', workoutRoutes);
router.use('/goals', goalRoutes);
router.use('/recommendations', recommendationRoutes);

module.exports = router;