'use strict';
const bcrypt = require('bcrypt')
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // name: DataTypes.STRING,
    // password: DataTypes.STRING,
    // email: DataTypes.STRING,
    // role: DataTypes.STRING

    await queryInterface.bulkInsert('users',[
      {
        name: 'Admin Pokcoy',
        password: bcrypt.hashSync('password', 10),
        email: 'admin@gmail.com',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'User',
        password: bcrypt.hashSync('password', 10),
        email: 'user@gmail.com',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
