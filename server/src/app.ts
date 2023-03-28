import { feathers } from '@feathersjs/feathers'
import * as express from '@feathersjs/express'
import socketio from '@feathersjs/socketio'
import configuration from '@feathersjs/configuration'
import { services } from './services'
import { configurationValidator } from './configuration'
import { channels } from './channels'
import { authentication } from './authentication'
import { Request, Response } from 'express'
import { postgresql } from './postgres'
const path = require('path')

const app = express.default(feathers())

app.configure(configuration(configurationValidator))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../build')))
app.use(express.errorHandler())

app.configure(express.rest())
app.configure(
  socketio({
    cors: {
      origin: app.get('origins')
    }
  })
)
app.configure(channels)
app.configure(postgresql)
app.configure(authentication)
app.configure(services)

app.use('*', function (req: Request, res: Response) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

export { app }
