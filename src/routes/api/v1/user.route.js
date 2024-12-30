import { Router } from 'express'
import {
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
  verifyAccessToken,
} from '../../../controllers/api/v1/user.controller.js'
import { verifyJwt } from '../../../middlewares/auth.middleware.js'

const router = Router()

router.route('/').get(getAllUsers)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(verifyJwt,logoutUser)
router.route('/verify-access-token').get(verifyJwt, verifyAccessToken)

export default router
