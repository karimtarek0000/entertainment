import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { afterEach } from 'vitest'

// Mocks

// Router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))
export const mockRouter = vi.fn()
;(useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
  replace: mockRouter,
  push: mockRouter,
})

// Toast
vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))
export const mockToast = toast as unknown as {
  error: ReturnType<typeof vi.fn>
  success: ReturnType<typeof vi.fn>
}

// Cleanup after each test
afterEach(() => {
  vi.clearAllMocks()
  cleanup()
})
