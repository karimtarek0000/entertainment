'use client'

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import YouTube from 'react-youtube'

interface YouTubePlayerProps {
  url: string
}

export interface YouTubePlayerRef {
  play: () => void
  pause: () => void
  isPlaying: boolean
  isReady: boolean
}

const YouTubePlayer = forwardRef<YouTubePlayerRef, YouTubePlayerProps>(
  ({ url }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const [shouldLoad, setShouldLoad] = useState(false)
    const [videoLoaded, setVideoLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const playerRef = useRef<any>(null)

    // Extract video ID from YouTube URL
    const getVideoId = (url: string): string => {
      const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
      const match = url.match(regex)
      return match ? match[1] : ''
    }

    const videoId = getVideoId(url)

    const opts = {
      height: '450',
      width: '800',
      playerVars: {
        autoplay: 1,
        mute: 0,
        controls: 0,
        rel: 0,
        showinfo: 0,
        modestbranding: 1,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        cc_load_policy: 0,
        playsinline: 1,
        enablejsapi: 1,
        start: 0,
        end: 9999999,
        loop: 0,
        playlist: videoId,
      },
    }

    const handlePlay = () => {
      if (!shouldLoad) {
        setIsLoading(true)
        setShouldLoad(true)
      } else if (playerRef.current && isReady) {
        playerRef.current.playVideo()
        setIsPlaying(true)
      }
    }

    const handlePause = () => {
      if (playerRef.current && isReady) {
        playerRef.current.pauseVideo()
        setIsPlaying(false)
      }
    }

    useImperativeHandle(ref, () => ({
      play: handlePlay,
      pause: handlePause,
      isPlaying,
      isReady,
    }))

    const onReady = (event: any) => {
      playerRef.current = event.target
      setIsReady(true)
      setTimeout(() => {
        setVideoLoaded(true)
        setIsLoading(false)
        setIsPlaying(true)
      }, 500)
    }

    const onStateChange = (event: any) => {
      setIsPlaying(event.data === 1)
      if (event.data === 1) {
        setVideoLoaded(true)
        setIsLoading(false)
      }
    }

    if (!videoId) {
      return <div className="text-red-500">Invalid YouTube URL</div>
    }

    return (
      <div
        style={{
          width: '800px',
          height: '450px',
          position: 'relative',
          // Show image when not loaded, loading, or paused
          backgroundImage:
            !shouldLoad || isLoading || (!isPlaying && videoLoaded)
              ? 'url(/test.jpg)'
              : 'none',
          backgroundColor:
            isPlaying && videoLoaded && !isLoading ? 'black' : 'transparent',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
        }}
      >
        {shouldLoad ? (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* YouTube Player - hidden when paused */}
            <div
              style={{
                opacity: isPlaying ? 1 : 0,
                transition: 'opacity 0.2s ease-in-out',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <YouTube
                videoId={videoId}
                opts={opts}
                onReady={onReady}
                onStateChange={onStateChange}
                onError={error => console.error('YouTube Player Error:', error)}
                style={{
                  pointerEvents: 'none',
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>

            {/* Loading overlay */}
            {isLoading && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '18px',
                  zIndex: 1000,
                }}
              >
                Loading video...
              </div>
            )}

            {/* Paused state - show image with overlay text */}
            {!isPlaying && videoLoaded && !isLoading && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  zIndex: 1001,
                }}
              >
                Video Paused
              </div>
            )}

            {/* Complete interaction blocker */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
                zIndex: 2147483647,
                pointerEvents: 'auto',
                cursor: 'default',
              }}
              onContextMenu={e => e.preventDefault()}
              onMouseDown={e => e.preventDefault()}
              onMouseUp={e => e.preventDefault()}
              onClick={e => e.preventDefault()}
              onDoubleClick={e => e.preventDefault()}
            />
          </div>
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            Video ready to play
          </div>
        )}
      </div>
    )
  },
)

YouTubePlayer.displayName = 'YouTubePlayer'

export default YouTubePlayer
