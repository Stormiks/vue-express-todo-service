const CommentController = require('../controllers/comment.controller');

module.exports = router => {
	router.get('/todos/comments/:taskId', CommentController.findTaskComments);
	router.get('/todos/comments/count/:taskId', CommentController.countTaskComments);
	router.post('/comments/add', CommentController.addComment);
}
