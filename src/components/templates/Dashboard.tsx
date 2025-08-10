import Logo from '@/components/molecules/Logo'
import Navbar from '@/components/molecules/Navbar'
import Link from 'next/link'

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[96px_1fr]">
      <header className="flex items-center lg:flex-col justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <Navbar />
      </header>
      <main>{children}</main>
    </div>
  )
}
