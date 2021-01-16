const { sequelize, user, task } = require('../db/models/');


module.exports.profile = (req, res) => {
	user.findByPk(req.params.userId, {
		attributes: ['id', 'name', 'login', 'avatar', 'admin'],
		include:[{
			model: task
		}]
	}).then(user => {
		let countChecked = 0
		let countNotChecked = 0
		if (user.tasks.length) {
			const tasks = user.tasks
			user.tasks = {}
			console.log(user.tasks);

			tasks.forEach(t => {
				if (t.checked) countChecked ++
				else if (!t.checked) countNotChecked ++
			})
		}

		if (countChecked && countNotChecked) {
			user.tasks.countChecked = countChecked
			user.tasks.countNotChecked = countNotChecked
		}

		console.log(user.tasks);
		res.status(200).send({
			msg: 'Success!',
			user
		});
	}).catch(err => res.status(500).send({
		msg: 'Error!',
		trace: err
	}));
}

module.exports.updateProfile = (req, res) => {
	user.update({ avatar: `/file/${req.file.filename}` }, {
		where: {
			id: req.params.userId
		},
		fields: ['avatar']
	}).then(user => {
		res.status(200).send({
			msg: 'Success!',
			user
		});
	}).catch(err => res.status(500).send({
		msg: 'Error!',
		trace: err
	}));
}

module.exports.all = (req, res) => {
	user.findAll().then(users => {
		res.status(200).send(users)
	})
}
