'use client'

import Input from '@/components/atoms/Input'
import RenderSVG from '@/components/molecules/RenderSVG'
import { usePathname } from 'next/navigation'

const placeHolders: Record<string, string> = {
  '/dashboard': 'movies or TV series',
  '/dashboard/movies': 'movies',
  '/dashboard/series': 'TV series',
  '/dashboard/bookmarks': 'bookmarked shows',
}

export default function Search() {
  const pathname = usePathname()

  return (
    <form className="mt-6 flex items-end space-x-1 ps-4 max-h-8 mb-6">
      <RenderSVG name="search" className="mb-3" />
      <Input
        className="border-transparent focus:border-transparent"
        aria-label={`Search for ${placeHolders[pathname]}`}
        placeholder={`Search for ${placeHolders[pathname]}`}
      />
    </form>
  )
}
