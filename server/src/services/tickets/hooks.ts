import { authenticate } from '@feathersjs/authentication'
import { hooks } from '@feathersjs/schema'
import {
  ticketDataValidator,
  ticketPatchValidator,
  ticketQueryValidator,
  ticketResolver,
  ticketExternalResolver,
  ticketDataResolver,
  ticketPatchResolver,
  ticketQueryResolver
} from './schema'

const ticketHooks = {
  around: {
    all: [
      authenticate('jwt'),
      hooks.resolveExternal(ticketExternalResolver),
      hooks.resolveResult(ticketResolver)
    ]
  },
  before: {
    all: [
      hooks.validateQuery(ticketQueryValidator),
      hooks.resolveQuery(ticketQueryResolver)
    ],
    find: [],
    get: [],
    create: [
      hooks.validateData(ticketDataValidator),
      hooks.resolveData(ticketDataResolver)
    ],
    patch: [
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
