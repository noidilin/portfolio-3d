import { WaveTriangleIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import gsap from 'gsap'
import { Observer } from 'gsap/all'
import { useEffect, useRef } from 'react'

import { createHorizontalLoop } from '@/lib/horizontal-loop'

gsap.registerPlugin(Observer)

// NOTE:
// 1. infinite horizontal loop animation using gsap xPercent
// 2. scroll-reactive speed change with gsap Observer plugin
// 3. responsive width calculation with gsap.utils for seamless looping

interface MarqueeProps {
  items: string[]
  className?: string
  reverse?: boolean
}

export default function Marquee({
  items,
  className = 'text-white bg-black',
  reverse = false,
}: MarqueeProps) {
  const itemsRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const tl = createHorizontalLoop(itemsRef.current, {
      repeat: -1,
      paddingRight: 30,
      reversed: reverse,
    })

    const observer = Observer.create({
      onChangeY(self) {
        let factor = 2.5
        if ((!reverse && self.deltaY < 0) || (reverse && self.deltaY > 0)) {
          factor *= -1
        }
        gsap
          .timeline({
            defaults: {
              ease: 'none',
            },
          })
          .to(tl, { timeScale: factor * 2.5, duration: 0.2, overwrite: true })
          .to(tl, { timeScale: factor / 2.5, duration: 1 }, '+=0.3')
      },
    })

    return () => {
      tl.kill()
      observer.kill()
    }
  }, [reverse])

  return (
    <div
      className={`marquee-text-responsive flex h-20 w-full items-center overflow-hidden whitespace-nowrap font-light uppercase md:h-25 ${className}`}
    >
      <div className="flex">
        {items.map((text, index) => (
          <span
            key={`${text.length}-${index}`}
            ref={(el) => {
              itemsRef.current[index] = el
            }}
            className="flex items-center gap-x-32 px-16"
          >
            {text} <HugeiconsIcon icon={WaveTriangleIcon} />
          </span>
        ))}
      </div>
    </div>
  )
}
