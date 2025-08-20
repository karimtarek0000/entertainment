'use client'

import Card from '@/components/molecules/Card'
import YouTubePlayer, {
  YouTubePlayerRef,
} from '@/components/molecules/MediaPlayer'
import PlayVideoPlayerButton from '@/components/organisms/PlayVideoPlayerButton'
import { useRef } from 'react'

interface CardWrapperProps {
  data: CardWrapperData[]
}

export default function CardWrapper({ data }: CardWrapperProps) {
  const playerRefs = useRef<{ [key: string]: YouTubePlayerRef | null }>({})
  const playingStates = useRef<{ [key: string]: boolean }>({})

  const handleToggleVideo = (id: string) => {
    const player = playerRefs.current[id]
    const isPlaying = playingStates.current[id]

    if (player) {
      if (isPlaying) {
        player.pause()
      } else {
        player.play()
      }
      playingStates.current[id] = !isPlaying
    }
  }

  return (
    <div className="card-wrapper">
      {data?.map(item => (
        <Card key={item.id} data={item}>
          <YouTubePlayer
            ref={ref => {
              playerRefs.current[item.id] = ref
            }}
            url={item.trailer}
            imageURL={item.thumbnail}
          />
          <PlayVideoPlayerButton
            toggleVideo={() => handleToggleVideo(item.id)}
          />
        </Card>
      ))}
    </div>
  )
}
