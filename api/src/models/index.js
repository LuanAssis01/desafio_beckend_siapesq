import Sequelize from 'sequelize';
import userModel from './userModel.js';
import itemModel from './itemModel.js';
import tagModel from './tagModel.js';
import itemUserModel from './itemUserModel.js';
import itemTagModel from './itemTagModel.js';
import dbConfig from '../config/database.js';

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {
  User: userModel(sequelize, Sequelize.DataTypes),
  Item: itemModel(sequelize, Sequelize.DataTypes),
  Tag: tagModel(sequelize, Sequelize.DataTypes),
  ItemUser: itemUserModel(sequelize, Sequelize.DataTypes),
  ItemTag: itemTagModel(sequelize, Sequelize.DataTypes),
  sequelize,
  Sequelize
};

// Configura as associações
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;