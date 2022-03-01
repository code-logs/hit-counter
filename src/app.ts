import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import { HitCount } from './entity/HitCount'
import { createConnection } from 'typeorm'

dotenv.config({
  path: path.resolve(process.cwd(), '.env', `.env.${process.env.NODE_ENV}`),
})

if (!process.env.PORT) throw new Error('Server port is not specified.')
if (!process.env.ALLOW_HOST) throw new Error('ALLOW_HOST is not specified.')

const PORT = Number(process.env.PORT)
const ALLOW_HOST = process.env.ALLOW_HOST
console.log(ALLOW_HOST)

const app = express()
app.use(cors({ origin: ALLOW_HOST }))

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT, async () => {
  await createConnection({
    type: 'sqlite',
    database: 'sqlite.db',
    synchronize: true,
    logging: true,
    entities: [HitCount],
  })
  console.log(`Server is running on ${PORT}`)
})
