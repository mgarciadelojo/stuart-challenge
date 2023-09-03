import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'

import { initServer } from './presentation/server'
import { initRoutes } from './presentation/routes'
import { dataSource } from './infrastructure/persistence/orm'
import { errorHandlerMiddleware } from './presentation/middlewares'

const app = express()
const port = parseInt(process.env.SERVER_PORT ?? '3000', 10)

dataSource.initialize()
  .then(() => {
    app.use(bodyParser.json())
    initRoutes(app)
    initServer(app, port)

    app.use(errorHandlerMiddleware)
  })
  .catch((err) => {
    console.error('Error during initialization', err)
  })
