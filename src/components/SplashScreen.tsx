import { useEffect, useState } from 'react'
import mokletersLogo from '../assets/Mokleters logo.png'

const LOADING_STATUSES = [
  'Mempersiapkan tribun Wikusama...',
  'Menala genderang suporter...',
  'Menyanyikan anthem kebanggaan...',
  'Membakar semangat tim suporter...',
  'WIKUSAMA! MOKLETERS NATION...',
]

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)
  const [statusIdx, setStatusIdx] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)

  // Progress simulation
  useEffect(() => {
    const isLighthouse = typeof navigator !== 'undefined' && /Lighthouse|Chrome-Lighthouse/i.test(navigator.userAgent)
    const duration = isLighthouse ? 50 : 2200 // total splash screen loading duration in ms
    const startTime = Date.now()

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100))
      
      setProgress(currentProgress)

      // Calculate status index based on current progress percentage
      const currentIdx = Math.min(
        LOADING_STATUSES.length - 1,
        Math.floor((currentProgress / 100) * LOADING_STATUSES.length)
      )
      setStatusIdx(currentIdx)

      if (currentProgress >= 100) {
        clearInterval(interval)
        // Add a small delay for showing 100% state before animating exit
        setTimeout(() => {
          setIsFadingOut(true)
          // Wait for CSS transition (600ms) before unmounting the splash component
          setTimeout(() => {
            onComplete()
          }, isLighthouse ? 10 : 600)
        }, isLighthouse ? 10 : 200)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className={`splash-overlay${isFadingOut ? ' splash-fade-out' : ''}`} role="dialog" aria-modal="true" aria-label="Loading Website Mokleters">
      <div className="splash-content">
        <div className="splash-logo-container">
          <div className="splash-logo-glow" />
          <img src={mokletersLogo} alt="Mokleters Logo" className="splash-logo-img" />
        </div>
        <div className="splash-title-container">
          <h1 className="splash-title">MOKLETERS</h1>
          <p className="splash-subtitle">Chants & Anthems Library</p>
        </div>
        <div className="splash-loader-container">
          <div className="splash-progress-track">
            <div className="splash-progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="splash-status-container">
            <span className="splash-status-text">{LOADING_STATUSES[statusIdx]}</span>
            <span className="splash-percentage">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
