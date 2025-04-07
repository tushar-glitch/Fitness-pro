const { Workout, Exercise, sequelize, Sequelize } = require('../models');

exports.createWorkout = async (req, res, next) => {
  try {
    const { title, description, date, duration, caloriesBurned, workoutType, intensity, exercises, notes } = req.body;

    const workout = await Workout.create({
      title,
      description,
      date,
      duration,
      caloriesBurned,
      workoutType,
      intensity,
      notes,
      userId: req.userId
    });

    if (exercises && exercises.length > 0) {
      const exerciseRecords = exercises.map(exercise => ({
        ...exercise,
        workoutId: workout.id
      }));

      await Exercise.bulkCreate(exerciseRecords);
    }

    const createdWorkout = await Workout.findByPk(workout.id, {
      include: [{
        model: Exercise,
        as: 'exercises'
      }]
    });

    res.status(201).json({
      status: 'success',
      data: {
        workout: createdWorkout
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserWorkouts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, workoutType } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { userId: req.userId };
    if (workoutType) {
      whereClause.workoutType = workoutType;
    }

    const { count, rows: workouts } = await Workout.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['date', 'DESC']],
      include: [{
        model: Exercise,
        as: 'exercises'
      }]
    });

    res.status(200).json({
      status: 'success',
      data: {
        workouts,
        totalCount: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page)
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getWorkoutById = async (req, res, next) => {
  try {
    const { workoutId } = req.params;

    const workout = await Workout.findOne({
      where: {
        id: workoutId,
        userId: req.userId
      },
      include: [{
        model: Exercise,
        as: 'exercises'
      }]
    });

    if (!workout) {
      const error = new Error('Workout not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      status: 'success',
      data: {
        workout
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateWorkout = async (req, res, next) => {
  try {
    const { workoutId } = req.params;
    const { title, description, date, duration, caloriesBurned, workoutType, intensity, isCompleted, exercises } = req.body;

    const workout = await Workout.findOne({
      where: {
        id: workoutId,
        userId: req.userId
      }
    });

    if (!workout) {
      const error = new Error('Workout not found');
      error.statusCode = 404;
      throw error;
    }

    workout.title = title || workout.title;
    workout.description = description !== undefined ? description : workout.description;
    workout.date = date || workout.date;
    workout.duration = duration || workout.duration;
    workout.caloriesBurned = caloriesBurned !== undefined ? caloriesBurned : workout.caloriesBurned;
    workout.workoutType = workoutType || workout.workoutType;
    workout.intensity = intensity || workout.intensity;
    workout.isCompleted = isCompleted !== undefined ? isCompleted : workout.isCompleted;

    await workout.save();

    if (exercises && exercises.length > 0) {
      await Exercise.destroy({ where: { workoutId } });
      
      const exerciseRecords = exercises.map(exercise => ({
        ...exercise,
        workoutId
      }));

      await Exercise.bulkCreate(exerciseRecords);
    }

    const updatedWorkout = await Workout.findByPk(workoutId, {
      include: [{
        model: Exercise,
        as: 'exercises'
      }]
    });

    res.status(200).json({
      status: 'success',
      data: {
        workout: updatedWorkout
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteWorkout = async (req, res, next) => {
  try {
    const { workoutId } = req.params;

    const workout = await Workout.findOne({
      where: {
        id: workoutId,
        userId: req.userId
      }
    });

    if (!workout) {
      const error = new Error('Workout not found');
      error.statusCode = 404;
      throw error;
    }

    await Exercise.destroy({ where: { workoutId } });
    await workout.destroy();

    res.status(200).json({
      status: 'success',
      message: 'Workout deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

exports.getWorkoutStats = async (req, res, next) => {
  try {
    const { timeframe = 'week' } = req.query;
    
    let startDate;
    const now = new Date();

    switch (timeframe) {
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date(now.setDate(now.getDate() - 7));
    }

    const workouts = await Workout.findAll({
      where: {
        userId: req.userId,
        date: { [Sequelize.Op.gte]: startDate }
      },
      attributes: [
        'workoutType',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        [sequelize.fn('SUM', sequelize.col('duration')), 'totalDuration'],
        [sequelize.fn('SUM', sequelize.col('caloriesBurned')), 'totalCalories']
      ],
      group: ['workoutType']
    });

    res.status(200).json({
      status: 'success',
      data: {
        stats: workouts,
        timeframe
      }
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
};