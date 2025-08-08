declare global {
  interface AuthFieldConfig {
    type: string
    ariaLabel: string
    name: string
    placeholder: string
  }

  interface LoginData {
    email: string
    password: string
  }

  interface SignUpData extends LoginData {
    repeatPassword: string
  }
}

export {}
