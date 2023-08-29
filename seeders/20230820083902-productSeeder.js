'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('products', [
      {
        nama: "Benih Okra",
        kategori: "Benih",
        harga: 9000,
        beratbersih: 25,
        isibenih: 10,
        masasemai: 3,
        masapertumbuhan: 30,
        lingkungantumbuh: " Cocok ditanam di dataran rendah hingga sedang (1-800 mdpl), rentang suhu 27-30 derajat celsius",
        namailmiah: "Abelmoschus esculentus L. Moench",
        family: "Malvaceae",
        stok: 99,
        gambar: "https://i0.wp.com/dekoruma.blog/wp-content/uploads/2018/07/Bibit-Cabai.jpg?resize=1000%2C750&ssl=1",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
