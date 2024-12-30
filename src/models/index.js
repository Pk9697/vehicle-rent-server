import User from './user.model.js'
import VehicleType from './vehicleType.model.js'
import Vehicle from './vehicle.model.js'
import Booking from './booking.model.js'

VehicleType.hasMany(Vehicle, { foreignKey: 'vehicleTypeId' })
Vehicle.belongsTo(VehicleType, {
  foreignKey: 'vehicleTypeId',
  as: 'vehicleType',
})

User.hasMany(Booking, { foreignKey: 'userId', as: 'userDetails' })
Booking.belongsTo(User, { foreignKey: 'userId', as: 'userDetails' })

Vehicle.hasMany(Booking, { foreignKey: 'vehicleId', as: 'vehicleDetails' })
Booking.belongsTo(Vehicle, { foreignKey: 'vehicleId', as: 'vehicleDetails' })

export { User, VehicleType, Vehicle, Booking }
