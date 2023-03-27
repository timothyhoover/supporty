import * as feathers from '@feathersjs/client'
import { io } from 'socket.io-client'

const portString =
  window.location.hostname.indexOf('localhost') === 0 ? ':3030' : ':443'
const protocol =
  window.location.hostname.indexOf('localhost') === 0 ? 'http' : 'https'
export const socket = io(
  `${protocol}://${window.location.hostname}${portString}`,
  {
    transports: ['websocket'],
    upgrade: false,
  }
)
socket.on('connect', () => {
  console.info('connect')
})
socket.on('disconnect', () => {
  console.info('disconnect')
})
const feathersClient = feathers.default()

feathersClient.configure(feathers.socketio(socket, { timeout: 3600000 }))
feathersClient.configure(
  feathers.authentication({
    storage: window.localStorage,
  })
)

export default feathersClient
