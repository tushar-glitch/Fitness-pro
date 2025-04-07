module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('public', 'private'),
      defaultValue: 'public'
    },
    category: {
      type: DataTypes.ENUM('running', 'yoga', 'strength', 'hiit', 'cycling', 'other'),
      defaultValue: 'other'
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    memberCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true
  });

  Group.associate = (models) => {
    Group.belongsToMany(models.User, {
      through: 'UserGroups',
      as: 'members',
      foreignKey: 'groupId'
    });

    Group.hasMany(models.Event, {
      foreignKey: 'groupId',
      as: 'events'
    });
  };

  return Group;
};