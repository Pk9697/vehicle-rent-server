import { Router } from 'express'
import { getVehicleTypesByWheels } from '../../../controllers/api/v1/vehicleType.controller.js'

const router = Router()

router.route('/:wheels').get(getVehicleTypesByWheels)

export default router
