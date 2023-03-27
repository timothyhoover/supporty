import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

export const ticketSchema = Type.Object(
  {
    id: Type.Number(),
    description: Type.String(),
    status: Type.String(),
    createdAt: Type.Number(),
    updatedAt: Type.Number(),
    userName: Type.String(),
    userEmail: Type.String()
  },
  { $id: 'Ticket', additionalProperties: false }
)
export type Ticket = Static<typeof ticketSchema>
export const ticketValidator = getValidator(ticketSchema, dataValidator)
export const ticketResolver = resolve<Ticket, HookContext>({})

export const ticketExternalResolver = resolve<Ticket, HookContext>({})

export const ticketDataSchema = Type.Pick(
  ticketSchema,
  ['description', 'userName', 'userEmail', 'status'],
  {
    $id: 'TicketData'
  }
)
export type TicketData = Static<typeof ticketDataSchema>
export const ticketDataValidator = getValidator(ticketDataSchema, dataValidator)
export const ticketDataResolver = resolve<Ticket, HookContext>({
  createdAt: async () => {
    return Date.now()
  }
})

export const ticketPatchSchema = Type.Partial(ticketSchema, {
  $id: 'TicketPatch'
})
export type TicketPatch = Static<typeof ticketPatchSchema>
export const ticketPatchValidator = getValidator(
  ticketPatchSchema,
  dataValidator
)
export const ticketPatchResolver = resolve<Ticket, HookContext>({
  updatedAt: async () => {
    return Date.now()
  }
})

export const ticketQueryProperties = Type.Pick(ticketSchema, [
  'id',
  'userEmail'
])
export const ticketQuerySchema = Type.Intersect(
  [
    querySyntax(ticketQueryProperties),
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TicketQuery = Static<typeof ticketQuerySchema>
export const ticketQueryValidator = getValidator(
  ticketQuerySchema,
  queryValidator
)
