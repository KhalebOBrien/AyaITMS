import express from 'express'
import { githubAuthService } from '../../config/githubAuth'
import { login } from '../../controllers/authController'

export const auth = express.Router()

auth.post('/login', login)
auth.post('/register', register)
