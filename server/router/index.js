const { Router } = require('express');
const multer  = require('multer')
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
})
const router = Router();
const TaskController = require('../controllers/task.controller');
const UserController = require('../controllers/user.controller');
const CommentController = require('../controllers/comment.controller');
const fs = require('fs')
const path = require('path')

module.exports = (app) => {
  router.patch('/todos', TaskController.updateTask)
  router.get('/todos', TaskController.findTasks);
  router.get('/todos/:taskId', TaskController.findTask);
  router.delete('/todos/del/:userId/:taskId', TaskController.deleteTask);
	router.post('/todos/add', TaskController.addTask);

  router.get('/todos/comments/:taskId', CommentController.findTaskComments);
  router.post('/comments/add', CommentController.addComment);

  router.get('/profile/:userId', UserController.profile)
  router.post('/profile/:userId', upload.single("image"), UserController.updateProfile)

  router.post('/login', UserController.login);
  router.post('/register', UserController.register);
  router.get('/users', UserController.all)

  app.use('/api/', router);
}
