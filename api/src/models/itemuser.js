'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemUser.init({
    user_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER,
    relation_type: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'ItemUser',
  });
  return ItemUser;
};