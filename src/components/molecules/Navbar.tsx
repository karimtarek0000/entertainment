'use client'

import RenderSVG from '@/components/molecules/RenderSVG'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  {
    name: 'all',
    href: '/dashboard',
    icon: 'all',
  },
  {
    name: 'movies',
    href: '/dashboard/movies',
    icon: 'movies',
  },
  {
    name: 'series',
    href: '/dashboard/series',
    icon: 'series',
  },
  {
    name: 'bookmarks',
    href: '/dashboard/bookmarks',
    icon: 'bookmarks',
  },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="lg:mb-auto lg:mt-16">
      <ul className="flex-center flex-row lg:flex-col gap-6">
        {items.map(item => {
          const isActive = pathname === item.href

          return (
            <li key={item.name} role="button" aria-label={item.name}>
              <Link href={item.href}>
                <RenderSVG
                  name={item.icon}
                  className={`size-6 ${
                    isActive ? 'fill-white' : 'fill-fourth'
                  }`}
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
