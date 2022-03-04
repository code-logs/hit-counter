import dotenv from 'dotenv'
import express, { Express } from 'express'
import path from 'path'
import { createConnection, EntitySchema } from 'typeorm'
import registerControllers from './controllers'
import entities from './entity'
import registerMiddleware from './middleware'

dotenv.config({
  path: path.resolve(process.cwd(), '.env', `.env.${process.env.NODE_ENV}`),
})

if (!process.env.PORT) throw new Error('Server port is not specified.')
if (!process.env.ALLOW_HOST) throw new Error('ALLOW_HOST is not specified.')

export const connectDatabase = async (entities: EntitySchema<unknown>[]) => {
  const database = process.env.DATABASE

  if (!database) throw new Error('Database configuration is required')

  try {
    console.log('Start to connect database')
    const connection = await createConnection({
      type: 'sqlite',
      database,
      synchronize: true,
      entities,
      logging: true,
    })
    console.log('Database connection is established')

    return connection
  } catch (e) {
    throw (e as Error).message
  }
}

const launchServer = (app: Express) => {
  const PORT = Number(process.env.PORT)

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
  })
}

const bootstrap = async (app: Express) => {
  await connectDatabase(entities as EntitySchema<unknown>[])
  registerMiddleware(app)
  registerControllers(app)
  launchServer(app)
}

const app = express()
bootstrap(app)
