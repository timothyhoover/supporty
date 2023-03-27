import { useEffect, useState } from 'react'
import Button from './components/Button'
import Login from './components/Login'
import Modal from './components/Modal'
import SubmitTicket from './components/SubmitTicket'
import TicketList from './components/TicketList'
import feathersClient from './feathersClient'
import { Toaster } from 'react-hot-toast'

export type User = {
  id: number
  email: string
  role: string
} | null

function App() {
  const [user, setUser] = useState<User>()
  const [open, setOpen] = useState(false)
  const [loginModal, setLoginModal] = useState(false)
  const [submitSubmitTicketModal, setSubmitTicketModal] = useState(false)

  const handleLoginModal = () => {
    setSubmitTicketModal(false)
    setLoginModal(true)
    setOpen(true)
  }
  const handleSubmitTicketModal = () => {
    setLoginModal(false)
    setSubmitTicketModal(true)
    setOpen(true)
  }

  useEffect(() => {
    feathersClient.on('login', ({ user }) => setUser(user))
    feathersClient.on('logout', () => setUser(null))

    const reAuthenticate = async () => {
      try {
        await feathersClient.reAuthenticate()
      } catch (error) {
        setUser(null)
      }
    }
    reAuthenticate()
  })

  const handleLogout = async () => {
    try {
      await feathersClient.logout()
    } catch (error) {
      localStorage.removeItem('feathers-jwt')
    }
    window.location.reload()
  }

  return (
    <>
      <Toaster />
      <div className="bg-white h-20 shadow flex items-center justify-between p-5">
        <h1 className="font-bold text-lg text-blue-900">Supporty</h1>
        <div className="flex items-center space-x-3">
          {user?.role !== 'admin' && (
            <Button
              className="max-w-[200px] text-sm"
              onClick={handleSubmitTicketModal}
            >
              Submit a Ticket
            </Button>
          )}
          {user?.role === 'admin' ? (
            <Button className="max-w-[280px] text-sm" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button
              className="max-w-[280px] text-sm"
              onClick={handleLoginModal}
            >
              Login or Create an Admin Account
            </Button>
          )}
        </div>
      </div>
      <TicketList user={user} />
      <Modal onClose={() => setOpen(false)} show={open}>
        <Modal.Header>
          {loginModal ? 'Admins Only' : 'Submit A Support Request'}
        </Modal.Header>
        <Modal.Body>
          {loginModal ? (
            <Login closeModal={() => setOpen(false)} />
          ) : submitSubmitTicketModal ? (
            <SubmitTicket closeModal={() => setOpen(false)} />
          ) : (
            <></>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default App
