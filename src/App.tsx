import ReactLenis from 'lenis/react'
import Hero from './sections/hero'
import Nav from './sections/nav'

function App() {
  return (
    <ReactLenis root className="relative min-h-screen w-screen overflow-x-auto">
      <Nav />
      <Hero />
    </ReactLenis>
  )
}

export default App
