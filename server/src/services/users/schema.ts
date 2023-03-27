import { Type, Static, getValidator, querySyntax } from '@feathersjs/typebox'
import { resolve } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators'
import type { HookContext } from '../../declarations'
import { passwordHash } from '@feathersjs/authentication-local'

export const userSchema = Type.Object(
  {
    id: Type.Number(),
    email: Type.String(),
    password: Type.String(),
    role: Type.Optional(Type.String())
  },
  { $id: 'User', additionalProperties: false }
)

export type User = Static<typeof userSchema>
export const userValidator = getValidator(userSchema, dataValidator)
export const userResolver = resolve<User, HookContext>({})

export const userExternalResolver = resolve<User, HookContext>({
  password: async () => undefined
})

export const userDataSchema = Type.Pick(
  userSchema,
  ['email', 'password', 'role'],
  {
    $id: 'UserData',
    additionalProperties: false
  }
)
export type UserData = Static<typeof userDataSchema>
export const userDataValidator = getValidator(userDataSchema, dataValidator)
export const userDataResolver = resolve<User, HookContext>({
  password: passwordHash({ strategy: 'local' })
})

export const userPatchSchema = Type.Partial(userSchema, {
  $id: 'UserPatch'
})
export type UserPatch = Static<typeof userPatchSchema>
export const userPatchValidator = getValidator(userPatchSchema, dataValidator)
export const userPatchResolver = resolve<User, HookContext>({
  password: passwordHash({ strategy: 'local' })
})

export const userQueryProperties = Type.Pick(userSchema, [
  'id',
  'email',
  'role'
])
export const userQuerySchema = Type.Intersect(
  [
    querySyntax(userQueryProperties),
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type UserQuery = Static<typeof userQuerySchema>
export const userQueryValidator = getValidator(userQuerySchema, queryValidator)
export const userQueryResolver = resolve<UserQuery, HookContext>({
  id: async (value, user, context) => {
    if (context.params.user) {
      return context.params.user.id
    }

    return value
  }
})
