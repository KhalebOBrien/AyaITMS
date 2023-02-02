import express from 'express'
import { createWorkspace, fetchUserWorkspaces } from '../../../controllers/api/workspaceController'

export const workspace = express.Router()

workspace.post('/', createWorkspace)
workspace.get('/', fetchUserWorkspaces)
