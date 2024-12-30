import { Booking, User, Vehicle, VehicleType } from '../../../models/index.js'
import { ApiResponse } from '../../../utils/ApiResponse.js'
import { ApiError } from '../../../utils/ApiError.js'
import { asyncHandler } from '../../../utils/asyncHandler.js'
import { Op } from 'sequelize'

const createBooking = asyncHandler(async (req, res) => {
  const { id: userId } = req.user
  const { vehicleId, startDate, endDate, firstName, lastName } = req.body

  if (!vehicleId || !startDate || !endDate || !firstName || !lastName) {
    throw new ApiError(400, 'Vehicle ID, start date, and end date are required')
  }

  const vehicle = await Vehicle.findByPk(vehicleId)
  if (!vehicle) {
    throw new ApiError(404, 'Vehicle not found!')
  }

  if (!vehicle.isAvailable) {
    throw new ApiError(400, 'Vehicle is not available for booking')
  }

  // Check for overlapping bookings
  const overlappingBookings = await Booking.findOne({
    where: {
      vehicleId,
      status: 'confirmed',
      [Op.or]: [
        {
          startDate: {
            [Op.between]: [startDate, endDate],
          },
        },
        {
          endDate: {
            [Op.between]: [startDate, endDate],
          },
        },
      ],
    },
  })

  if (overlappingBookings) {
    return res.status(400).json({
      error: 'Vehicle is not available for the selected dates',
    })
  }

  const booking = await Booking.create(
    {
      firstName,
      lastName,
      vehicleId,
      userId,
      startDate,
      endDate,
      status: 'confirmed',
    },
    {
      include: [
        {
          model: Vehicle,
          as: 'vehicleDetails',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
            {
              model: VehicleType,
              as: 'vehicleType',
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
          ],
        },
      ], // You can add any associated models here if needed
    }
  )

  //   await Vehicle.update({ isAvailable: false }, { where: { id: vehicleId } })

  return res
    .status(201)
    .json(new ApiResponse(201, booking, 'Booking created successfully'))
})

const getAllBookings = asyncHandler(async (_, res) => {
  const bookings = await Booking.findAll({
    include: [
      {
        model: Vehicle,
        as: 'vehicleDetails',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
          {
            model: VehicleType,
            as: 'vehicleType',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
      },
      {
        model: User,
        as: 'userDetails',
        attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
      },
    ],
  })

  return res
    .status(200)
    .json(new ApiResponse(200, bookings, 'Bookings fetched successfully'))
})

const getBookingsByUserId = asyncHandler(async (req, res) => {
  const { id: userId } = req.user
  const bookings = await Booking.findAll({
    where: { userId },
    include: [
      {
        model: Vehicle,
        as: 'vehicleDetails',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
          {
            model: VehicleType,
            as: 'vehicleType',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
      },
    ],
  })

  return res
    .status(200)
    .json(new ApiResponse(200, bookings, 'User Bookings fetched successfully'))
})

const getVehicleBookedDates = asyncHandler(async (req, res) => {
  const { vehicleId } = req.params
  const bookings = await Booking.findAll({
    where: { vehicleId },
    attributes: ['startDate', 'endDate'],
  })

  return res
    .status(200)
    .json(
      new ApiResponse(200, bookings, 'Vehicle Bookings fetched successfully')
    )
})

export {
  createBooking,
  getAllBookings,
  getBookingsByUserId,
  getVehicleBookedDates,
}
