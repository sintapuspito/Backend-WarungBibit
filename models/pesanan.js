'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.pesanandetail,{
        foreignKey: 'pesanan_id',
        as: "pesanandetail"
      })

      this.belongsTo(models.user,{
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }
 
  pesanan.init({
    total: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    notelp: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    buktibayar: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pesanan',
  });
  return pesanan;
};