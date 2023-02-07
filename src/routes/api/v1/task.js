import express from 'express'
import { createTask, updateTask, deleteTask } from '../../../controllers/api/taskController'

export const TaskRoutes = express.Router()

TaskRoutes.post('/', createTask)
// TaskRoutes.get('/', fetchUserWorkspaces)
// TaskRoutes.get('/:workspaceId', fetchWorkspaceById)
TaskRoutes.patch('/:taskId', updateTask)
TaskRoutes.delete('/:taskId', deleteTask)
// TaskRoutes.get('/:workspaceId/taskboards', fetchWorkspaceTaskBoard)
// TaskRoutes.post('/:workspaceId/taskboards', createTaskboard)
// TaskRoutes.get('/:workspaceId/taskboards/:taskboardId', fetchTaskboardById)
// WorkspaceRoutes.post('/:workspaceId/taskboards', fetchWorkspaceTaskBoard)