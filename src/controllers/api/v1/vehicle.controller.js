import { Vehicle, VehicleType } from '../../../models/index.js'
import { ApiResponse } from '../../../utils/ApiResponse.js'
import { asyncHandler } from '../../../utils/asyncHandler.js'

const getAllVehicles = asyncHandler(async (_, res) => {
  const vehicles = await Vehicle.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: VehicleType,
        as: 'vehicleType',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
    // where: { isAvailable: true },
  })

  return res
    .status(200)
    .json(new ApiResponse(200, vehicles, 'Vehicles fetched successfully'))
})

const getAvailableVehiclesByVehicleTypeId = asyncHandler(async (req, res) => {
  const { vehicleTypeId } = req.params
  const vehicles = await Vehicle.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: VehicleType,
        as: 'vehicleType',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
    where: { vehicleTypeId },
    // where: { vehicleTypeId, isAvailable: true },
  })

  return res
    .status(200)
    .json(new ApiResponse(200, vehicles, 'Vehicles fetched successfully'))
})

export { getAllVehicles, getAvailableVehiclesByVehicleTypeId }
