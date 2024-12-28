import { DataTypes } from 'sequelize'
import { sequelize } from '../db/index.js'

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vehicleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      'idle',
      'pending',
      'confirmed',
      'completed',
      'cancelled'
    ),
    defaultValue: 'idle',
  },
})

export default Booking
