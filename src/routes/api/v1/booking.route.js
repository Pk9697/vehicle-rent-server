import { Router } from 'express'
import {
  createBooking,
  getAllBookings,
  getBookingsByUserId,
  getVehicleBookedDates,
} from '../../../controllers/api/v1/booking.controller.js'
import { verifyJwt } from '../../../middlewares/auth.middleware.js'

const router = Router()

router.route('/').get(getAllBookings)
router.route('/create').post(verifyJwt, createBooking)
router.route('/user').get(verifyJwt, getBookingsByUserId)
router.route('/vehicles/:vehicleId').get(getVehicleBookedDates)

export default router
