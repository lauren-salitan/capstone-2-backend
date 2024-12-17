'use strict';
const bcrypt = require('bcryptjs');
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Location, {
        foreignKey: 'user_id',
        as: 'locations'
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false 
  });
  return User;
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      username: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      }
  }, {});

  User.beforeSave(async (user, options) => {
      if (user.password) {
          user.password = await bcrypt.hash(user.password, 8);
      }
  });

  return User;
};