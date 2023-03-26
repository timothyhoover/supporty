import { FieldValues, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import Button from './Button'
import Textarea from './Textarea'
import { Ticket } from './TicketList'

type TicketResponseProps = {
  ticket: Ticket | undefined
  closeModal: () => void
}

const SubmitTicketResponse = ({ ticket, closeModal }: TicketResponseProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const handleTicketResponse = (data: FieldValues) => {
    // TODO: wire up feathers after hook to send email
    console.log(
      `Would normally send email here with body: Dear ${ticket?.userName}, ${data.response}`
    )
    toast.success('Successfully sent response')
    closeModal()
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(handleTicketResponse)}>
      <Textarea
        {...register('response', {
          required: 'Response is required',
        })}
        error={errors?.response?.message?.toString()}
        label="Response"
        className="min-h-[200px]"
      />
      <Button className="w-full">Submit Response</Button>
    </form>
  )
}

export default SubmitTicketResponse
