import { Application } from '@feathersjs/express/lib'
import { ticket } from './tickets'
import { user } from './users'

export const services = (app: Application) => {
  app.configure(ticket)
  app.configure(user)
}
