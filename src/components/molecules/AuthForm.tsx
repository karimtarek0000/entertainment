'use client'

import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import authUI from '@/conifg/configDrivenUI.auth.json'
import { schemas } from '@/validations/auth.schema'
import { ComponentProps, JSX, useState } from 'react'

interface FormProps<T> extends ComponentProps<'form'> {
  type: 'login' | 'signUp'
  isLoading?: boolean
  submit: (data: T) => Promise<void>
}

export default function AuthForm<T extends LoginData | SignUpData>({
  type,
  isLoading,
  submit,
  ...attrs
}: FormProps<T>): JSX.Element {
  const [form, setForm] = useState({
    login: {
      email: '',
      password: '',
    },
    signUp: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Validation filed
  const validateField = (
    fieldName: string,
    formData: (typeof form)[typeof type],
  ) => {
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
    const result = schemas[type].safeParse(form[type])
    return result.success
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Update form with new value
    const updatedForm = { ...form, [type]: { ...form[type], [name]: value } }
    setForm(updatedForm)

    // Validate with updated form data
    validateField(name, updatedForm[type])
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submit(form[type] as T)
  }

  return (
    <form
      {...attrs}
      onSubmit={handleSubmit}
      className="[&>input:not(:last-of-type)]:mb-6 [&>*:last-child]:mt-10 [&>*:last-child]:mb-6"
    >
      {authUI[type].inputs.map((field: AuthFieldConfig, index: number) => {
        return (
          <Input
            key={field.name}
            name={field.name}
            type={field.type}
            value={form[type][field.name as keyof (typeof form)[typeof type]]}
            onChange={handleChange}
            aria-label={field.ariaLabel}
            placeholder={field.placeholder}
            error={!!errors[field.name]}
            errorMessage={errors[field.name]}
            autoFocus={index === 0}
          />
        )
      })}
      <Button disabled={!isFormValid() || isLoading} type="submit">
        {isLoading ? <span className="loading" /> : authUI[type].submit.text}
      </Button>
    </form>
  )
}
