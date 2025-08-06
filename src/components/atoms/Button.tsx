import twMerge from '@/utils/twMerge'
import { PropsWithChildren } from 'react'

type Variants = 'primary' | 'secondary'

interface ButtonProps extends PropsWithChildren {
  variant?: Variants
}

const globalClasses = 'text-center flex-center'
const variants: Record<Variants, string> = {
  primary:
    'bg-third text-para-md hover:bg-white cursor-pointer duration-150 transition-colors hover:text-black rounded-md h-[48px] w-full text-white',
  secondary: 'w-[7.3125rem] h-[2.9375rem] bg-white rounded-full',
}

export default function Button({ variant = 'primary', children }: ButtonProps) {
  return (
    <button className={twMerge(globalClasses, variants[variant])}>
      {children}
    </button>
  )
}
