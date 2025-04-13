import { Model } from 'sequelize';

export default function (sequelize, DataTypes) {
  class ItemUser extends Model {
    static associate(models) {
    }
  }

  ItemUser.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'items',
        key: 'id'
      }
    },
    relation_type: {
      type: DataTypes.ENUM('CREATOR', 'RECEIVER'),
      allowNull: false,
      defaultValue: 'CREATOR'
    }
  }, {
    sequelize,
    modelName: 'ItemUser',
    tableName: 'item_user',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'item_id']
      }
    ]
  });

  return ItemUser;
}