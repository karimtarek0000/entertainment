'use client'

import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import authUI from '@/conifg/configDrivenUI.auth.json'
import { ComponentProps, JSX } from 'react'

interface FormProps extends ComponentProps<'form'> {
  type: 'login' | 'sign-up'
}

interface AuthFieldConfig {
  type: string
  ariaLabel: string
  name: string
  placeholder: string
}

export default function AuthForm({ type, ...attrs }: FormProps): JSX.Element {
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
            aria-label={field.ariaLabel}
            placeholder={field.placeholder}
          />
        )
      })}
      <Button type="submit">{authUI[type].submit.text}</Button>
    </form>
  )
}
