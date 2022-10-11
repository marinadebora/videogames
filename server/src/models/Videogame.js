const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull:false,      
    },
    released:{//Fecha de lanzamiento
        type:DataTypes.STRING,
    },
    rating:{
      type:DataTypes.INTEGER
    },
    platform:{
      type:DataTypes.STRING,
      allowNull:false
    },
    createDB:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }

  }, {timestamps: false}
  );
};
