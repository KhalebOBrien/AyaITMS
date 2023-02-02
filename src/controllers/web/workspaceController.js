export const workspaceView = (req, res) => {
  res.render('workspace/index', { project_name: process.env.APP_NAME })
}
