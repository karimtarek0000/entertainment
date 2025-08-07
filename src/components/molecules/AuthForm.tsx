'use client'

import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import authUI from '@/conifg/configDrivenUI.auth.json'
import path from 'path'
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
  const [errors, setErrors] = useState<Record<string, string>>({})

  const schema = type === 'login' ? loginSchema : signUpSchema

  // Simple function to get error message for a field
  const getFieldError = (fieldName: string): string => {
    const result = schema.safeParse(form)

    // Check if validation failed and errors exist
    if (!result.success && result.error?.issues) {
      const fieldError = result.error.issues.find(
        error => error.path[0] === fieldName,
      )
      return fieldError?.message || ''
    }

    return ''
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))

    // Get error message if exists
    const errorMessage = getFieldError(name)
    setErrors(prev => ({ ...prev, [name]: errorMessage }))
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
            error={!!errors[field.name]}
            errorMessage={errors[field.name]}
          />
        )
      })}
      <Button type="submit">{authUI[type].submit.text}</Button>
    </form>
  )
}
