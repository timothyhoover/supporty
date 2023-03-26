import userHooks from './hooks'
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'
import type { Application } from '../../declarations'
import type { User, UserData, UserPatch, UserQuery } from './schema'
import { userPath, userMethods } from './shared'

export * from './schema'

export type { User, UserData, UserPatch, UserQuery }

export interface UserParams extends KnexAdapterParams<UserQuery> {}

export class UserService<
  ServiceParams extends Params = UserParams
> extends KnexService<User, UserData, UserParams, UserPatch> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    Model: app.get('sqliteClient'),
    name: 'users'
  }
}

export const user = (app: Application) => {
  app.use(userPath, new UserService(getOptions(app)), {
    methods: userMethods,
    events: []
  })
  app.service(userPath).hooks(userHooks)
}

declare module '../../declarations' {
  interface ServiceTypes {
    [userPath]: UserService
  }
}
