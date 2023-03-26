import { authenticate } from '@feathersjs/authentication'
import { hooks } from '@feathersjs/schema'
import {
  ticketDataValidator,
  ticketPatchValidator,
  ticketQueryValidator,
  ticketResolver,
  ticketExternalResolver,
  ticketDataResolver,
  ticketPatchResolver
} from './schema'

const ticketHooks = {
  around: {
    all: [
      hooks.resolveExternal(ticketExternalResolver),
      hooks.resolveResult(ticketResolver)
    ]
  },
  before: {
    all: [hooks.validateQuery(ticketQueryValidator)],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [
      hooks.validateData(ticketDataValidator),
      hooks.resolveData(ticketDataResolver)
    ],
    patch: [
      authenticate('jwt'),
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
