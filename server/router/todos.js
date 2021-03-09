const TaskController = require('../controllers/task.controller');

module.exports = router => {
	router.patch('/todos', TaskController.updateTask)
	router.get('/todos', TaskController.findTasks);
	router.get('/todos/active', TaskController.findTasksToActual);
	router.get('/todos/:taskId', TaskController.findTask);
	router.delete('/todos/del/:userId/:taskId', TaskController.deleteTask);
	router.post('/todos/add', TaskController.addTask);
}
