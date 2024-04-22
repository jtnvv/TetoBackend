const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let items = [];

    for (let i = 0; i <= 20; i++) {
      items = [
        ...items,
        {
          name: faker.string.alpha(10),
          colors: faker.helpers.arrayElements(["rojo", "negro", "blanco", "verde", "azul", "amarillo", "magenta", "cian", "gris", "naranja", "rosa"]),
          sizes: faker.helpers.arrayElements(["xs", "s", "m", "l", "xl", "2xl"]),
          price: faker.commerce.price({min: 10000, max: 500000}),
          photo: faker.image.url(),
          rating: 0,
          categories: faker.helpers.arrayElements(["unisex", "pantalones", "zapatos"]),
          stock: faker.number.int(1000),
          priority: faker.number.int({ min: 1, max: 3 }),
          store_id: faker.number.int({ min: 1, max: 10 }),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ];
    }

    await queryInterface.bulkInsert('items', items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('items', null, {});
  }
};
