import cors from 'cors'
import { Express } from 'express'

const adjustCORS = (app: Express) => {
  const ALLOW_HOST = process.env.ALLOW_HOST
  console.log('Adjust CORS middleware')
  console.log(`Allow origin: ${ALLOW_HOST}`)
  app.use(cors({ origin: ALLOW_HOST }))
  console.log('CORS adjusted successfully')
}

export default adjustCORS
