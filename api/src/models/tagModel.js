import { Model } from 'sequelize';

export default function (sequelize, DataTypes) {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.Item, {
        through: models.ItemTag,
        foreignKey: 'tag_id',
        as: 'items'
      });
    }
  }

  Tag.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags',
    timestamps: true
  });

  return Tag;
}