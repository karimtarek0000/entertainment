'use client'

import Card from '@/components/molecules/Card'
import YouTubePlayer, {
  YouTubePlayerRef,
} from '@/components/molecules/MediaPlayer'
import { useRef } from 'react'

export default function CardWrapper() {
  const playerRef = useRef<YouTubePlayerRef>(null)

  const handlePlay = () => {
    playerRef.current?.play()
  }

  const handlePause = () => {
    playerRef.current?.pause()
  }

  return (
    <>
      <div className="card-wrapper">
        <Card type="Movie">
          <YouTubePlayer
            ref={playerRef}
            url="https://www.youtube.com/watch?v=Way9Dexny3w"
          />
        </Card>

        {/* <SkeletonCard count={4} /> */}
      </div>

      {/* <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-4">
          <button
            onClick={handlePlay}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Play
          </button>
          <button
            onClick={handlePause}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Pause
          </button>
        </div>
      </div> */}
    </>
  )
}
