// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class WeatherData extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   WeatherData.init({
//     temperature: DataTypes.FLOAT,
//     date_time: DataTypes.DATE,
//     location_id: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'WeatherData',
//   });
//   return WeatherData;
// };
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WeatherData extends Model {
    static associate(models) {
      WeatherData.belongsTo(models.Location, {
        foreignKey: 'location_id',
        as: 'location'
      });
    }
  }
  WeatherData.init({
    temperature: DataTypes.FLOAT,
    date_time: DataTypes.DATE,
    location_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WeatherData',
    tableName: 'WeatherData'
  });
  return WeatherData;
};

