import express from 'express'

export const router = express.Router()

router.use('/api/v1', (req, res) => {
  res.status(200).json({
    name: process.env.APP_NAME,
    version: '1.0.0',
    status: '200 - OK',
    health: 'RUNNING',
    mode: process.env.MODE,
    message: 'please, specify a valid endpoint.',
  })
})

router.use('/api', (req, res) => {
  res.status(404).json({ message: 'please, specify an API version.' })
})

router.use((req, res) => {
  res.status(200).json({
    name: process.env.APP_NAME,
    status: '200 - OK',
    health: 'RUNNING',
    mode: process.env.MODE,
  })
})
