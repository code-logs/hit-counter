import express from 'express'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({
  path: path.resolve(process.cwd(), '.env', `.env.${process.env.NODE_ENV}`),
})

const PORT = process.env.PORT

const app = express()
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
