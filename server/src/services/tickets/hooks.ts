import { authenticate } from '@feathersjs/authentication'
import { errors } from '@feathersjs/errors'
import { HookContext } from '@feathersjs/feathers'
import { hooks } from '@feathersjs/schema'
import {
  ticketPatchValidator,
  ticketQueryValidator,
  ticketDataResolver,
  ticketPatchResolver
} from './schema'

const errorIfNotAdmin = (context: HookContext) => {
  if (context.params.user.role !== 'admin') {
    throw new errors.Forbidden('Not Allowed')
  }
}

const ticketHooks = {
  before: {
    all: [hooks.validateQuery(ticketQueryValidator)],
    find: [authenticate('jwt'), errorIfNotAdmin],
    get: [authenticate('jwt'), errorIfNotAdmin],
    create: [hooks.resolveData(ticketDataResolver)], // TODO: need to add in data validation here
    patch: [
      authenticate('jwt'),
      errorIfNotAdmin,
      hooks.validateData(ticketPatchValidator),
      hooks.resolveData(ticketPatchResolver)
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

export default ticketHooks
