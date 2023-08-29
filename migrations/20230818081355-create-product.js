'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kategori: {
        type: Sequelize.STRING
      },
      deskripsi: {
        type: Sequelize.STRING
      },
      manfaat:{
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      nama: {
        type: Sequelize.STRING
      },
      harga: {
        type: Sequelize.INTEGER
      },
      beratbersih: {
        type: Sequelize.INTEGER
      },
      isibenih: {
        type: Sequelize.INTEGER
      },
      masasemai: {
        type: Sequelize.INTEGER
      },
      masapertumbuhan: {
        type: Sequelize.INTEGER
      },
      lingkungantumbuh: {
        type: Sequelize.STRING
      },
      namailmiah: {
        type: Sequelize.STRING
      },
      family: {
        type: Sequelize.STRING
      },
      stok: {
        type: Sequelize.INTEGER
      },
      gambar: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};