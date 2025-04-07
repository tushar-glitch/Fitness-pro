const { Goal } = require('../models');

exports.createGoal = async (req, res, next) => {
  try {
    const { title, description, targetDate, startValue, targetValue, unit, goalType } = req.body;

    const goal = await Goal.create({
      title,
      description,
      targetDate,
      startValue,
      currentValue: startValue,
      targetValue,
      unit,
      goalType,
      userId: req.userId
    });

    res.status(201).json({
      status: 'success',
      data: {
        goal
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserGoals = async (req, res, next) => {
  try {
    const { status } = req.query;

    const whereClause = { userId: req.userId };
    if (status) {
      whereClause.status = status;
    }

    const goals = await Goal.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      status: 'success',
      data: {
        goals
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getGoalById = async (req, res, next) => {
  try {
    const { goalId } = req.params;

    const goal = await Goal.findOne({
      where: {
        id: goalId,
        userId: req.userId
      }
    });

    if (!goal) {
      const error = new Error('Goal not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      status: 'success',
      data: {
        goal
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateGoal = async (req, res, next) => {
  try {
    const { goalId } = req.params;
    const { title, description, targetDate, currentValue, targetValue, unit, goalType, status } = req.body;

    const goal = await Goal.findOne({
      where: {
        id: goalId,
        userId: req.userId
      }
    });

    if (!goal) {
      const error = new Error('Goal not found');
      error.statusCode = 404;
      throw error;
    }

    goal.title = title || goal.title;
    goal.description = description !== undefined ? description : goal.description;
    goal.targetDate = targetDate || goal.targetDate;
    goal.currentValue = currentValue !== undefined ? currentValue : goal.currentValue;
    goal.targetValue = targetValue !== undefined ? targetValue : goal.targetValue;
    goal.unit = unit || goal.unit;
    goal.goalType = goalType || goal.goalType;
    goal.status = status || goal.status;

    if (goal.currentValue !== undefined && goal.targetValue !== undefined) {
      const progress = Math.min(
        Math.round((goal.currentValue / goal.targetValue) * 100),
        100
      );
      goal.progress = progress;

      if (progress >= 100 && goal.status !== 'completed') {
        goal.status = 'completed';
      }
    }

    await goal.save();

    res.status(200).json({
      status: 'success',
      data: {
        goal
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteGoal = async (req, res, next) => {
  try {
    const { goalId } = req.params;

    const goal = await Goal.findOne({
      where: {
        id: goalId,
        userId: req.userId
      }
    });

    if (!goal) {
      const error = new Error('Goal not found');
      error.statusCode = 404;
      throw error;
    }

    await goal.destroy();

    res.status(200).json({
      status: 'success',
      message: 'Goal deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};