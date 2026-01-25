/** biome-ignore-all lint/a11y/noStaticElementInteractions: small project should be fine */
/** biome-ignore-all lint/performance/noImgElement: small project should be fine */

import { useGSAP } from '@gsap/react'
import { ArrowUpDoubleIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import gsap from 'gsap'
import type React from 'react'
import { useRef, useState } from 'react'
import AnimatedHeaderSection, {
  type AnimatedHeaderProps,
} from '../components/animated-header'
import works from '../constants/works'

// NOTE:
// 1. floating preview image follows cursor with gsap.quickTo for smooth tracking
// 2. clip-path polygon animation for hover overlay effect
// 3. stagger reveal animation for work cards

const HEADER: AnimatedHeaderProps = {
  title: 'works',
  subTitle: 'Imagination meets execution',
  brief: `Selected works showcasing
    visual storytelling crafted
    to inspire and engage.`,
}

const Works = () => {
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([])
  const previewRef = useRef(null)

  const [currentIndex, setCurrentIndex] = useState<number | null>(null)

  const mouse = useRef({ x: 0, y: 0 })
  const moveX = useRef<gsap.QuickToFunc | null>(null)
  const moveY = useRef<gsap.QuickToFunc | null>(null)

  useGSAP(() => {
    // NOTE: preview image following mouse postion
    // `quickTo` is a performance optimization for frequently update animations,
    // it reuse same tween (short fo "in-between") and update the target value
    // instead of creating a new tween every time
    moveX.current = gsap.quickTo(previewRef.current, 'x', {
      duration: 1,
      ease: 'power3.out',
    })
    moveY.current = gsap.quickTo(previewRef.current, 'y', {
      duration: 1,
      ease: 'power3.out',
    })

    // NOTE: stagger animation for each work's reveal
    gsap.from('#work', {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: 'back.out',
      scrollTrigger: {
        trigger: '#work',
      },
    })
  }, [])

  const handleMouseEnter = (index: number) => {
    // disable hover on mobile
    if (window.innerWidth < 768) return
    // assign the index for hover image
    setCurrentIndex(index)

    // NOTE: overlay effects: use clip path to slide in dark background when hover
    const el = overlayRefs.current[index]
    if (!el) return
    // PERF: if user hover between work element quickly,
    // different tweens will compete with each other, fight over the same clip-path property
    // kill existing tween and start over a new one can preven flickering animation in this scenario
    gsap.killTweensOf(el)
    gsap.fromTo(
      el,
      {
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
      },
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
        duration: 0.15,
        ease: 'power2.out',
      },
    )

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      delay: 0.25,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = (index: number) => {
    if (window.innerWidth < 768) return
    setCurrentIndex(null)

    // NOTE: clip path to original shape
    const el = overlayRefs.current[index]
    if (!el) return
    gsap.killTweensOf(el)
    gsap.to(el, {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
      duration: 0.2,
      ease: 'power2.in',
    })

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  // NOTE: track cursor position to move the floating preview
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return

    // NOTE: offset mouse location to prevent distracting the mouse
    mouse.current.x = e.clientX + 24
    mouse.current.y = e.clientY + 24

    if (!moveX.current || !moveY.current) return
    moveX.current(mouse.current.x)
    moveY.current(mouse.current.y)
  }

  return (
    <section id="work" className="flex min-h-screen flex-col">
      <AnimatedHeaderSection {...HEADER} />
      <div
        className="relative flex flex-col font-light"
        onMouseMove={handleMouseMove}
      >
        {works.map((work, index) => (
          <div
            key={work.id}
            id="work"
            className="group relative flex cursor-pointer flex-col gap-1 py-5 md:gap-0"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* overlay: for clip-path animation */}
            <div
              ref={(el) => {
                overlayRefs.current[index] = el
              }}
              className="clip-path absolute inset-0 -z-10 hidden bg-foreground duration-200 md:block"
            />

            {/* title */}
            <div className="flex justify-between px-10 text-foreground transition-all duration-500 md:group-hover:px-12 md:group-hover:text-primary-foreground">
              <h2 className="text-[26px] leading-none lg:text-[32px]">
                {work.name}
              </h2>
              <HugeiconsIcon icon={ArrowUpDoubleIcon} />
              {/* <Icon icon="lucide:arrow-up-right" className="size-5 md:size-6" /> */}
            </div>
            {/* divider */}
            <div className="h-0.5 w-full bg-foreground/80" />
            {/* tools */}
            <div className="transtion-all flex flex-wrap gap-x-5 px-10 text-xs uppercase leading-loose duration-500 md:text-sm md:group-hover:px-12">
              {work.tools.map((tool) => (
                <p
                  key={tool.id}
                  className="text-foreground transition-colors duration-500 md:group-hover:text-primary-foreground"
                >
                  {tool.name}
                </p>
              ))}
            </div>

            {/* mobile preview image */}
            <div className="my-10 flex items-center justify-center px-10 md:hidden">
              <img
                src={work.image}
                alt={`${work.name}-image`}
                className="rounded-xl bg-center"
              />
            </div>
          </div>
        ))}

        {/* desktop Flaoting preview image */}
        <div
          ref={previewRef}
          className="pointer-events-none fixed -top-1/6 left-0 z-50 hidden w-240 overflow-hidden border-8 border-secondary-foreground opacity-0 md:block"
        >
          {currentIndex !== null && (
            <img
              src={works[currentIndex].image}
              alt="works preview image"
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default Works
