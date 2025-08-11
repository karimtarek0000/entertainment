'use client'

import Button from '@/components/atoms/Button'
import RenderSVG from '@/components/molecules/RenderSVG'

interface CardProps {
  type: 'Movie' | 'TV Series'
}

const icons = {
  Movie: 'movies',
  'TV Series': 'series',
}

export default function Card({ type }: CardProps) {
  return (
    <div className="card-wrapper">
      <div className="card">
        <Button variant="secondary">
          <RenderSVG
            name="unactive-bookmark"
            className="fill-transparent size-4"
          />
        </Button>
      </div>
      <div className="mt-2 capitalize">
        <figure className="flex items-center gap-x-1 text-fifth text-[11px]">
          2019 ·{' '}
          <RenderSVG name={icons[type]} className="fill-fifth size-2.5" />{' '}
          {type} · e
        </figure>
        <h2 className="mt-1 text-head-xs md:text-head-sm font-medium">
          the great lands
        </h2>
      </div>
    </div>
  )
}
