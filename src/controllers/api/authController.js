import { User } from '../../models/User'
import { createToken } from '../../utils/createJwt'
import { handleErrors } from '../../utils/errorHandler'
import { hashPassword } from '../../utils/hashPassword'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'

export const login = async (req, res) => {
  const { email, password, remember_me } = req.body

  try {
    const user = await User.findOne({ email: email })
    if (!user) {
      throw Error('invalid credentials')
    }

    if (user.password && user.password.length > 0) {
      const pwd = await bcrypt.compare(password, user.password)
      if (pwd) {
        const token = createToken({
          id: user._id,
          remember_me,
        })
        return res.status(StatusCodes.OK).json({ user, token })
      }
    }

    // failed credentials
    throw Error('invalid credentials')
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.BAD_REQUEST).json({ error })
  }
}

export const register = async (req, res) => {
  const { last_name, first_name, email, password } = req.body

  try {
    const emailExists = await User.findOne({ email: email })
    if (emailExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: { email: 'Email already exists' }})
    }

    const pwdHash = await hashPassword(password)

    const user = await User.create({
      last_name,
      first_name,
      email,
      password: pwdHash
    })

    const token = createToken({ id: user._id })

    return res.status(StatusCodes.CREATED).json({ user, token })
  } catch (err) {
    const error = handleErrors(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}
