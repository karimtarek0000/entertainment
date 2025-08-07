import twMerge from '@/utils/twMerge'
import { ComponentProps, PropsWithChildren } from 'react'

type Variants = 'primary' | 'secondary'

interface ButtonProps extends PropsWithChildren, ComponentProps<'button'> {
  variant?: Variants
}

// Classes
const globalClasses =
  'text-center flex-center duration-150 cursor-pointer text-white transition-colors'
const variants: Record<Variants, string> = {
  primary:
    'bg-third disabled:pointer-events-none disabled:opacity-50 text-para-md hover:bg-white hover:text-black rounded-md h-[3rem] w-full',
  secondary: 'w-[7.3125rem] h-[2.9375rem] bg-white rounded-full',
}

export default function Button({
  variant = 'primary',
  children,
  ...attrs
}: ButtonProps) {
  return (
    <button {...attrs} className={twMerge(globalClasses, variants[variant])}>
      {children}
    </button>
  )
}
