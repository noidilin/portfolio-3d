import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

// NOTE:
// 1. splits text by newline character for line-by-line animation
// 2. stagger reveal animation with gsap scrollTrigger

interface AnimatedTextLinesProps {
  text: string
  className: string
}

export default function AnimatedTextLines({
  text,
  className,
}: AnimatedTextLinesProps) {
  const containerRef = useRef(null)
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const lineParts = text.split('\n').filter((line) => line.trim() !== '')

  useGSAP(() => {
    // only animate if you have line break
    if (lineRefs.current.length > 0) {
      gsap.from(lineRefs.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'back.out',
        scrollTrigger: {
          trigger: containerRef.current,
        },
      })
    }
  })

  return (
    <div ref={containerRef} className={className}>
      {lineParts.map((part, index) => (
        <span
          key={`${index}-${part}`}
          ref={(el) => {
            lineRefs.current[index] = el
          }}
          className="block text-pretty tracking-wide"
        >
          {part}
        </span>
      ))}
    </div>
  )
}
