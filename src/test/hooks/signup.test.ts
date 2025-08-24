import { addNewUser } from '@/actions/user'
import { useSignup } from '@/hooks/SignUp'
import { mockRouter, mockToast } from '@/test/setup'
import { useAuth, useSignUp } from '@clerk/nextjs'
import { act, renderHook } from '@testing-library/react'

// Mocks
vi.mock('@/actions/user', () => ({
  addNewUser: vi.fn(),
}))
vi.mock('@/hooks/CounterOTP', () => ({
  useCounterOTP: () => ({
    displayTime: 30,
    isTimeOut: false,
    startTimer: vi.fn(),
    clearTimer: vi.fn(),
  }),
}))
vi.mock('@clerk/nextjs', () => ({
  useSignUp: vi.fn() as unknown as typeof useSignUp,
  useAuth: vi.fn() as unknown as typeof useAuth,
}))

describe('useSignup', () => {
  const mockSignUpCreate = vi.fn()
  const mockPrepareEmail = vi.fn()
  const mockAttemptVerify = vi.fn()
  const mockSignOut = vi.fn()
  const mockAddNewUser = addNewUser as unknown as ReturnType<typeof vi.fn>
  ;(useSignUp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
    isLoaded: true,
    signUp: {
      create: mockSignUpCreate,
      prepareEmailAddressVerification: mockPrepareEmail,
      attemptEmailAddressVerification: mockAttemptVerify,
      emailAddress: 'test@example.com',
    },
  })
  ;(useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
    signOut: mockSignOut,
  })

  it('should call signUp.create and prepareEmailAddressVerification on handleSignUp', async () => {
    const { result } = renderHook(() => useSignup())

    await act(async () => {
      await result.current.handleSignUp({
        email: 'test@example.com',
        password: 'pass',
      })
    })

    expect(mockSignUpCreate).toHaveBeenCalledWith({
      emailAddress: 'test@example.com',
      password: 'pass',
    })
    expect(mockPrepareEmail).toHaveBeenCalledWith({ strategy: 'email_code' })
    expect(result.current.pendingVerification).toBe(true)
    expect(mockToast.success).toHaveBeenCalledWith('Verification email sent')
  })

  it('should set isLoading to false if handleSignUp throws', async () => {
    mockSignUpCreate.mockRejectedValue(new Error('fail'))
    const { result } = renderHook(() => useSignup())

    await act(async () => {
      await result.current.handleSignUp({
        email: 'fail@example.com',
        password: 'fail',
      })
    })

    expect(result.current.isLoading).toBe(false)
  })

  it('should call addNewUser, signOut, router.replace, and toast.success on successful email verification', async () => {
    mockAttemptVerify.mockResolvedValue({
      status: 'complete',
      createdUserId: 'user-1',
    })
    const { result } = renderHook(() => useSignup())

    // Set code before verifying
    act(() => {
      result.current.setCode('123456')
    })

    await act(async () => {
      await result.current.handleVerifyEmail()
    })

    expect(mockAddNewUser).toHaveBeenCalledWith({
      id: 'user-1',
      email: 'test@example.com',
    })
    expect(mockSignOut).toHaveBeenCalled()
    expect(mockRouter).toHaveBeenCalledWith('/auth')
    expect(mockToast.success).toHaveBeenCalledWith(
      'Successfully signup and verified email 👌',
    )
  })

  it('should show error toast on failed email verification', async () => {
    mockAttemptVerify.mockRejectedValue(new Error('fail'))
    const { result } = renderHook(() => useSignup())

    act(() => {
      result.current.setCode('000000')
    })

    await act(async () => {
      await result.current.handleVerifyEmail()
    })

    expect(mockToast.error).toHaveBeenCalledWith('Failed to verify email')
  })

  it('should call prepareEmailAddressVerification and show toast on handleResendCode', async () => {
    const { result } = renderHook(() => useSignup())

    await act(async () => {
      await result.current.handleResendCode()
    })

    expect(mockPrepareEmail).toHaveBeenCalledWith({ strategy: 'email_code' })
    expect(result.current.code).toBe('')
    expect(mockToast.success).toHaveBeenCalledWith(
      'Successfully resent verification email',
    )
  })

  it('should show error toast on failed handleResendCode', async () => {
    mockPrepareEmail.mockRejectedValue(new Error('fail'))
    const { result } = renderHook(() => useSignup())

    await act(async () => {
      await result.current.handleResendCode()
    })

    expect(mockToast.error).toHaveBeenCalledWith(
      'Failed to resend verification email',
    )
  })

  it('should not call signUp.create if isLoaded is false', async () => {
    ;(useSignUp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoaded: false,
      signUp: {
        create: mockSignUpCreate,
        prepareEmailAddressVerification: mockPrepareEmail,
      },
    })
    const { result } = renderHook(() => useSignup())

    await act(async () => {
      await result.current.handleSignUp({
        email: 'test@example.com',
        password: 'pass',
        repeatPassword: 'pass',
      })
    })

    expect(mockSignUpCreate).not.toHaveBeenCalled()
  })

  it('should not call attemptEmailAddressVerification if isLoaded is false', async () => {
    ;(useSignUp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoaded: false,
      signUp: {
        attemptEmailAddressVerification: mockAttemptVerify,
      },
    })
    const { result } = renderHook(() => useSignup())

    await act(async () => {
      await result.current.handleVerifyEmail()
    })

    expect(mockAttemptVerify).not.toHaveBeenCalled()
  })

  it('should not call prepareEmailAddressVerification if isLoaded is false (resend)', async () => {
    ;(useSignUp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoaded: false,
      signUp: {
        prepareEmailAddressVerification: mockPrepareEmail,
      },
    })
    const { result } = renderHook(() => useSignup())

    await act(async () => {
      await result.current.handleResendCode()
    })

    expect(mockPrepareEmail).not.toHaveBeenCalled()
  })
})
