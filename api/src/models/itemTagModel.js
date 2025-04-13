import { Model } from 'sequelize';

export default function (sequelize, DataTypes) {
  class ItemTag extends Model {
    static associate(models) {
    }
  }

  ItemTag.init({
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'items',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tags',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'ItemTag',
    tableName: 'item_tag',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['item_id', 'tag_id']
      }
    ]
  });

  return ItemTag;
}