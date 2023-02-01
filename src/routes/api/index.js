import express from 'express'
import { auth } from './v1/auth'

export const ApiRoutes = express.Router()

ApiRoutes.use('/v1/auth', auth)
