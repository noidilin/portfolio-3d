import { useProgress } from '@react-three/drei'
import ReactLenis from 'lenis/react'
import { useEffect, useState } from 'react'
import Hero from './sections/hero'
import Nav from './sections/nav'

function App() {
  const { progress } = useProgress()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (progress === 100) setIsReady(true)
  }, [progress])

  return (
    <ReactLenis
      root
      className="relative min-h-screen w-screen overflow-x-auto scroll-smooth"
    >
      {!isReady && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background font-light text-foreground transition-opacity duration-200">
          <p className="mb-4 animate-pulse text-xl tracking-widest">
            Loading {Math.floor(progress)}%
          </p>
          <div className="relative h-1 w-60 overflow-hidden rounded bg-muted">
            <div
              className="absolute top-0 left-0 h-full bg-muted-foreground transition-all duration-300"
              style={{ width: `${Math.floor(progress)}%` }}
            />
          </div>
        </div>
      )}
      <div
        className={`${isReady ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
      >
        <Nav />
        <Hero />
      </div>
    </ReactLenis>
  )
}

export default App
