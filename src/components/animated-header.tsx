import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import AnimatedTextLines from './animated-text-lines'

interface AnimatedHeaderProps {
  subTitle: string
  title: string
  brief: string
  textColor: string // TODO: can we type css class
  withScrollTrigger?: boolean
}

export default function AnimatedHeader({
  subTitle,
  title,
  brief,
  textColor,
  withScrollTrigger = false,
}: AnimatedHeaderProps) {
  const contextRef = useRef(null)
  const headerRef = useRef(null)
  const shouldSplitTitle = title.includes(' ')
  const titleParts = shouldSplitTitle ? title.split(' ') : [title]

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? { trigger: contextRef.current }
        : undefined,
    })
    tl.from(contextRef.current, {
      y: '50vh',
      duration: 1,
      ease: 'circ.out',
    })
    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: '200',
        duration: 1,
        ease: 'circ.out',
      },
      '<+0.2',
    )
  }, [])

  return (
    <div ref={contextRef}>
      {/* mask out the header based with this clipPath shape */}
      <div style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-12 pt-16 sm:gap-16"
        >
          <p
            className={`px-10 font-light text-sm uppercase tracking-[0.5rem] ${textColor}`}
          >
            {subTitle}
          </p>
          <div className="px-10">
            <h1
              className={`banner-text-responsive flex flex-col gap-12 uppercase sm:gap-16 md:block ${textColor}`}
            >
              {titleParts.map((part, index) => (
                <span key={`${index}-${part}`}>{part} </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-10 ${textColor}`}>
        <div className="absolute inset-x-0 border-t-2" />
        <div className="py-12 text-end sm:py-16">
          <AnimatedTextLines
            text={brief}
            className={`value-text-responsive font-light uppercase ${textColor}`}
          />
        </div>
      </div>
    </div>
  )
}
