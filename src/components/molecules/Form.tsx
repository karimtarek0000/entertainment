'use client'

import Input from '@/components/atoms/Input'
import { ComponentProps, JSX } from 'react'

interface FormProps extends ComponentProps<'form'> {}

export default function Form({ ...attrs }: FormProps): JSX.Element {
  return (
    <form {...attrs}>
      <Input placeholder="Enter text" />
    </form>
  )
}
