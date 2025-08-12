import Image from 'next/image'

export default function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      width={32}
      height={25}
      style={{ width: '32px', height: '25px' }}
      aria-label="entertainment logo"
    />
  )
}
