const { Router } = require('express');
const { getJWTConfig } = require('../config/jwt')
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
const AuthController = require('../controllers/auth.controller');
const TaskController = require('../controllers/task.controller');
const UserController = require('../controllers/user.controller');
const CommentController = require('../controllers/comment.controller');

module.exports = (app) => {
	router.post('/login', AuthController.login);
	router.post('/register', AuthController.register);

	router.patch('/todos', TaskController.updateTask)
	router.get('/todos', getJWTConfig(), TaskController.findTasks);
	router.get('/todos/:taskId', TaskController.findTask);
	router.delete('/todos/del/:userId/:taskId', TaskController.deleteTask);
	router.post('/todos/add', TaskController.addTask);

	router.get('/todos/comments/:taskId', CommentController.findTaskComments);
	router.get('/todos/comments/count/:taskId', CommentController.countTaskComments);
	router.post('/comments/add', CommentController.addComment);

	router.get('/profile/:userId', UserController.profile);
	router.post('/profile/:userId', upload.single("image"), UserController.updateProfile);

	router.get('/users', UserController.all);

	app.use('/api/', router);
}
