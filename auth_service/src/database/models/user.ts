// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class user extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   user.init({
//     user_name: DataTypes.STRING,
//     password: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'user',
//   });
//   return user;
// };

import {  DataTypes } from 'sequelize'
import { dbInstance } from '../config/db.config';
// const sequelize = new Sequelize('sqlite::memory:');

const userModel = dbInstance.define(
  'user',
  {
    // Model attributes are defined here
    user_name: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    timestamps: true,
    underscored: true
  },
);

export default userModel