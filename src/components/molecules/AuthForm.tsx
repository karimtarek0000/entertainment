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
const schemas = {
  login: z.object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    password: z.string().min(8, 'Password is required'),
  }),
  'sign-up': z
    .object({
      email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
      password: z
        .string()
        .min(1, 'Password is required')
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
        ),
      repeatPassword: z.string().min(1, 'Please confirm your password'),
    })
    .refine(data => data.password === data.repeatPassword, {
      message: "Passwords don't match",
      path: ['repeatPassword'],
    }),
}
// End

export default function AuthForm({ type, ...attrs }: FormProps): JSX.Element {
  const [form, setForm] = useState({
    email: '',
    password: '',
    repeatPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Validation filed
  const validateField = (fieldName: string, formData: typeof form) => {
    const result = schemas[type].safeParse(formData)

    if (!result.success) {
      // Find error for this specific field
      const fieldError = result.error.issues.find(
        issue => issue.path[0] === fieldName,
      )
      if (fieldError) {
        setErrors(prev => ({ ...prev, [fieldName]: fieldError.message }))
      }
    }

    // Also clear the specific field error if no error found for it
    if (
      result.success ||
      !result.error.issues.find(issue => issue.path[0] === fieldName)
    ) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }))
    }
  }

  // Check if form is valid
  const isFormValid = () => {
    const result = schemas[type].safeParse(form)
    return result.success
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Update form with new value
    const updatedForm = { ...form, [name]: value }
    setForm(updatedForm)

    // Validate with updated form data
    validateField(name, updatedForm)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(form)
  }

  return (
    <form
      {...attrs}
      onSubmit={handleSubmit}
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
      <Button disabled={!isFormValid()} type="submit">
        {authUI[type].submit.text}
      </Button>
    </form>
  )
}
