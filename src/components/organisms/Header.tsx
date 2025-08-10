import DropDown from '@/components/molecules/DropDown'
import Logo from '@/components/molecules/Logo'
import Navbar from '@/components/molecules/Navbar'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="header">
      <Link href="/">
        <Logo />
      </Link>
      <Navbar />
      <DropDown />
    </header>
  )
}
