export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="h-screen w-full flex-center">
      <div className="bg-secondary w-full sm:w-[400px] rounded-[1.25rem] px-8">
        {children}
      </div>
    </main>
  )
}
