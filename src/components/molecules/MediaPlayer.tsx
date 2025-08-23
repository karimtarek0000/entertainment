'use client'

import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube'

interface YouTubePlayerProps {
  url: string
  imageURL: string
}

export interface YouTubePlayerRef {
  play: () => void
  pause: () => void
  isPlaying: boolean
  isReady: boolean
}

interface YouTubePlayerState {
  UNSTARTED: -1
  ENDED: 0
  PLAYING: 1
  PAUSED: 2
  BUFFERING: 3
  CUED: 5
}

const PLAYER_STATES: YouTubePlayerState = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
}

const YouTubePlayer = forwardRef<YouTubePlayerRef, YouTubePlayerProps>(
  ({ url, imageURL }, ref) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [isReady, setIsReady] = useState<boolean>(false)
    const [shouldLoad, setShouldLoad] = useState<boolean>(false)
    const playerRef = useRef<YouTubeEvent['target'] | null>(null)

    // Extract video ID from YouTube URL
    const getVideoId = (url: string): string => {
      const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
      const match = url.match(regex)
      return match ? match[1] : ''
    }

    const videoId = getVideoId(url)

    const opts: YouTubeProps['opts'] = {
      height: '100%',
      width: '100%',
      playerVars: {
        autoplay: 1,
        controls: 0,
        rel: 0,
        modestbranding: 1,
        disablekb: 1,
        fs: 0,
        enablejsapi: 1,
      },
    }

    const handlePlay = (): void => {
      if (!shouldLoad) {
        setShouldLoad(true)
      } else if (playerRef.current && isReady) {
        playerRef.current.playVideo()
        setIsPlaying(true)
      }
    }

    const handlePause = (): void => {
      if (playerRef.current && isReady) {
        playerRef.current.pauseVideo()
        setIsPlaying(false)
      }
    }

    useImperativeHandle(
      ref,
      (): YouTubePlayerRef => ({
        play: handlePlay,
        pause: handlePause,
        isPlaying,
        isReady,
      }),
    )

    const onReady = (event: YouTubeEvent): void => {
      playerRef.current = event.target
      setIsReady(true)
      setIsPlaying(true)
    }

    const onStateChange = (event: YouTubeEvent): void => {
      setIsPlaying(event.data === PLAYER_STATES.PLAYING)
    }

    if (!videoId) {
      return <div className="text-red-500">Invalid YouTube URL</div>
    }

    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          backgroundImage: isReady ? 'none' : `url(${imageURL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
        }}
      >
        {shouldLoad && (
          <>
            <YouTube
              videoId={videoId}
              opts={opts}
              onReady={onReady}
              onStateChange={onStateChange}
              style={{
                opacity: isReady ? 1 : 0,
                pointerEvents: 'none',
                height: '100%',
              }}
            />

            {/* Block all interactions */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'auto',
              }}
              onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                e.preventDefault()
              }
            />
          </>
        )}
      </div>
    )
  },
)

YouTubePlayer.displayName = 'YouTubePlayer'

export default YouTubePlayer
