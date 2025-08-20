'use client'

import Button from '@/components/atoms/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: VoidFunction
}) {
  return (
    <div className="flex flex-col items-center justify-center mt-96  rounded-lg shadow-md p-8">
      <svg
        className="w-16 h-16 text-red-500 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
        />
      </svg>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        {error.message}
      </h2>
      <Button onClick={() => reset()} className="max-w-[12.5rem] mt-5">
        Reset Error
      </Button>
    </div>
  )
}
