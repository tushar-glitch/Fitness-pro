module.exports = (sequelize, DataTypes) => {
  const Workout = sequelize.define('Workout', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    caloriesBurned: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    workoutType: {
      type: DataTypes.ENUM('strength', 'cardio', 'flexibility', 'hiit', 'yoga', 'other'),
      defaultValue: 'other'
    },
    intensity: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium'
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true
  });

  Workout.associate = (models) => {
    Workout.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });

    Workout.hasMany(models.Exercise, {
      foreignKey: 'workoutId',
      as: 'exercises'
    });
  };

  return Workout;
};