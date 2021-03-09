const { Router } = require('express');
const { getJWTConfig } = require('../config/jwt');

const multer  = require('multer');
const storageConfig = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});
const upload = multer({
	storage: storageConfig,
	dest: 'uploads/'
});

const router = Router();

const UserController = require('../controllers/user.controller');

module.exports = (app) => {
	require('./auth')(router);
	require('./todos')(router);
	require('./users')(router, upload);
	require('./comments')(router);

	router.get('/users', UserController.all);

	app.use('/api/', router);
}
