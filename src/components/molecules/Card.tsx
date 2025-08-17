'use client'

import { addBookmarksForUser } from '@/actions'
import Button from '@/components/atoms/Button'
import RenderSVG from '@/components/molecules/RenderSVG'
import { PropsWithChildren, useState } from 'react'

interface CardProps extends PropsWithChildren {
  data: CardData
}

const icons = {
  Movie: 'movies',
  'TV Series': 'series',
}

export default function Card({ data, children }: CardProps) {
  const [isBookmarked, setIsBookmarked] = useState(data.isBookmarked)

  const toggleBookmarkHandler = async () => {
    setIsBookmarked((prev: boolean) => !prev)
    await addBookmarksForUser({ ...data, isBookmarked: true })
  }

  return (
    <div>
      <div className="card group/card">
        <Button
          variant="secondary"
          onClick={toggleBookmarkHandler}
          className="z-40"
        >
          <RenderSVG
            name={isBookmarked ? 'active-bookmark' : 'unactive-bookmark'}
            className="fill-transparent size-4"
          />
        </Button>
        {children}
      </div>
      <div className="mt-2">
        <figure className="flex items-center gap-x-1 text-fifth text-[11px] md:text-para-sm">
          {data.year} ·{' '}
          <RenderSVG name={icons[data.type]} className="fill-fifth size-2.5" />{' '}
          {data.type} · {data.rating}
        </figure>
        <h2 className="mt-1 text-head-xs md:text-head-sm font-medium">
          {data.title}
        </h2>
      </div>
    </div>
  )
}
