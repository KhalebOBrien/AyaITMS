import { Task } from '../../models/Task'
import { TaskBoard } from '../../models/TaskBoard'
import { handleErrors } from '../../utils/errorHandler'
import { StatusCodes } from 'http-status-codes'

export const createTask = async (req, res) => {
  const { name, purpose, members } = req.body

  try {
    console.log(res.locals.user)
    const workspace = await Workspace.create({
      name,
      owner: res.locals.user,
      purpose,
      members,
    })

    if (workspace) {
      Object.keys(ETaskStatus).map(async (board) => {
        let color = board == 'INPROGRESS' ? '#ffaf00' : '018b01'
        const defaultTaskboard = await TaskBoard.create({
          title: board.toUpperCase(),
          creator: res.locals.user,
          workspace: workspace,
          color: board == 'TODO' ? '#90a4ae' : color,
        })
      })
    }

    return res.status(StatusCodes.CREATED).json({ workspace })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

export const fetchAllTaskForCurrentUser = async (req, res) => {
  try {
    const tasks = await Task.find({ creator: res.locals.user })

    if (tasks) {
      return res.status(StatusCodes.OK).json({ tasksy })
    }

    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: 'no workspace found' })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

export const fetchTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.taskId,
      creator: res.locals.user,
    })

    if (task) {
      return res.status(StatusCodes.OK).json({ task })
    }

    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: 'task not found' })
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
      tasks,
    })

    return res.status(StatusCodes.CREATED).json({ taskboard })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

export const fetchWorkspaceTaskBoard = async (req, res) => {
  try {
    const taskboards = await TaskBoard.find({
      workspace: req.params.workspaceId,
      creator: res.locals.user,
    })

    if (taskboards) {
      return res.status(StatusCodes.OK).json({ taskboards })
    }

    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: 'no taskboard found for workspace' })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}
