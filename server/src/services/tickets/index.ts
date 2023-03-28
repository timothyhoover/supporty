import ticketHooks from './hooks'

import type { Application } from '../../declarations'
import { ticketPath, ticketMethods } from './shared'

export * from './schema'

import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Ticket, TicketData, TicketPatch, TicketQuery } from './schema'

export type { Ticket, TicketData, TicketPatch, TicketQuery }

export interface TicketParams extends KnexAdapterParams<TicketQuery> {}

export class TicketService<
  ServiceParams extends Params = TicketParams
> extends KnexService<Ticket, TicketData, TicketParams, TicketPatch> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresClient'),
    name: 'tickets'
  }
}

export const ticket = (app: Application) => {
  app.use(ticketPath, new TicketService(getOptions(app)), {
    methods: ticketMethods,
    events: []
  })
  app.service('tickets').hooks(ticketHooks)
}

declare module '../../declarations' {
  interface ServiceTypes {
    [ticketPath]: TicketService
  }
}
