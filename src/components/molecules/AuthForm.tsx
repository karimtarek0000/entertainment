'use client'

import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import authUI from '@/conifg/configDrivenUI.auth.json'
import { ComponentProps, JSX, useState } from 'react'
import z from 'zod'

interface FormProps extends ComponentProps<'form'> {
  type: 'login' | 'sign-up'
}

// Start: Schema validation
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const signUpSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    repeatPassword: z.string(),
  })
  .refine(data => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ['repeatPassword'],
  })
// End

export default function AuthForm({ type, ...attrs }: FormProps): JSX.Element {
  const [form, setForm] = useState({
    email: '',
    password: '',
    repeatPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form
      {...attrs}
      className="[&>input:not(:last-of-type)]:mb-6 [&>*:last-child]:mt-10 [&>*:last-child]:mb-6"
    >
      {authUI[type].inputs.map((field: AuthFieldConfig) => {
        return (
          <Input
            key={field.name}
            name={field.name}
            type={field.type}
            value={form[field.name as keyof typeof form]}
            onChange={handleChange}
            aria-label={field.ariaLabel}
            placeholder={field.placeholder}
          />
        )
      })}
      <Button type="submit">{authUI[type].submit.text}</Button>
    </form>
  )
}
