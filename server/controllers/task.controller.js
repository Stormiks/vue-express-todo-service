const { task, user, comment } = require('../db/models/');
const sequelize = require('sequelize');


module.exports.updateTask = (req, res) => {
	task.update(req.body, {
		where: {
			id: req.body.id
		},
		fields: ['title', 'text', 'checked']
	}).then(task => {
		if (task.length)
			res.status(202).send(task);
		else
			res.status(404).send({
				warning: `Not found task ID: ${res.body.id}!`
			});
	}).catch(err => res.status(500).send({
		msg: 'Error!',
		trace: err
	}));
};

module.exports.findTasks = (req, res) => {
	task.findAll({
		where: {
			userId: Number(req.query.userId)
		},
		include: [
			{
				model: comment,
				attributes: []
			}
		],
		group: [sequelize.col('task.id')],
		attributes: [
			'id', 'title', 'checked', 'createdAt', 'text',
			[sequelize.fn('COUNT', sequelize.col('comments.taskId')), 'countComments']
		]
	}).then(tasks => {
		res.status(200).send({
			msg: 'Success!',
			tasks
		});
	}).catch(err => res.status(500).send({
		msg: 'Error!',
		trace: err
	}));
};

module.exports.findTasksToActual = (req, res) => {
	task.findAll({
		where: {
			checked: 0
		},
		include: [
			{
				model: comment,
				attributes: []
			},
			{
				model: user,
				attributes: ['id', 'name', 'login', 'avatar']
			}
		],
		group: [sequelize.col('task.id')],
		attributes: [
			'id', 'title', 'createdAt', 'text',
			[sequelize.fn('COUNT', sequelize.col('comments.taskId')), 'countComments']
		]
	}).then(tasks => {
		res.status(200).send({
			msg: 'Success!',
			tasks
		});
	}).catch(err => res.status(500).send({
		msg: 'Error!',
		trace: err
	}));
}

module.exports.findTask = (req, res) => {
	task.findByPk(req.params.taskId, {
		attributes: ['id', 'title', 'checked', 'createdAt', 'text']
	}).then(task => {
		res.status(200).send({
			msg: 'Success!',
			task
		});
	}).catch(err => res.send(500).send({
		msg: 'Error!',
		trace: err
	}));
};

module.exports.addTask = (req, res) => {
	task.create({
		title: req.body.title,
		checked: req.body.checked,
		text: req.body.text,
		userId: req.body.userId
	}, { model: user }).then(task => {
		res.status(200).send({
			msg: 'Success!',
			task
		});
	}).catch(err => res.send(500).send({
		msg: 'Error!',
		trace: err
	}));
};

module.exports.deleteTask = (req, res) => {
	task.destroy({
		where: {
			id: req.params.taskId,
			userId: req.params.userId
		}
	}).then(task => {
			res.status(200).send({
				msg: 'Success!',
				task
			});
	}).catch(err => res.send(500).send({
		msg: 'Error!',
		trace: err
	}));
};
