import express from 'express'
import { createWorkspace } from '../../../controllers/api/workspaceController'

export const workspace = express.Router()

workspace.post('/', createWorkspace)
