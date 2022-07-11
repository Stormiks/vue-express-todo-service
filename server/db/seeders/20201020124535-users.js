const bcrypt = require('bcrypt')

function hashPass(password) {
	return bcrypt.hashSync(password, 8)
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('users', [{
			login: 'John_Doe',
			name: 'John Doe',
			password: hashPass('123456'),
			avatar: '',
			admin: 0,
			createdAt: new Date(),
			updatedAt: new Date()
		},{
			login: 'admin',
			name: 'Admin',
			password: hashPass('12345678'),
			avatar: '',
			admin: 1,
			createdAt: new Date(),
			updatedAt: new Date()
		}], {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('users', null, {});
	}
};
