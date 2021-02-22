const { sequelize, user, task } = require('../db/models/');
const jsonwebtoken = require('jsonwebtoken');

function genJWTToken({ id, login }) {
	return jsonwebtoken.sign({
		id,
		login
	}, process.env.SECRET_JWT);
}


module.exports.login = (req, res) => {
	user.findOne({
		where: {
			login: req.body.login,
			password: req.body.password
		},
		attributes: ['id', 'name', 'login', 'avatar', 'admin']
	}).then(user => {
		if (user) {
			const token = genJWTToken({ id: user.id, login: user.login });

			if (token)
				res.status(200).send({
					msg: 'Success!',
					user,
					timestamp: new Date(),
					token: `Bearer ${token}`
				});
		}
		else
			res.status(404).send({
				warning: 'Not found!',
			});
	}).catch(err => res.status(500).send({
		msg: 'Error!',
		trace: err
	}));
};

module.exports.register = (req, res) => {
	if (req.body.password !== req.body.passwordConfirm) return res.status(400);

	user.create({
		login: req.body.login,
		password: req.body.password,
		name: ''
	}).then(user => {
		const token = genJWTToken({ id: user.id, login: user.login });

		if (token)
			res.status(200).send({
				msg: 'Success!',
				user,
				timestamp: new Date(),
				token: `Bearer ${token}`
			});
	}).catch(err => res.status(500).send({
		msg: 'Error!',
		trace: err
	}));
};
