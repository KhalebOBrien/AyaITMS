import express from 'express'
import { login, register } from '../../../controllers/api/authController'

export const auth = express.Router()

auth.post('/login', login)
auth.post('/register', register)
