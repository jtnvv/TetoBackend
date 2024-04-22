const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let users = [];

    for(let i = 0; i <= 20; i++){
      users = [
        ...users,
        {
          name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          email: faker.internet.email().toLowerCase(),
          password: await bcrypt.hash('pass123', 10),
          phone_number: '573' + faker.string.numeric(9),
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
         }
      ];
    }

    await queryInterface.bulkInsert('users', users, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', null, {});
  }
};
