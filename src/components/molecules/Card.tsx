'use client'

import Button from '@/components/atoms/Button'
import RenderSVG from '@/components/molecules/RenderSVG'
import Image from 'next/image'

interface CardProps {
  type: 'Movie' | 'TV Series'
}

const icons = {
  Movie: 'movies',
  'TV Series': 'series',
}

export default function Card({ type }: CardProps) {
  return (
    <div>
      <div className="card overflow-hidden">
        <Button variant="secondary" className="z-40">
          <RenderSVG
            name="unactive-bookmark"
            className="fill-transparent size-4"
          />
        </Button>
        <Image src="/test.jpg" alt="Test Image" fill className="object-cover" />
      </div>
      <div className="mt-2">
        <figure className="flex items-center gap-x-1 text-fifth text-[11px] md:text-para-sm">
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
