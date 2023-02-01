import express from 'express'
import { registerView, loginView, forgotPasswordView } from '../../controllers/web/authController'

export const WebRoutes = express.Router()

WebRoutes.get('/', (req, res) => {
  res.render('index', { app_name: process.env.APP_NAME })
})

WebRoutes.get('/register', registerView)
WebRoutes.get('/login', loginView)
WebRoutes.get('/forgot-password', forgotPasswordView)

