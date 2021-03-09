const UserController = require('../controllers/user.controller');

module.exports = (router, upload) => {
	router.get('/profile/:userId', UserController.profile);
	router.post('/profile/:userId', upload.single("image"), UserController.updateProfile);
}
