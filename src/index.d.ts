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

  interface CardData {
    title: string
    year: number
    rating: string
    type: 'Movie' | 'TV Series'
  }

  interface CardWrapperData extends CardData {
    id: string
    trailer: string
    thumbnail: string
  }
}

export {}
