import { Router } from 'express'
import {
  getAllVehicles,
  getAvailableVehiclesByVehicleTypeId,
} from '../../../controllers/api/v1/vehicle.controller.js'

const router = Router()

router.route('/').get(getAllVehicles)
router
  .route('/vehicleTypeId/:vehicleTypeId')
  .get(getAvailableVehiclesByVehicleTypeId)

export default router
