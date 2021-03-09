const AuthController = require('../controllers/auth.controller');

module.exports = router => {
	router.post('/login', AuthController.login);
	router.post('/register', AuthController.register);
}
