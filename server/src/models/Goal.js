module.exports = (sequelize, DataTypes) => {
  const Goal = sequelize.define('Goal', {
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
    targetDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    startValue: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    currentValue: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    targetValue: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    goalType: {
      type: DataTypes.ENUM('weight', 'strength', 'endurance', 'habit', 'other'),
      defaultValue: 'other'
    },
    status: {
      type: DataTypes.ENUM('active', 'completed', 'abandoned'),
      defaultValue: 'active'
    },
    progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100
      }
    }
  }, {
    timestamps: true
  });

  Goal.associate = (models) => {
    Goal.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return Goal;
};