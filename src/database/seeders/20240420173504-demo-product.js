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
          colors: faker.helpers.arrayElements(["Rojo", "Negro", "Blanco", "Verde", "Azul", "Amarillo", "Magenta", "Cian", "Gris", "Naranja", "Rosa"]),
          sizes: faker.helpers.arrayElements(["XS", "S", "M", "L", "XL", "2XL"]),
          price: faker.commerce.price({min: 10000, max: 500000}),
          photo: faker.image.url(),
          rating: 0,
          categories: faker.helpers.arrayElements(["Casual", "Formal", "Deportiva", "Interior", "Dormir", "Baño", "Laboral", "Fiesta", "Accesorios"]),
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
