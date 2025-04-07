const { User, Workout, Goal, sequelize, Sequelize } = require('../models');

exports.updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, bio, fitnessLevel, primaryGoal } = req.body;

    const user = await User.findByPk(req.userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.bio = bio || user.bio;
    user.fitnessLevel = fitnessLevel || user.fitnessLevel;
    user.primaryGoal = primaryGoal || user.primaryGoal;

    await user.save();

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          bio: user.bio,
          profileImage: user.profileImage,
          fitnessLevel: user.fitnessLevel,
          primaryGoal: user.primaryGoal
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Workout,
          as: 'workouts',
          limit: 5,
          order: [['date', 'DESC']]
        },
        {
          model: Goal,
          as: 'goals',
          where: { status: 'active' },
          required: false
        }
      ]
    });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserConnections = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId, {
      include: [
        {
          model: User,
          as: 'connections',
          attributes: { exclude: ['password'] }
        }
      ]
    });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      status: 'success',
      data: {
        connections: user.connections
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.addConnection = async (req, res, next) => {
  try {
    const { connectionId } = req.body;

    const user = await User.findByPk(req.userId);
    const connectionUser = await User.findByPk(connectionId);

    if (!user || !connectionUser) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    await user.addConnection(connectionUser);

    res.status(200).json({
      status: 'success',
      message: 'Connection added successfully'
    });
  } catch (err) {
    next(err);
  }
};

exports.removeConnection = async (req, res, next) => {
  try {
    const { connectionId } = req.params;

    const user = await User.findByPk(req.userId);
    const connectionUser = await User.findByPk(connectionId);

    if (!user || !connectionUser) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    await user.removeConnection(connectionUser);

    res.status(200).json({
      status: 'success',
      message: 'Connection removed successfully'
    });
  } catch (err) {
    next(err);
  }
};

exports.findPotentialConnections = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const connections = await user.getConnections();
    const connectionIds = connections.map(connection => connection.id);
    connectionIds.push(user.id);

    const potentialConnections = await User.findAll({
      where: {
        id: { [Sequelize.Op.notIn]: connectionIds },
        fitnessLevel: user.fitnessLevel,
        primaryGoal: user.primaryGoal
      },
      attributes: { exclude: ['password'] },
      limit: 10
    });

    res.status(200).json({
      status: 'success',
      data: {
        potentialConnections
      }
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
};