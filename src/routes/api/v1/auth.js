import express from 'express'
import { login, register, requestPasswordReset, regenerateToken } from '../../../controllers/api/authController'

export const auth = express.Router()

auth.post('/login', login)
auth.post('/register', register)
auth.post('/password-reset', requestPasswordReset)
auth.post('/regenerate-token', regenerateToken)
