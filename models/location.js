// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Location extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Location.init({
//     name: DataTypes.STRING,
//     latitude: DataTypes.FLOAT,
//     longitude: DataTypes.FLOAT,
//     user_id: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Location',
//   });
//   return Location;
// };
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      // Location belongs to User
      Location.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      // Location has many WeatherData
      Location.hasMany(models.WeatherData, {
        foreignKey: 'location_id',
        as: 'weatherData'
      });
    }
  }
  Location.init({
    name: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Location',
    tableName: 'Locations'
  });
  return Location;
};
