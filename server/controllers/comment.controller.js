const { task, user, comment } = require('../db/models/');

module.exports.findTaskComments = (req, res) => {
	comment.findAll({
		where: {
			taskId: Number(req.params.taskId)
		},
		include:[{
			model: user,
			attributes: ['id', 'name', 'login', 'avatar', 'admin']
		}],
		attributes: ['id', 'taskId', 'createdAt', 'text']
	}).then(comments => {
		res.status(200).send({
			msg: 'Success!',
			comments
		});
	}).catch(err => res.status(500).send({
		msg: 'Error!',
		trace: err
	}));
};

module.exports.countTaskComments = (req, res) => {
	comment.count({
		where: {
			taskId: Number(req.params.taskId)
		},
		distinct: true,
		include:[{
			model: task,
		}],
		col: 'id'
	}).then(data => {
		res.status(200).send({
			msg: 'Success',
			taskCommentsCount: data
		});
	}).catch(err => res.status(500).send({
		msg: 'Error!',
		trace: err
	}));
};

module.exports.addComment = (req, res) => {
	comment.create({
		userId: req.body.userId,
		taskId: req.body.taskId,
		text: req.body.text
	}).then(newComment => {
		newComment.getUser({
			attributes: ['id', 'name', 'login', 'avatar', 'admin']
		}).then(data => {
			res.status(200).send({
				message: 'Новый комментарий успешно добавлен',
				comment: {
					id: newComment.id,
					text: newComment.text,
					user: data,
					taskId: newComment.taskId,
					createdAt: newComment.createdAt,
				}
			});
		});
	}).catch(err => res.status(500).send({
		msg: 'Error!',
		trace: err
	}));
};
