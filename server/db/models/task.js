'use strict';
module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define('task', {
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    checked: DataTypes.BOOLEAN
  }, {});
  task.associate = function(models) {
    task.belongsTo(models.user)
    task.hasMany(models.comment)
  };
  return task;
};