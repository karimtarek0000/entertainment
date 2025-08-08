import Logo from '@/components/molecules/Logo'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="h-screen w-full flex-col flex-center">
      <Logo />
      <div className="bg-secondary p-8 mt-20 w-full sm:w-[400px] rounded-[1.25rem]">
        {children}
      </div>
    </main>
  )
}
