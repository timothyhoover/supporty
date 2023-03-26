import type { Params } from '@feathersjs/feathers'
import type {
  Ticket,
  TicketData,
  TicketPatch,
  TicketQuery,
  TicketService
} from './index'

export type { Ticket, TicketData, TicketPatch, TicketQuery }

export type TicketClientService = Pick<
  TicketService<Params<TicketQuery>>,
  typeof ticketMethods[number]
>

export const ticketPath = 'tickets'

export const ticketMethods = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
] as const
