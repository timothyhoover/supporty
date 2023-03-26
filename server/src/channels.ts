import type { RealTimeConnection, Params } from '@feathersjs/feathers'
import type { AuthenticationResult } from '@feathersjs/authentication'
import '@feathersjs/transport-commons'
import type { Application, HookContext } from './declarations'
import { logger } from './logger'

export const channels = (app: Application) => {
  logger.warn(
    'Publishing all events to all authenticated users. See `channels.ts` and https://dove.feathersjs.com/api/channels.html for more information.'
  )

  app.on('connection', (connection: RealTimeConnection) => {
    app.channel('anonymous').join(connection)
  })

  app.on(
    'login',
    (authResult: AuthenticationResult, { connection }: Params) => {
      if (connection) {
        app.channel('anonymous').leave(connection)

        app.channel('authenticated').join(connection)
      }
    }
  )

  // eslint-disable-next-line no-unused-vars
  app.publish((data: any, context: HookContext) => {
    return app.channel('authenticated')
  })
}
