import express from 'express'
import { createWorkspace, fetchUserWorkspaces, fetchWorkspaceById, fetchWorkspaceTaskBoard, createTaskboard, fetchTaskboardById } from '../../../controllers/api/workspaceController'

export const WorkspaceRoutes = express.Router()

WorkspaceRoutes.post('/', createWorkspace)
WorkspaceRoutes.get('/', fetchUserWorkspaces)
WorkspaceRoutes.get('/:workspaceId', fetchWorkspaceById)
WorkspaceRoutes.get('/:workspaceId/taskboards', fetchWorkspaceTaskBoard)
WorkspaceRoutes.post('/:workspaceId/taskboards', createTaskboard)
WorkspaceRoutes.get('/:workspaceId/taskboards/:taskboardId', fetchTaskboardById)
// WorkspaceRoutes.get('/:workspaceId/taskboards', fetchWorkspaceTaskBoard)