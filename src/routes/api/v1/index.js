import { Router } from 'express'
import userRouter from './user.route.js'
import vehicleRouter from './vehicle.route.js'
import vehicleTypeRouter from './vehicleType.route.js'
import bookingRouter from './booking.route.js'

const router = Router()

router.get('/', (_, res) => res.send('API v1 running !!'))
router.use('/users', userRouter)
router.use('/vehicles', vehicleRouter)
router.use('/vehicleTypes', vehicleTypeRouter)
router.use('/bookings', bookingRouter)

export default router
