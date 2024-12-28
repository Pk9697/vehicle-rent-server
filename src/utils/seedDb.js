import { sequelize } from '../db/index.js'
import { User, VehicleType, Vehicle, Booking } from '../models/index.js'

async function seedDb() {
  try {
    await sequelize.sync({ force: true })

    // Create vehicle types
    const vehicleTypes = [
      { name: 'hatchback', category: 'car' },
      { name: 'suv', category: 'car' },
      { name: 'sedan', category: 'car' },
      { name: 'cruiser', category: 'bike' },
    ]

    await VehicleType.bulkCreate(vehicleTypes)

    // Create vehicles for each type
    const vehicles = [
      // Hatchback vehicles
      { model: 'Swift', registrationNumber: 'KA01AB1234', vehicleTypeId: 1 },
      { model: 'i20', registrationNumber: 'KA01CD5678', vehicleTypeId: 1 },

      // SUV vehicles
      { model: 'Creta', registrationNumber: 'KA02EF9012', vehicleTypeId: 2 },
      { model: 'Seltos', registrationNumber: 'KA02GH3456', vehicleTypeId: 2 },

      // Sedan vehicles
      { model: 'City', registrationNumber: 'KA03IJ7890', vehicleTypeId: 3 },
      { model: 'Verna', registrationNumber: 'KA03KL1234', vehicleTypeId: 3 },

      // Bike vehicles
      {
        model: 'Royal Enfield',
        registrationNumber: 'KA04MN5678',
        vehicleTypeId: 4,
      },
      {
        model: 'Harley Davidson',
        registrationNumber: 'KA04OP9012',
        vehicleTypeId: 4,
      },
    ]

    await Vehicle.bulkCreate(vehicles)

    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}

export { seedDb }
