import AuthForm from '@/components/molecules/AuthForm'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('AuthForm', () => {
  const submitHandler = vi.fn()

  // Login
  it('Login | inputs received data correctly', async () => {
    render(<AuthForm type="login" submit={submitHandler} />)

    await userEvent.type(screen.getByTestId('login-email'), 'test@example.com')
    await userEvent.type(screen.getByTestId('login-password'), 'password123')

    expect(screen.getByTestId('login-email')).toHaveValue('test@example.com')
    expect(screen.getByTestId('login-password')).toHaveValue('password123')
  })

  it('Login | email validation if not correct', async () => {
    render(<AuthForm type="login" submit={submitHandler} />)

    await userEvent.type(screen.getByTestId('login-email'), 'test')

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument()
      expect(screen.getByTestId('error')).toHaveTextContent(
        'Invalid email address',
      )
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  it('Login | password validation if not correct', async () => {
    render(<AuthForm type="login" submit={submitHandler} />)

    await userEvent.type(screen.getByTestId('login-password'), 'dgshdjh')

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument()
      expect(screen.getByTestId('error')).toHaveTextContent(
        'Password is required',
      )
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  it('Login | when submit', async () => {
    const mockSubmit = vi.fn().mockResolvedValue({})
    render(<AuthForm type="login" submit={mockSubmit} />)

    await userEvent.type(screen.getByTestId('login-email'), 'test@gmail.com')
    await userEvent.type(screen.getByTestId('login-password'), 'testTEST@@12')
    await userEvent.click(screen.getByRole('button', { name: /login/i }))

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@gmail.com',
      password: 'testTEST@@12',
    })
  })

  // Signup
  it('SignUp | inputs received data correctly', async () => {
    render(<AuthForm type="signUp" submit={submitHandler} />)

    await userEvent.type(screen.getByTestId('signUp-email'), 'test@example.com')
    await userEvent.type(screen.getByTestId('signUp-password'), 'password123')
    await userEvent.type(
      screen.getByTestId('signUp-repeatPassword'),
      'password123',
    )

    expect(screen.getByTestId('signUp-email')).toHaveValue('test@example.com')
    expect(screen.getByTestId('signUp-password')).toHaveValue('password123')
    expect(screen.getByTestId('signUp-repeatPassword')).toHaveValue(
      'password123',
    )
  })

  it('Signup | email validation if not correct', async () => {
    render(<AuthForm type="signUp" submit={submitHandler} />)

    await userEvent.type(screen.getByTestId('signUp-email'), 'test')

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeDisabled()
      expect(screen.getByTestId('error')).toHaveTextContent(
        'Invalid email address',
      )
    })
  })

  it('Signup | email validation if correct', async () => {
    render(<AuthForm type="signUp" submit={submitHandler} />)

    await userEvent.type(screen.getByTestId('signUp-email'), 'test@gmail.com')

    await waitFor(() => {
      expect(screen.queryByTestId('error')).not.toBeInTheDocument()
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  it('Signup | password validation if not correct', async () => {
    render(<AuthForm type="signUp" submit={submitHandler} />)

    await userEvent.type(screen.getByTestId('signUp-password'), 'dgshdjh')

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument()
      expect(screen.getByTestId('error')).toHaveTextContent(
        'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
      )
    })
  })

  it('Signup | confim password validation if not correct', async () => {
    render(<AuthForm type="signUp" submit={submitHandler} />)

    await userEvent.type(screen.getByTestId('signUp-password'), 'testTEST@@12')
    await userEvent.type(
      screen.getByTestId('signUp-repeatPassword'),
      'testTEST@@13',
    )

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent(
        "Passwords don't match",
      )
    })
  })

  it('Signup | confim password validation if correct', async () => {
    render(<AuthForm type="signUp" submit={submitHandler} />)

    await userEvent.type(screen.getByTestId('signUp-password'), 'testTEST@@12')
    await userEvent.type(
      screen.getByTestId('signUp-repeatPassword'),
      'testTEST@@12',
    )

    await waitFor(() => {
      expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    })
  })

  it('Signup | when submit', async () => {
    const mockSubmit = vi.fn().mockResolvedValue({})
    render(<AuthForm type="signUp" submit={mockSubmit} />)

    await userEvent.type(screen.getByTestId('signUp-email'), 'test@gmail.com')
    await userEvent.type(screen.getByTestId('signUp-password'), 'testTEST@@12')
    await userEvent.type(
      screen.getByTestId('signUp-repeatPassword'),
      'testTEST@@12',
    )
    await userEvent.click(
      screen.getByRole('button', { name: /Create an account/i }),
    )

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@gmail.com',
      password: 'testTEST@@12',
      repeatPassword: 'testTEST@@12',
    })
  })

  // Shared
  it('Disable button submit', async () => {
    render(<AuthForm type="signUp" submit={submitHandler} />)

    expect(screen.getByRole('button')).toBeDisabled()
    await userEvent.type(screen.getByTestId('signUp-email'), 'test@gmail.com')
    await userEvent.type(screen.getByTestId('signUp-password'), 'testTEST@@12')
    await userEvent.type(
      screen.getByTestId('signUp-repeatPassword'),
      'testTEST@@12',
    )

    expect(screen.getByRole('button')).not.toBeDisabled()
  })

  it('Loading state', async () => {
    render(<AuthForm type="signUp" isLoading={true} submit={submitHandler} />)

    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })
})
