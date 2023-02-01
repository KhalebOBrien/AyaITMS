import express from 'express'
import { login, register, requestPasswordReset, setNewPassword, regenerateToken } from '../../../controllers/api/authController'

export const auth = express.Router()

auth.post('/login', login)
auth.post('/register', register)
auth.post('/request-password-reset', requestPasswordReset)
auth.post('/reset-password', setNewPassword)
auth.post('/regenerate-token', regenerateToken)
