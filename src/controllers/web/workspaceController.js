export const workspaceView = (req, res) => {
  res.render('workspace/index', { project_name: process.env.APP_NAME })
}

export const taskListView = (req, res) => {
  res.render('workspace/task-list', { project_name: process.env.APP_NAME, workspaceId: req.params.workspaceId })
}

