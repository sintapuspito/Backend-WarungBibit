'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pesanandetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.product,{
        foreignKey: 'product_id',
        as: 'product'
      })
      this.belongsTo(models.pesanan,{
        foreignKey: 'pesanan_id',
        as: 'pesanan'
      })
    }
  }
  pesanandetail.init({
    product_id: DataTypes.INTEGER,
    pesanan_id: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pesanandetail',
  });
  return pesanandetail;
};