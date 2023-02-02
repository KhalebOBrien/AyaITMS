import { Workspace } from "../../models/Workspace"
import { handleErrors } from '../../utils/errorHandler'
import { StatusCodes } from 'http-status-codes'

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

    return res.status(StatusCodes.CREATED).json({ workspace })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}
