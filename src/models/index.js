import User from './user.model.js'
import VehicleType from './vehicleType.model.js'
import Vehicle from './vehicle.model.js'
import Booking from './booking.model.js'

VehicleType.hasMany(Vehicle, { foreignKey: 'vehicleTypeId' })
Vehicle.belongsTo(VehicleType, { foreignKey: 'vehicleTypeId' })

User.hasMany(Booking, { foreignKey: 'userId' })
Booking.belongsTo(User, { foreignKey: 'userId' })

Vehicle.hasMany(Booking, { foreignKey: 'vehicleId' })
Booking.belongsTo(Vehicle, { foreignKey: 'vehicleId' })

export { User, VehicleType, Vehicle, Booking }
