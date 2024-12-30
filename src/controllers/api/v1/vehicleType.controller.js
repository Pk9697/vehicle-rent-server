import { VehicleType } from '../../../models/index.js'
import { ApiResponse } from '../../../utils/ApiResponse.js'
import { asyncHandler } from '../../../utils/asyncHandler.js'

const getVehicleTypesByWheels = asyncHandler(async (req, res) => {
  const { wheels } = req.params
  const category = wheels === '4' ? 'car' : 'bike'
  const vehicleTypes = await VehicleType.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { category },
  })

  return res
    .status(200)
    .json(
      new ApiResponse(200, vehicleTypes, 'Vehicle types fetched successfully')
    )
})

export { getVehicleTypesByWheels }
