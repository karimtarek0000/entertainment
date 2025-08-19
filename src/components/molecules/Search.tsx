'use client'

import Input from '@/components/atoms/Input'
import RenderSVG from '@/components/molecules/RenderSVG'
import { useDebounce } from '@/hooks/Debounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent } from 'react'

const placeHolders: Record<string, string> = {
  '/dashboard': 'movies or TV series',
  '/dashboard/movies': 'movies',
  '/dashboard/series': 'TV series',
  '/dashboard/bookmarks': 'bookmarked shows',
}

export default function Search() {
  const pathname = usePathname()
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const searchHandler = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    replace(`${pathname}?search=${e.target.value}`)
  }, 1000)

  return (
    <form className="mt-6 flex items-end space-x-1 ps-4 max-h-8 mb-6">
      <RenderSVG name="search" className="mb-3" />
      <Input
        onChange={e => searchHandler(e)}
        className="border-transparent focus:border-transparent"
        aria-label={`Search for ${placeHolders[pathname]}`}
        placeholder={`Search for ${placeHolders[pathname]}`}
        defaultValue={searchParams.get('search')?.toString()}
      />
    </form>
  )
}
