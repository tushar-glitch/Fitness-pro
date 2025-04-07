module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
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
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    eventType: {
      type: DataTypes.ENUM('workout', 'competition', 'meetup', 'class', 'other'),
      defaultValue: 'workout'
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    attendeeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isVirtual: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('upcoming', 'ongoing', 'completed', 'cancelled'),
      defaultValue: 'upcoming'
    }
  }, {
    timestamps: true
  });

  Event.associate = (models) => {
    Event.belongsTo(models.Group, {
      foreignKey: 'groupId',
      as: 'group'
    });

    Event.belongsTo(models.User, {
      foreignKey: 'creatorId',
      as: 'creator'
    });

    Event.belongsToMany(models.User, {
      through: 'EventAttendees',
      as: 'attendees',
      foreignKey: 'eventId'
    });
  };

  return Event;
};