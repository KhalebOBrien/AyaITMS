export const registerView = (req, res) => {
  res.render('auth/register', { project_name: process.env.APP_NAME })
}

export const loginView = (req, res) => {
  res.render('auth/login', { project_name: process.env.APP_NAME })
}

export const forgotPasswordView = (req, res) => {
  res.render('auth/forgot-password', { project_name: process.env.APP_NAME })
}
