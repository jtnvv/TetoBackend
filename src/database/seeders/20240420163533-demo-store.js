const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let stores = [];

    for (let i = 0; i <= 20; i++) {
      stores = [
        ...stores,
        {
          name: faker.person.firstName(),
          city: faker.location.city(),
          email: faker.internet.email().toLowerCase(),
          password: await bcrypt.hash('pass123', 10),
          phone_number: '573' + faker.string.numeric(9),
          description: faker.commerce.productDescription(),
          logo: faker.image.url(),
          role: 'brand',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ];
    }

    await queryInterface.bulkInsert('stores', stores, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stores', null, {});
  }
};
