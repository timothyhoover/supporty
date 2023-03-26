import type { Params } from '@feathersjs/feathers'
import type { User, UserData, UserPatch, UserQuery, UserService } from './index'

export type { User, UserData, UserPatch, UserQuery }

export type UserClientService = Pick<
  UserService<Params<UserQuery>>,
  typeof userMethods[number]
>

export const userPath = 'users'

export const userMethods = ['find', 'get', 'create', 'patch', 'remove'] as const
