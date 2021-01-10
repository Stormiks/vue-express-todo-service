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

module.exports.addComment = (req, res) => {
	comment.create({
		userId: req.body.userId,
		taskId: req.body.taskId,
		text: req.body.text
	}).then(newComment => {
		newComment.getUser({
			attributes: ['id', 'name', 'login', 'avatar', 'admin']
		}).then(sata => {
			res.status(200).send({
				id: newComment.id,
				text: newComment.text,
				user: sata,
				taskId: newComment.taskId,
				createdAt: newComment.createdAt,
			})
		})
	}).catch(err => res.status(500).send({
		msg: 'Error!',
		trace: err
	}));
}
