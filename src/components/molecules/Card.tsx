'use client'

import Button from '@/components/atoms/Button'
import RenderSVG from '@/components/molecules/RenderSVG'
import { PropsWithChildren } from 'react'

interface CardProps extends PropsWithChildren {
  type: 'Movie' | 'TV Series'
  data: CardData
}

const icons = {
  Movie: 'movies',
  'TV Series': 'series',
}

export default function Card({ type, data, children }: CardProps) {
  return (
    <div>
      <div className="card group/card">
        <Button variant="secondary" className="z-40">
          <RenderSVG
            name="unactive-bookmark"
            className="fill-transparent size-4"
          />
        </Button>
        {children}
      </div>
      <div className="mt-2">
        <figure className="flex items-center gap-x-1 text-fifth text-[11px] md:text-para-sm">
          {data.year} ·{' '}
          <RenderSVG name={icons[type]} className="fill-fifth size-2.5" />{' '}
          {type} · {data.rating}
        </figure>
        <h2 className="mt-1 text-head-xs md:text-head-sm font-medium">
          {data.title}
        </h2>
      </div>
    </div>
  )
}
