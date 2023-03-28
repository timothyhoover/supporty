import { FieldValues, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Input from './Input'
import Button from './Button'
import feathersClient from '../feathersClient'
import Textarea from './Textarea'

type LoginProps = {
  closeModal: () => void
}

const SubmitTicket = ({ closeModal }: LoginProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const handleTicketSubmission = async (data: FieldValues) => {
    const notification = toast.loading('Submitting ticket...')
    try {
      await feathersClient.service('tickets').create({
        userName: data.name,
        userEmail: data.email,
        description: data.description,
        status: 'new',
      })
      toast.success('Successfully Submitted Ticket', {
        id: notification,
      })
      closeModal()
    } catch (error: any) {
      console.log(error)
      toast.error('Something went wrong...', {
        id: notification,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(handleTicketSubmission)}>
      <div className="space-y-5 mb-5">
        <Input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Please enter a valid email address',
            },
          })}
          error={errors?.email?.message?.toString()}
          label="Email"
          labelClassNames="bg-white"
        />
        <Input
          {...register('name', {
            required: 'Name is required',
          })}
          type="name"
          label="Name"
          labelClassNames="bg-white"
          error={errors?.name?.message?.toString()}
        />
        <Textarea
          {...register('description', {
            required: 'Description is required',
          })}
          className="min-h-[200px]"
          label="Description"
          error={errors?.description?.message?.toString()}
        />
      </div>
      <Button
        type="submit"
        className="w-full text-white bg-blue-500 fill-blue-500"
        size="sm"
      >
        <div className="text-white">
          <p className="text-current">Submit Ticket</p>
        </div>
      </Button>
    </form>
  )
}

export default SubmitTicket
