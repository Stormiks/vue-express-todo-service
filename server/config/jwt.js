// const jsonwebtoken = require('jsonwebtoken');
const exjwt = require('express-jwt');

module.exports.getJWTConfig = () => {
	return exjwt({
		secret: process.env.SECRET_JWT,
		algorithms: ['HS256']
	})
}
