'use client'

import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import { ComponentProps, JSX } from 'react'

interface FormProps extends ComponentProps<'form'> {}

export default function LoginForm({ ...attrs }: FormProps): JSX.Element {
  return (
    <form
      {...attrs}
      className="[&>*:first-child]:mb-6 [&>*:last-child]:mt-10 [&>*:last-child]:mb-6"
    >
      <Input placeholder="Enter Address" />
      <Input type="password" placeholder="Password" />
      <Button type="submit">Login to your account</Button>
    </form>
  )
}
