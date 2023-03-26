import classNames from 'classnames'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  variant?: string
  size?: string
  className?: string
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: ButtonProps) => {
  const baseClasses =
    'appearance-none flex flex-auto justify-center overflow-hidden disabled:cursor-not-allowed ring-offset-2 items-center cursor-pointer !outline-0 transition-all duration-200 ease-in-out group !pointer-events-auto'

  const variants = [
    {
      'px-5 rounded-md bg-blue-500 hover:bg-opacity-90 text-white font-semibold duration-200 ease-in-out':
        variant === 'primary',
    },
    {
      'px-5 rounded-md font-semibold disabled:hover:bg-white text-blue-500 border-blue-500 border-2 bg-transparent hover:bg-blue-400 hover:bg-opacity-20':
        variant === 'secondary',
    },
    {
      'px-5 rounded-md bg-red-500 hover:bg-opacity-90 text-white font-semibold duration-200 ease-in-out':
        variant === 'danger',
    },
  ]

  const sizes = [
    { 'h-10 text-sm': size === 'sm' },
    { 'h-8 text-xs': size === 'xs' },
    { 'h-12 text-base': size === 'md' },
    { 'h-14 text-lg': size === 'lg' },
  ]

  const buttonClasses = twMerge(
    classNames(baseClasses, sizes, variants),
    className
  )

  return (
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  )
}

export default Button
