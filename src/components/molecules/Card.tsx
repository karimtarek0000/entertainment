'use client'

import Button from '@/components/atoms/Button'
import RenderSVG from '@/components/molecules/RenderSVG'

export default function Card() {
  return (
    <div className="bg-red-600 card">
      <Button variant="secondary">
        <RenderSVG
          name="unactive-bookmark"
          className="fill-transparent size-4"
        />
      </Button>
    </div>
  )
}
