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
      <input className="input" type="text" {...attrs} />
      {error && <span className="text-[10px] text-third">{errorMessage}</span>}
    </>
  )
}
