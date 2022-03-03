import { Express } from 'express'
import hitCountController from './HitCountController'

const registerControllers = (app: Express) => {
  app.use('/hit_count', hitCountController)
}

export default registerControllers
