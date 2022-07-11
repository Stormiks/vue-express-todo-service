module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('tasks', [{
			title: 'Task 1',
			text: 'Task 1 teeeeext',
			checked: false,
			userId: 1,
			createdAt: new Date(),
			updatedAt: new Date()
		}], {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('tasks', null, {});
	}
};
