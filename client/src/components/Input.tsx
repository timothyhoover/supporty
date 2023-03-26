import React, { forwardRef, ForwardedRef, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: string
  error?: string | React.ReactElement
  className?: string
  wrapperClasses?: string
  labelClassNames?: string
  label?: string
  labelProps?: {
    [key: string]: any
  }
}

const ForwardedRefInput = (
  {
    variant = 'primary',
    error,
    className,
    label,
    labelProps,
    wrapperClasses,
    labelClassNames,
    ...rest
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  if (error) {
    variant = 'danger'
  }
  const id = uuidv4()
  const inputClasses = twMerge(
    classNames([
      'block px-2.5 pb-2 pt-2.5 w-full text-black bg-transparent rounded-md border appearance-none peer',
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
  const labelClasses = twMerge(
    classNames([
      'cursor-auto absolute text-black duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[22px] peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 left-1',
      variant === 'danger' ? 'text-red-500' : 'text-blue-500',
    ]),
    labelClassNames
  )

  const wrapperClassNames = twMerge(
    'relative w-full cursor-auto',
    wrapperClasses
  )
  return (
    <>
      <div className={wrapperClassNames}>
        <input
          id={id}
          ref={ref}
          {...rest}
          className={inputClasses}
          placeholder=" "
        />
        <label htmlFor={id} {...labelProps} className={labelClasses}>
          {label}
        </label>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    </>
  )
}

const Input = forwardRef(ForwardedRefInput)

export default Input
