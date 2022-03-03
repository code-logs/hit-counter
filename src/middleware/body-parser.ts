import bodyParser from 'body-parser'
import { Express } from 'express'

const adjustBodyParser = (app: Express) => {
  app.use(bodyParser.json())
}

export default adjustBodyParser
