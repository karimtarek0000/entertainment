'use client'

import Button from '@/components/atoms/Button'
import Card from '@/components/molecules/Card'
import YouTubePlayer, {
  YouTubePlayerRef,
} from '@/components/molecules/MediaPlayer'
import RenderSVG from '@/components/molecules/RenderSVG'
import { useRef, useState } from 'react'

interface CardWrapperProps {
  type: 'Movie' | 'TV Series'
  data: CardWrapperData[]
}

export default function CardWrapper({ type, data }: CardWrapperProps) {
  const playerRefs = useRef<{ [key: string]: YouTubePlayerRef | null }>({})
  const [playingStates, setPlayingStates] = useState<{
    [key: string]: boolean
  }>({})

  const handleToggleVideo = (id: string) => {
    const player = playerRefs.current[id]

    if (player) {
      const isCurrentlyPlaying = playingStates[id] || false

      if (isCurrentlyPlaying) {
        player.pause()
        setPlayingStates(prev => ({ ...prev, [id]: false }))
      } else {
        player.play()
        setPlayingStates(prev => ({ ...prev, [id]: true }))
      }
    }
  }

  return (
    <div className="card-wrapper">
      {data?.map(item => (
        <Card key={item.id} type={type} data={item}>
          <YouTubePlayer
            ref={ref => {
              playerRefs.current[item.id] = ref
            }}
            url={item.trailer}
            imageURL={item.thumbnail}
          />
          <div className="card-wrapper__actions">
            <Button onClick={() => handleToggleVideo(item.id)} variant="third">
              <RenderSVG
                name={playingStates[item.id] ? 'pause' : 'play'}
                className="size-8"
              />
              {playingStates[item.id] ? 'Pause' : 'Play'}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
