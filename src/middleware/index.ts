import { Express } from 'express'
import adjustBodyParser from './body-parser'
import adjustCORS from './cors'
import adjustErrorHandler from './error-handler'

const registerMiddleware = (app: Express) => {
  console.log('Start to register middleware')
  adjustCORS(app)
  adjustBodyParser(app)
  adjustErrorHandler(app)
  console.log('Middleware registered successfully')
}

export default registerMiddleware
