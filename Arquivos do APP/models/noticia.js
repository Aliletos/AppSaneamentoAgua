'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Noticia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Noticia.belongsTo(models.User);
    }
  };
  Noticia.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    local: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Noticia',
  });
  return Noticia;
};