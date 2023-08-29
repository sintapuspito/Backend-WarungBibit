'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class keranjang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.keranjangdetail,{
        foreignKey: 'keranjang_id',
        as: 'keranjangdetail'
      })

      this.belongsTo(models.user,{
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }
  keranjang.init({
    total: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'keranjang',
  });
  return keranjang;
};