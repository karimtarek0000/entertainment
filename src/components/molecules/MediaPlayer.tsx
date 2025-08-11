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
    const playerRef = useRef<any>(null)

    useEffect(() => {
      // Add global CSS to hide YouTube elements
      const style = document.createElement('style')
      style.id = 'youtube-hide-elements'
      style.textContent = `
      iframe[src*="youtube.com"] {
        pointer-events: none !important;
      }
      .ytp-pause-overlay,
      .ytp-scroll-min,
      .ytp-videowall-still,
      .ytp-endscreen-content,
      .ytp-ce-element,
      .ytp-cards-teaser,
      .ytp-endscreen-element,
      .ytp-chrome-top,
      .ytp-chrome-bottom,
      .ytp-gradient-top,
      .ytp-gradient-bottom {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
    `

      if (!document.getElementById('youtube-hide-elements')) {
        document.head.appendChild(style)
      }

      return () => {
        const existingStyle = document.getElementById('youtube-hide-elements')
        if (existingStyle) {
          document.head.removeChild(existingStyle)
        }
      }
    }, [])

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
        // Remove the window.location.origin reference
      },
    }

    const handlePlay = () => {
      if (!shouldLoad) {
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
      setIsPlaying(true)
    }

    const onStateChange = (event: any) => {
      setIsPlaying(event.data === 1)
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
          backgroundColor: 'black',
          overflow: 'hidden',
        }}
      >
        {shouldLoad ? (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <YouTube
              videoId={videoId}
              opts={opts}
              onReady={onReady}
              onStateChange={onStateChange}
              onError={error => console.error('YouTube Player Error:', error)}
              style={{ pointerEvents: 'none' }}
            />

            {/* Complete overlay to block all YouTube interactions */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
                zIndex: 2147483647, // Maximum z-index
                pointerEvents: 'auto',
                cursor: 'default',
              }}
              onContextMenu={e => e.preventDefault()}
              onMouseDown={e => e.preventDefault()}
              onMouseUp={e => e.preventDefault()}
              onClick={e => e.preventDefault()}
            />
          </div>
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
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
