import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { userSchema } from '../users/schema'

export const ticketSchema = Type.Object(
  {
    id: Type.Number(),
    description: Type.String(),
    createdAt: Type.Number(),
    userId: Type.Number(),
    user: Type.Ref(userSchema)
  },
  { $id: 'Ticket', additionalProperties: false }
)
export type Ticket = Static<typeof ticketSchema>
export const ticketValidator = getValidator(ticketSchema, dataValidator)
export const ticketResolver = resolve<Ticket, HookContext>({
  user: virtual(async (ticket, context) => {
    return context.app.service('users').get(ticket.userId)
  })
})

export const ticketExternalResolver = resolve<Ticket, HookContext>({})

export const ticketDataSchema = Type.Pick(ticketSchema, ['description'], {
  $id: 'TicketData'
})
export type TicketData = Static<typeof ticketDataSchema>
export const ticketDataValidator = getValidator(ticketDataSchema, dataValidator)
export const ticketDataResolver = resolve<Ticket, HookContext>({
  userId: async (_value, _ticket, context) => {
    return context.params.user.id
  },
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
export const ticketPatchResolver = resolve<Ticket, HookContext>({})

export const ticketQueryProperties = Type.Pick(ticketSchema, [
  'id',
  'description',
  'createdAt',
  'userId'
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
export const ticketQueryResolver = resolve<TicketQuery, HookContext>({
  userId: async (value, user, context) => {
    if (context.params.user && context.method !== 'find') {
      return context.params.user.id
    }

    return value
  }
})
