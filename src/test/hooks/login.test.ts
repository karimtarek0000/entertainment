import { setUserCookie } from '@/actions/user'
import { useLogin } from '@/hooks/Login'
import { useAuth, useSignIn } from '@clerk/nextjs'
import { act, renderHook } from '@testing-library/react'
import toast from 'react-hot-toast'

// Mock dependencies
vi.mock('@clerk/nextjs', () => ({
  useSignIn: vi.fn(),
  useAuth: vi.fn(),
}))
vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))
vi.mock('@/actions/user', () => ({ setUserCookie: vi.fn() }))

describe('useLogin', () => {
  const mockSignInCreate = vi.fn()
  const mockSetActive = vi.fn()
  const mockSetUserCookie = setUserCookie as unknown as ReturnType<typeof vi.fn>
  const mockToast = toast as unknown as {
    error: ReturnType<typeof vi.fn>
    success: ReturnType<typeof vi.fn>
  }

  beforeEach(() => {
    vi.clearAllMocks()
    useSignIn.mockReturnValue({
      signIn: { create: mockSignInCreate },
      setActive: mockSetActive,
      isLoaded: true,
    })
    useAuth.mockReturnValue({ userId: null })
  })

  it('should set isLoading to true when handleLogin is called', async () => {
    mockSignInCreate.mockResolvedValue({
      status: 'complete',
      createdSessionId: 'session123',
    })
    const { result } = renderHook(() => useLogin())

    act(() => {
      result.current.handleLogin({
        email: 'test@example.com',
        password: 'pass',
      })
    })

    expect(result.current.isLoading).toBe(true)
  })

  it('should call signIn.create with correct params', async () => {
    mockSignInCreate.mockResolvedValue({
      status: 'complete',
      createdSessionId: 'session123',
    })
    const { result } = renderHook(() => useLogin())

    act(() => {
      result.current.handleLogin({
        email: 'test@example.com',
        password: 'pass',
      })
    })

    expect(mockSignInCreate).toHaveBeenCalledWith({
      identifier: 'test@example.com',
      password: 'pass',
    })
  })

  it('should call setActive on successful login', async () => {
    mockSignInCreate.mockResolvedValue({
      status: 'complete',
      createdSessionId: 'session123',
    })
    const { result } = renderHook(() => useLogin())

    await act(async () => {
      await result.current.handleLogin({
        email: 'test@example.com',
        password: 'pass',
      })
    })

    expect(mockSetActive).toHaveBeenCalledWith({ session: 'session123' })
  })

  it('should show error toast on login failure', async () => {
    mockSignInCreate.mockRejectedValue(new Error('fail'))
    const { result } = renderHook(() => useLogin())

    await act(async () => {
      await result.current.handleLogin({
        email: 'fail@example.com',
        password: 'fail',
      })
    })

    expect(mockToast.error).toHaveBeenCalledWith(
      'Email or password is incorrect',
    )
    expect(result.current.isLoading).toBe(false)
  })

  it('should call setUserCookie and show success toast when userId becomes available', async () => {
    mockSignInCreate.mockResolvedValue({
      status: 'complete',
      createdSessionId: 'session123',
    })
    let userId: string | null = null
    ;(useAuth as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      () => ({ userId }),
    )
    const { result, rerender } = renderHook(() => useLogin())

    await act(async () => {
      await result.current.handleLogin({
        email: 'test@example.com',
        password: 'pass',
      })
    })

    // Simulate userId becoming available
    userId = 'user-1'
    ;(useAuth as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      () => ({ userId }),
    )
    rerender()

    expect(mockSetUserCookie).toHaveBeenCalledWith({
      id: 'user-1',
      email: 'test@example.com',
    })
    expect(mockToast.success).toHaveBeenCalledWith('Successfully logged in')
  })

  it('should not call handleLogin if isLoaded is false', async () => {
    ;(useSignIn as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      signIn: { create: mockSignInCreate },
      setActive: mockSetActive,
      isLoaded: false,
    })
    const { result } = renderHook(() => useLogin())

    await act(async () => {
      await result.current.handleLogin({
        email: 'test@example.com',
        password: 'pass',
      })
    })

    expect(mockSignInCreate).not.toHaveBeenCalled()
  })
})
