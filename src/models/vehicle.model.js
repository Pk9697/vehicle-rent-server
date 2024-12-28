import { DataTypes } from 'sequelize'
import { sequelize } from '../db/index.js'

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  registrationNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  vehicleTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

export default Vehicle
