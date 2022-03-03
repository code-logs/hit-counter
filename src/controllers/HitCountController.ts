import { Request, Router } from 'express'
import { TypeORMError } from 'typeorm'
import { AccessInfoService } from '../services/AccessInfoService'
import { HitCountService } from '../services/HitCountService'
import CustomError from '../utilities/CustomError'

const hitCountController = Router()

hitCountController.get('/', async (req, res) => {
  const pathname = req.query.pathname
  if (!pathname) return res.status(400).send('No pathname provided')

  res.json({
    count: await HitCountService.count(String(pathname)),
  })
})

hitCountController.post('/', async (req: Request, res) => {
  try {
    const { pathname } = req.body
    if (!pathname) throw new CustomError('No pathname provided', 400)

    const remoteAddress = req.socket.remoteAddress
    if (!remoteAddress) throw new CustomError('Internal server error', 500)

    await AccessInfoService.stamp(remoteAddress)
    await HitCountService.stamp(remoteAddress, pathname)

    res.json({ success: true })
  } catch (e) {
    if (e instanceof CustomError) {
      res.status(e.code).send(e.message)
    } else if (e instanceof TypeORMError) {
      res.status(500).send('Transactional error occurred')
    } else {
      res.status(500).send('Unexpected error occurred')
    }
  }
})

export default hitCountController
