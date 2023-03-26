import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { User } from '../App'
import feathersClient from '../feathersClient'
import Button from './Button'
import Modal from './Modal'
import SubmitTicketResponse from './SubmitTicketResponse'

export type Ticket = {
  id: number
  createdAt: number
  description: string
  userName: string
  userEmail: string
  status: string
}

const TickList = ({ user }: { user: User | undefined }) => {
  const [tickets, setTickets] = useState<Ticket[]>()
  const [open, setOpen] = useState(false)
  const [ticketData, setTicketData] = useState<Ticket>()

  const getAllTickets = async () => {
    try {
      const res = await feathersClient
        .service('tickets')
        .find({ query: { $limit: 1000 } }) // TODO: setup limit and pagination on tickets service
      setTickets(
        res.data.sort((a: Ticket, b: Ticket) => b.createdAt - a.createdAt)
      )
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const getTickets = async () => await getAllTickets()
    if (user?.role === 'admin') {
      getTickets()
    }
    feathersClient.service('tickets').on('created', getTickets)
    return () => {
      feathersClient.service('tickets').removeListener('created', getTickets)
    }
  }, [user])

  const handleModal = (ticket: Ticket) => {
    setOpen(true)
    setTicketData(ticket)
  }

  const updateTicketStatus = async (status: string, ticketId: number) => {
    const notification = toast.loading('Logging you in...')
    try {
      const res = await feathersClient.service('tickets').patch(ticketId, {
        status,
      })
      setTickets(
        tickets
          ?.map(ticket =>
            ticket.id === ticketId ? { ...ticket, status: res.status } : ticket
          )
          .sort((a, b) => b.createdAt - a.createdAt)
      )
      toast.success('Successfully updated ticket status', {
        id: notification,
      })
    } catch (error: any) {
      console.log(error)
      toast.error('Something went wrong...', {
        id: notification,
      })
    }
  }

  return (
    <>
      <ul className="space-y-5">
        {tickets?.map(ticket => {
          return (
            <li className="border p-5 text-sm" key={ticket.id}>
              <p>
                <span className="text-gray-600">Name:</span> {ticket.userName}
              </p>
              <p>
                <span className="text-gray-600">Email:</span> {ticket.userEmail}
              </p>
              <p>
                <span className="text-gray-600">Description: </span>
                {ticket.description}
              </p>
              <p>
                <span className="text-gray-600">Status:</span> {ticket.status}
              </p>
              <Button
                className="mt-2"
                variant="secondary"
                onClick={() => handleModal(ticket)}
                size="xs"
              >
                Respond
              </Button>
              <p className="text-xs mt-2 text-gray-500">Update Status</p>
              <select
                onChange={e => updateTicketStatus(e.target.value, ticket.id!)}
                className="border text-xs py-2"
                value={ticket.status}
              >
                <option className="text-current" value="new">
                  New
                </option>
                <option className="text-current" value="in-progress">
                  In Progress
                </option>
                <option className="text-current" value="resolved">
                  Resolved
                </option>
              </select>
            </li>
          )
        })}
      </ul>
      <Modal onClose={() => setOpen(false)} show={open}>
        <Modal.Header>Reply to ticket request</Modal.Header>
        <Modal.Body>
          <SubmitTicketResponse
            ticket={ticketData}
            closeModal={() => setOpen(false)}
          />
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

export default TickList
