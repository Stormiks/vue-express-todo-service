const { sequelize, user, task } = require('../db/models/');


module.exports.login = (req, res) => {
	user.findOne({
		where: {
			login: req.body.login,
			password: req.body.password
		},
		attributes: ['id', 'name', 'login', 'avatar', 'admin']
	}).then(user => {
		if (user)
			res.status(200).send({
				msg: 'Success!',
				user,
				timestamp: new Date()
			});
		else
			res.status(404).send({
				warning: 'Not found!',
			})
	}).catch(err => res.status(500).send({
		msg: 'Error!',
		trace: err
	}));
}

module.exports.register = (req, res) => {
	console.log(res.body);
	if (req.body.password !== req.body.passwordConfirm) return res.status(400)

	user.create({
		login: req.body.login,
		password: req.body.password,
		name: ''
	}).then(user => {
		res.status(200).send({
			msg: 'Success!',
			user,
			timestamp: new Date()
		})
	}).catch(err => res.status(500).send({
		msg: 'Error!',
		trace: err
	}));
}

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
