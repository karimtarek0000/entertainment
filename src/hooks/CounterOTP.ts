import { useState } from 'react'

export const useCounterOTP = (minutes: number = 1) => {
  const [displayTime, setDisplayTime] = useState('')
  const [isTimeOut, setTimeOut] = useState(false)
  let timer: NodeJS.Timeout | null = null

  const startTimer = () => {
    setTimeOut(false)
    let initialSeconds = minutes * 60

    timer = setInterval(() => {
      const seconds = initialSeconds % 60
      const minutes = Math.floor(initialSeconds / 60)
      setDisplayTime(
        `${minutes.toString().padStart(2, '0')}: ${seconds
          .toString()
          .padStart(2, '0')}`,
      )

      initialSeconds--

      if (timer && initialSeconds < 0) {
        clearInterval(timer)
        setTimeOut(true)
      }
    }, 1000)
  }

  const clearTimer = () => {
    clearInterval(timer as NodeJS.Timeout)
    setTimeOut(true)
  }

  return {
    startTimer,
    displayTime,
    isTimeOut,
    clearTimer,
  }
}
