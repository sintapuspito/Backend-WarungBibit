'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    
    }
  }
  product.init({
    nama: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    kategori: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    manfaat: DataTypes.ARRAY(DataTypes.TEXT),
    beratbersih: DataTypes.INTEGER,
    isibenih: DataTypes.INTEGER,
    masasemai: DataTypes.INTEGER,
    masapertumbuhan: DataTypes.INTEGER,
    lingkungantumbuh: DataTypes.STRING,
    namailmiah: DataTypes.STRING,
    family: DataTypes.STRING,
    stok: DataTypes.INTEGER,
    gambar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};