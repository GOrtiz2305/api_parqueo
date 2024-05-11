'use strict';
const { type } = require('os');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tickets extends Model {
    static associate(models) {
    }
  };
  tickets.init({
    centro_comercial: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    correlativo:{ 
      type: DataTypes.STRING(255),
    },
    numero_vehiculo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    timestamp_entrada: {
      type: DataTypes.DATE,
      allowNull: true
    },
    timestamp_salida: {
      type: DataTypes.DATE,
      allowNull: true
    },
    total_pagar: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(20),
      defaultValue: 'PENDIENTE'
    }
  }, {
    sequelize,
    modelName: 'tickets',
    timestamps: false,
  });
  return tickets;
};