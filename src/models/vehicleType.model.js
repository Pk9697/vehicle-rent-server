import { DataTypes } from 'sequelize'
import { sequelize } from '../db/index.js'

const VehicleType = sequelize.define('VehicleType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  category: {
    type: DataTypes.ENUM('car', 'bike'),
    allowNull: false,
  },
})

export default VehicleType
