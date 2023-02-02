import express from 'express'
import { auth } from './v1/auth'
import { workspace } from './v1/workspace'
import { requiresAuth } from '../../middlewares/requireAuth'

export const ApiRoutes = express.Router()

ApiRoutes.use('/v1/auth', auth)
ApiRoutes.use('/v1/workspace', requiresAuth, workspace)
