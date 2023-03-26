import { hooks } from '@feathersjs/schema'
import { authenticate } from '@feathersjs/authentication'
import { userPath } from './shared'
import {
  userDataValidator,
  userPatchValidator,
  userQueryValidator,
  userResolver,
  userExternalResolver,
  userDataResolver,
  userPatchResolver,
  userQueryResolver
} from './schema'
import { UserService } from './index'
import { HookContext } from '@feathersjs/feathers'
import { errors } from '@feathersjs/errors'

const restrictUserToSelf = (context: HookContext) => {
  if (context?.params?.user?.id) {
    context.params.query.id = context.params.user.id
  }
  return context
}

const convertGetToFind = async (context: HookContext) => {
  let result = await context.service.find({
    ...context.params,
    query: { id: context?.id }
  })

  result = result.data?.[0] ? result.data[0] : result[0]

  if (!result) {
    throw new errors.NotFound('Not Found')
  }
  context.result = result

  return context
}

const userHooks = {
  around: {
    all: [
      hooks.resolveExternal(userExternalResolver),
      hooks.resolveResult(userResolver)
    ],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },
  before: {
    all: [
      hooks.validateQuery(userQueryValidator),
      hooks.resolveQuery(userQueryResolver)
    ],
    find: [restrictUserToSelf],
    get: [convertGetToFind],
    create: [
      hooks.validateData(userDataValidator),
      hooks.resolveData(userDataResolver)
    ],
    patch: [
      hooks.validateData(userPatchValidator),
      hooks.resolveData(userPatchResolver)
    ],
    remove: []
  },
  after: {
    all: []
  },
  error: {
    all: []
  }
}

declare module '../../declarations' {
  interface ServiceTypes {
    [userPath]: UserService
  }
}

export default userHooks
