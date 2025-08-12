'use client'

import Button from '@/components/atoms/Button'
import Card from '@/components/molecules/Card'
import YouTubePlayer, {
  YouTubePlayerRef,
} from '@/components/molecules/MediaPlayer'
import RenderSVG from '@/components/molecules/RenderSVG'
import { useRef, useState } from 'react'

export default function CardWrapper() {
  const playerRef = useRef<YouTubePlayerRef>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleToggleVideo = () => {
    if (playerRef.current?.isPlaying) {
      setIsPlaying(false)
      playerRef.current?.pause()
    } else {
      setIsPlaying(true)
      playerRef.current?.play()
    }
  }

  return (
    <>
      <div className="card-wrapper">
        <Card type="Movie">
          <YouTubePlayer
            ref={playerRef}
            url="https://www.youtube.com/watch?v=Way9Dexny3w"
          />
          <Button
            onClick={handleToggleVideo}
            variant="third"
            className="group-hover/card:opacity-100"
          >
            <RenderSVG name={isPlaying ? 'pause' : 'play'} className="size-8" />
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
        </Card>

        {/* <SkeletonCard count={4} /> */}
      </div>
    </>
  )
}
