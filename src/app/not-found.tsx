import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-white"
      role="main"
      aria-labelledby="not-found-title"
    >
      <div className="text-7xl font-extrabold mb-4" aria-hidden="true">
        404
      </div>
      <h1 id="not-found-title" className="text-3xl font-bold mb-2">
        Page Not Found
      </h1>
      <p className="mb-6 text-gray-300 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-2 rounded bg-white text-black transition-colors font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        aria-label="Go to Dashboard"
      >
        Go Dashboard
      </Link>
    </main>
  )
}
