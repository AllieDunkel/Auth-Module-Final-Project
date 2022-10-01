'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('cats', {
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};