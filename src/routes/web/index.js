import express from 'express'
import { registerView, loginView, forgotPasswordView, setNewPasswordView } from '../../controllers/web/authController'
import { workspaceView } from '../../controllers/web/workspaceController'
import { validateResetLink } from '../../middlewares/validateResetLink'

export const WebRoutes = express.Router()

WebRoutes.get('/', (req, res) => {
  res.render('index', { app_name: process.env.APP_NAME })
})

WebRoutes.get('/signup', registerView)
WebRoutes.get('/login', loginView)
WebRoutes.get('/forgot-password', forgotPasswordView)
WebRoutes.get('/set-new-password', validateResetLink, setNewPasswordView)

WebRoutes.get('/workspace', workspaceView)
