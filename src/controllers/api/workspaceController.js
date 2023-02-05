import { Workspace } from "../../models/Workspace"
import { handleErrors } from '../../utils/errorHandler'
import { StatusCodes } from 'http-status-codes'
import { TaskBoard } from "../../models/TaskBoard"
import { ETaskStatus } from "../../enums/ETaskStatus"

export const createWorkspace = async (req, res) => {
  const { name, purpose, members } = req.body

  try {
    console.log(res.locals.user)
    const workspace = await Workspace.create({
      name,
      owner: res.locals.user,
      purpose,
      members
    })

    if (workspace) {
      Object.keys(ETaskStatus).map(async board => {
        let color = (board=='INPROGRESS'?'#ffaf00':'018b01')
        const defaultTaskboard = await TaskBoard.create({
          title: board.toUpperCase(),
          creator: res.locals.user,
          workspace: workspace,
          color: (board=='TODO'?'#90a4ae':color)
        })
      });
    }

    return res.status(StatusCodes.CREATED).json({ workspace })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

export const fetchUserWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({ owner: res.locals.user })

    if (workspaces) {
      return res.status(StatusCodes.OK).json({ workspaces })
    }
    
    return res.status(StatusCodes.NOT_FOUND).json({ error: "no workspace found" })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

export const fetchWorkspaceById = async (req, res) => {
  try {
    const workspace = await Workspace.findOne({ _id: req.params.workspaceId, owner: res.locals.user })

    if (workspace) {
      return res.status(StatusCodes.OK).json({ workspace })
    }
    
    return res.status(StatusCodes.NOT_FOUND).json({ error: "workspace not found" })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

export const createTaskboard = async (req, res) => {
  const { title, description, workspaceId, color, tasks } = req.body

  try {
    console.log(res.locals.user)
    const taskboard = await TaskBoard.create({
      title,
      description,
      creator: res.locals.user,
      workspace: workspaceId,
      color,
      tasks
    })

    return res.status(StatusCodes.CREATED).json({ taskboard })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

export const fetchWorkspaceTaskBoard = async (req, res) => {
  try {
    const taskboards = await TaskBoard.find({ workspace: req.params.workspaceId, creator: res.locals.user })

    if (taskboards) {
      return res.status(StatusCodes.OK).json({ taskboards })
    }
    
    return res.status(StatusCodes.NOT_FOUND).json({ error: "no taskboard found for workspace" })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

export const fetchTaskboardById = async (req, res) => {
  try {
    const taskboard = await TaskBoard.findOne({ _id: req.params.taskboardId, creator: res.locals.user })

    if (taskboard) {
      return res.status(StatusCodes.OK).json({ taskboard })
    }
    
    return res.status(StatusCodes.NOT_FOUND).json({ error: "taskboard not found" })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}
