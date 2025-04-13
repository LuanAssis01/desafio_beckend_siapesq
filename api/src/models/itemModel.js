import { Model } from 'sequelize';

export default function (sequelize, DataTypes) {
  class Item extends Model {
    static associate(models) {
      Item.belongsToMany(models.User, {
        through: models.ItemUser,
        foreignKey: 'item_id',
        as: 'users'
      });
      
      Item.belongsToMany(models.Tag, {
        through: models.ItemTag,
        foreignKey: 'item_id',
        as: 'tags'
      });
    }
  }

  Item.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'items',
    timestamps: true
  });

  return Item;
}