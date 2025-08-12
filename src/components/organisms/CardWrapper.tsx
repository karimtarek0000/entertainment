'use client'

import Button from '@/components/atoms/Button'
import Card from '@/components/molecules/Card'
import YouTubePlayer, {
  YouTubePlayerRef,
} from '@/components/molecules/MediaPlayer'
import RenderSVG from '@/components/molecules/RenderSVG'
import { useRef } from 'react'

export default function CardWrapper() {
  const playerRef = useRef<YouTubePlayerRef>(null)

  const handleToggleVideo = () => {
    if (playerRef.current?.isPlaying) {
      playerRef.current?.pause()
    } else {
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
            <RenderSVG name="play" className="size-8" />
            Play
          </Button>
        </Card>

        {/* <SkeletonCard count={4} /> */}
      </div>
    </>
  )
}
