import { Task } from '../../models/Task'
import { TaskBoard } from '../../models/TaskBoard'
import { handleErrors } from '../../utils/errorHandler'
import { StatusCodes } from 'http-status-codes'

export const createTask = async (req, res) => {
  const { name, taskboardId, description, position } = req.body

  try {
    const taskboard = await TaskBoard.findOne({ _id:taskboardId })
    if (!taskboard) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'taskboard not found' })
    }

    const task = await Task.create({
      name,
      creator: res.locals.user,
      description,
      taskboard,
      position
    })

    taskboard.tasks.push(task._id)
    const updateBoard = await taskboard.save()

    return res.status(StatusCodes.CREATED).json({ task })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

export const fetchAllTaskForCurrentUser = async (req, res) => {
  try {
    const tasks = await Task.find({ creator: res.locals.user }).populate('taskboard')

    if (tasks) {
      return res.status(StatusCodes.OK).json({ tasks })
    }

    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: 'no task found' })
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
    }).populate('taskboard')

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

export const updateTask = async (req, res) => {
  const { name, taskboardId, description, position } = req.body

  try {
    const taskboard = await TaskBoard.findOne({ _id:taskboardId })
    if (!taskboard) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'taskboard not found' })
    }

    const taskUpdated = await Task.findOneAndUpdate(
      { _id: req.params.taskId },
      { $set: { 
        name,
        description,
        taskboard,
        position
      } },
      { new: true },
    )
    
    if (!taskUpdated) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'task not found' })
    }

    return res.status(StatusCodes.OK).json({ task: taskUpdated })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const removedTask = await Task.remove({ _id:req.params.taskId })
    if (!removedTask) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'task not found' })
    }
    
    return res.status(StatusCodes.BAD_REQUEST).json({ success: 'task deleted.' })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

