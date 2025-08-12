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
    <div className="card-wrapper">
      <Card type="Movie">
        <YouTubePlayer
          ref={playerRef}
          url="https://www.youtube.com/watch?v=Way9Dexny3w"
          imageURL="/test.jpg"
        />
        <div className="bg-black/50 absolute inset-0 flex-center opacity-0 group-hover/card:opacity-100">
          <Button onClick={handleToggleVideo} variant="third" className="">
            <RenderSVG name={isPlaying ? 'pause' : 'play'} className="size-8" />
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
        </div>
      </Card>

      {/* <SkeletonCard count={4} /> */}
    </div>
  )
}
