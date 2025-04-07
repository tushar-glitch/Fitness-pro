module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    distance: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    exerciseType: {
      type: DataTypes.ENUM('strength', 'cardio', 'flexibility', 'balance', 'other'),
      defaultValue: 'other'
    }
  }, {
    timestamps: true
  });

  Exercise.associate = (models) => {
    Exercise.belongsTo(models.Workout, {
      foreignKey: 'workoutId',
      as: 'workout'
    });
  };

  return Exercise;
};