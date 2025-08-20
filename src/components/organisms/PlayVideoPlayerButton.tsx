'use client'

import Button from '@/components/atoms/Button'
import RenderSVG from '@/components/molecules/RenderSVG'
import { useState } from 'react'

export default function PlayVideoPlayerButton({
  toggleVideo,
}: {
  toggleVideo: () => void
}) {
  const [playingStates, setPlayingStates] = useState(false)

  const handleToggleVideo = () => {
    setPlayingStates(prev => !prev)
    toggleVideo()
  }

  return (
    <div className="card-wrapper__actions">
      <Button onClick={() => handleToggleVideo()} variant="third">
        <RenderSVG name={playingStates ? 'pause' : 'play'} className="size-8" />
        {playingStates ? 'Pause' : 'Play'}
      </Button>
    </div>
  )
}
