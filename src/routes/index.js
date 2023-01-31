import express from 'express'
import { auth } from './v1/auth'

export const router = express.Router()

router.use('/auth', auth)
