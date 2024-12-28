import jwt from 'jsonwebtoken'
import { asyncHandler } from '../../../utils/asyncHandler.js'
import { ApiError } from '../../../utils/ApiError.js'
import { ApiResponse } from '../../../utils/ApiResponse.js'
import { User } from '../../../models/index.js'

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if ([name, email, password].some((field) => !field || field?.trim === '')) {
    throw new ApiError(400, 'Name, Email and Password fields are required')
  }

  const isExistingUser = await User.findOne({
    where: { email },
  })
  if (isExistingUser) {
    throw new ApiError(409, 'User with this email already exists!')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  return res
    .status(201)
    .json(new ApiResponse(200, user, 'User registered successfully'))
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if ([email, password].some((field) => !field || field?.trim === '')) {
    throw new ApiError(400, 'Email and Password fields are required')
  }

  const isExistingUser = await User.findOne({
    where: { email },
  })
  if (!isExistingUser) {
    throw new ApiError(404, 'User with this email does not exist!')
  }

  if (isExistingUser.password !== password) {
    throw new ApiError(401, 'Password is incorrect!')
  }

  const accessToken = jwt.sign(
    {
      id: isExistingUser.id,
      name: isExistingUser.name,
      email: isExistingUser.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  )

  const options = {
    httpOnly: true,
    secure: true,
  }

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: isExistingUser,
          accessToken,
        },
        'Logged in successfully'
      )
    )
})

const getAllUsers = asyncHandler(async (_, res) => {
  const users = await User.findAll({
    attributes: ['name', 'email'],
  })
  return res.status(200).json(new ApiResponse(200, users))
})

export { registerUser, loginUser, getAllUsers }
