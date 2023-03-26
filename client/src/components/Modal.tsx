import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface BaseModalProps {
  children: ReactNode
  className?: string
}

interface ModalProps extends BaseModalProps {
  containerClass?: string
  innerContainerClass?: string
  show: boolean
  onClose: () => void
}

const Body = ({ children, className }: BaseModalProps) => {
  const classes = twMerge(
    'flex-1 p-3 overflow-y-auto text-sm xs:p-5 xs:text-base text-black',
    className
  )
  return <main className={classes}>{children}</main>
}
const Header = ({ children, className }: BaseModalProps) => {
  const classes = twMerge(
    'sticky top-0 p-5 text-base font-medium bg-neutral-200 text-black line-clamp-1 z-20',
    className
  )
  return <header className={classes}>{children}</header>
}
const Footer = ({ children, className }: BaseModalProps) => {
  const classes = twMerge(
    'sticky bottom-0 bg-white flex p-5 space-x-3 border-t-[1px] border-t-gray-300',
    className
  )
  return <footer className={classes}>{children}</footer>
}
const Modal = ({
  children,
  className,
  containerClass,
  innerContainerClass,
  show,
  onClose,
}: ModalProps) => {
  const baseClasses = twMerge(
    'fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full p-0 bg-black bg-opacity-80',
    className
  )
  const containerClasses = twMerge(
    'xs:max-w-screen-sm w-5/6 max-w-[600px] z-40',
    containerClass
  )
  const innerContainerClasses = twMerge(
    'overflow-auto rounded-md shadow-xl bg-white max-h-[600px] ',
    innerContainerClass
  )
  return show ? (
    <dialog className={baseClasses}>
      <div className={containerClasses}>
        <div className={innerContainerClasses}>{children}</div>
      </div>
    </dialog>
  ) : (
    <></>
  )
}

Modal.Header = Header
Modal.Body = Body
Modal.Footer = Footer

export default Modal
