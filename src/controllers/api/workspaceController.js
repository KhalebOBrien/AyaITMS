import { Workspace } from "../../models/Workspace"

export const createWorkspace = async (req, res) => {
  const { name, purpose, members } = req.body

  try {
    const workspace = await Workspace.create({
      name,
      owner: res.locals.user._id,
      purpose,
      members
    })

    return res.status(StatusCodes.CREATED).json({ workspace })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}
