import { feathers } from '@feathersjs/feathers'
import * as express from '@feathersjs/express'
import socketio from '@feathersjs/socketio'
import configuration from '@feathersjs/configuration'
import { services } from './services'
import { sqlite } from './sqlite'
import { configurationValidator } from './configuration'
import { channels } from './channels'
import { authentication } from './authentication'

const app = express.default(feathers())

app.configure(configuration(configurationValidator))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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
app.configure(sqlite)
app.configure(authentication)
app.configure(services)

export { app }
