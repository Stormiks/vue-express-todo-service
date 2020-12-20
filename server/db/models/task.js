'use strict';
module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define('task', {
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    checked: DataTypes.BOOLEAN
  }, {});
  task.associate = function(models) {
    // associations can be defined here
    task.belongsTo(models.user)
  };
  return task;
};