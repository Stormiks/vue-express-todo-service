const { sequelize, user, task } = require('../db/models/');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt')

function genJWTToken({ id, login }) {
	return jsonwebtoken.sign({
		id,
		login
	}, process.env.SECRET_JWT);
}


module.exports.login = (req, res) => {
	user.findOne({
		where: {
			login: req.body.login
		},
		attributes: ['id', 'name', 'login', 'avatar', 'admin', 'password']
	}).then(user => {
		if (user) {
			const passIsValid = bcrypt.compareSync(req.body.password, user.password)

			if (!passIsValid)
				return res.status(401).send({
					error: 'Неверный логин или пароль',
					token: null
				});

			delete user.password;

			const token = genJWTToken({ id: user.id, login: user.login });

			if (token)
				res.status(200).send({
					msg: 'Success!',
					user,
					timestamp: new Date(),
					token: `Bearer ${token}`
				});
		} else
			res.status(404).send({
				error: 'Данный пользователь не найден!'
			});
	}).catch(err => res.status(500).send({
		msg: 'Error!',
		trace: err
	}));
};

module.exports.register = (req, res) => {
	if (req.body.password !== req.body.passwordConfirm)
		return res.status(401).send({ error: 'Неверная пара: "пароль, повторите пароль"', token: null });

	user.create({
		login: req.body.login,
		password: bcrypt.hashSync(req.body.password, 8),
		admin: 0,
		name: ''
	}).then(user => {
		const token = genJWTToken({ id: user.id, login: user.login });

		delete user.password;

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
