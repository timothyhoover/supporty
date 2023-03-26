import { FieldValues, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Input from './Input'
import Button from './Button'
import feathersClient from '../feathersClient'

type LoginProps = {
  closeModal: () => void
}

const Login = ({ closeModal }: LoginProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const handleLogin = async (data: FieldValues) => {
    const notification = toast.loading('Logging you in...')
    try {
      await feathersClient.authenticate({
        strategy: 'local',
        email: data.email,
        password: data.password,
      })
      toast.success('Successfully Logged In', {
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
  const handleRegister = async (data: FieldValues, role: string) => {
    const notification = toast.loading('Getting you registered...')
    try {
      await feathersClient.service('users').create({
        email: data.email,
        password: data.password,
        role,
      })
      await handleLogin(data)
      toast.success('Successfully Registered', {
        id: notification,
      })
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong...', {
        id: notification,
      })
    }
  }

  return (
    <form>
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
          {...register('password', {
            required: 'Password is required',
          })}
          type="password"
          label="Password"
          labelClassNames="bg-white"
          error={errors?.password?.message?.toString()}
        />
      </div>
      <Button
        onClick={handleSubmit(data => handleLogin(data))}
        className="w-full text-white bg-blue-500 fill-blue-500"
        size="sm"
      >
        <div className="text-white">
          <p className="text-current">Login</p>
        </div>
      </Button>
      <Button
        onClick={handleSubmit(data => handleRegister(data, 'admin'))}
        variant="secondary"
        className="w-full mt-3"
        size="sm"
      >
        <div className="text-current">
          <p className="text-current">Create Admin Account</p>
        </div>
      </Button>
    </form>
  )
}

export default Login
