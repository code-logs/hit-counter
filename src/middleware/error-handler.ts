import { Express, NextFunction, Request, Response } from 'express'

const adjustErrorHandler = (app: Express) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(error.message)
    res.status(500).send('Internal service error')
  })
}

export default adjustErrorHandler
