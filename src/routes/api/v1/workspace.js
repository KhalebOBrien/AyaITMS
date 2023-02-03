import express from 'express'
import { createWorkspace, fetchUserWorkspaces, fetchWorkspaceById, fetchWorkspaceTaskList } from '../../../controllers/api/workspaceController'

export const WorkspaceRoutes = express.Router()

WorkspaceRoutes.post('/', createWorkspace)
WorkspaceRoutes.get('/', fetchUserWorkspaces)
WorkspaceRoutes.get('/:workspaceId', fetchWorkspaceById)
WorkspaceRoutes.get('/:workspaceId/tasks', fetchWorkspaceTaskList)