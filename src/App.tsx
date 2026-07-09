import { useProgress } from '@react-three/drei'
import ReactLenis from 'lenis/react'
import { useEffect, useState } from 'react'
import SkyvaultPage from './pages/skyvault'
import About from './sections/about'
import Contact from './sections/contact'
import ContactSummary from './sections/contact-summary'
import Hero from './sections/hero'
import IndustrialSystems from './sections/industrial-systems'
import Nav from './sections/nav'
import ServiceSummary from './sections/service-summary'
import Services from './sections/services'
import Works from './sections/works'

function HomePage({
  onNavigateToOmniverse,
}: {
  onNavigateToOmniverse: () => void
}) {
  const { progress } = useProgress()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (progress === 100) setIsReady(true)
  }, [progress])

  return (
    <ReactLenis
      root
      className="relative min-h-screen w-screen overflow-x-hidden scroll-smooth"
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
        <ServiceSummary />
        <Services />
        <About />
        <IndustrialSystems onNavigateToOmniverse={onNavigateToOmniverse} />
        <Works />
        <ContactSummary />
        <Contact />
      </div>
    </ReactLenis>
  )
}

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const normalizedPath = path.replace(/\/$/, '')
  const isOmniverseRoute = normalizedPath === '/omniverse'

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigateToOmniverse = () => {
    window.history.pushState(null, '', '/omniverse')
    setPath('/omniverse')
    window.scrollTo({ top: 0 })
  }

  if (isOmniverseRoute) {
    return (
      <ReactLenis
        root
        className="relative min-h-screen w-screen overflow-x-hidden scroll-smooth"
      >
        <SkyvaultPage />
      </ReactLenis>
    )
  }

  return <HomePage onNavigateToOmniverse={navigateToOmniverse} />
}

export default App
