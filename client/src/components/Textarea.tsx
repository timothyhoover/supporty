import classNames from 'classnames'
import { ForwardedRef, forwardRef, TextareaHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: string
  error?: string
  className?: string
  wrapperClasses?: string
  label?: string
  labelProps?: {
    [key: string]: any
  }
}

const TextareaField = (
  {
    variant = 'primary',
    error,
    className,
    label,
    labelProps,
    wrapperClasses,
    ...rest
  }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  if (error) {
    variant = 'danger'
  }

  const inputClasses = twMerge(
    classNames([
      'block px-2.5 pb-2.5 pt-4 w-full text-black bg-transparent rounded-lg border appearance-none peer',
      {
        'border-blue-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500':
          variant === 'primary',
      },
      {
        'border-red-500 focus:ring-1 focus:ring-red-500 visited:ring-0 focus-visible:border-red-500 focus:border-red-500 focus:outline-none':
          variant === 'danger',
      },
    ]),
    className
  )
  const labelClasses = classNames([
    'absolute text-blue-500 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 left-1',
    variant === 'danger' ? 'text-red-500' : 'text-blue-500',
  ])

  const wrapperClassNames = twMerge('relative w-full', wrapperClasses)
  const id = uuidv4()

  return (
    <>
      <div className={wrapperClassNames}>
        <textarea
          id={id}
          ref={ref}
          {...rest}
          className={inputClasses}
          placeholder=" "
        />
        <label htmlFor={id} {...labelProps} className={labelClasses}>
          {label}
        </label>
        <p className="text-red-500">{error}</p>
      </div>
    </>
  )
}

export default forwardRef(TextareaField)
