'use strict';
module.exports = (sequelize, DataTypes) => {
	const comment = sequelize.define('comment', {
		text: DataTypes.STRING
	}, {});
	comment.associate = function(models) {
		comment.belongsTo(models.task)
		comment.belongsTo(models.user)
	};
	return comment;
};
