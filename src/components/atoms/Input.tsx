'use client'

import { ComponentProps } from 'react'

interface InputProps extends ComponentProps<'input'> {
  error: boolean
  errorMessage: string
}

export default function Input({
  error,
  errorMessage,
  ...attrs
}: Partial<InputProps>) {
  return (
    <>
      <input
        type="text"
        autoComplete="off"
        {...attrs}
        className={`input ${
          error ? 'border-red-500 !mb-3.5 focus:border-red-500' : ''
        } ${attrs.className}`}
      />
      {error && (
        <span data-testid="error" className=" text-third block mb-2">
          {errorMessage}
        </span>
      )}
    </>
  )
}
