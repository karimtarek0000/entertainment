import twMerge from '@/utils/twMerge'
import { ComponentProps, PropsWithChildren } from 'react'

type Variants = 'primary' | 'secondary' | 'third'

interface ButtonProps extends PropsWithChildren, ComponentProps<'button'> {
  variant?: Variants
}

// Classes
const globalClasses =
  'text-center group flex-center duration-150 cursor-pointer text-white transition-colors'
export const variants: Record<Variants, string> = {
  primary:
    'bg-third disabled:pointer-events-none disabled:opacity-50 text-para-md hover:bg-white hover:text-black rounded-md h-[3rem] w-full',
  secondary:
    'size-8 flex-center hover:bg-white [&>svg]:group-hover:invert rounded-full bg-[#7E8185] absolute top-2 end-2',
  third:
    'absolute w-[7.3125rem] h-[3rem] justify-between ps-2 pe-6 text-head-sm bg-white/30 font-medium rounded-full',
}

export default function Button({
  variant = 'primary',
  children,
  ...attrs
}: ButtonProps) {
  return (
    <button
      {...attrs}
      className={twMerge(
        globalClasses,
        variants[variant],
        attrs.className || '',
      )}
      data-testId={variant}
    >
      {children}
    </button>
  )
}
