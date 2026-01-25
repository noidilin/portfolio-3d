import { useGSAP } from '@gsap/react'
import { cva, type VariantProps } from 'class-variance-authority'
import gsap from 'gsap'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import AnimatedTextLines from './animated-text-lines'

// NOTE:
// 1. slide up entrance animation with gsap timeline
// 2. clip-path polygon mask for overflow hidden effect
// 3. optional scrollTrigger for scroll-based activation
// 4. uses class-variance-authority (cva) for color variants

const headerVariants = cva('', {
  variants: {
    color: {
      default: 'text-foreground',
      invert: 'text-background',
    },
  },
  defaultVariants: {
    color: 'default',
  },
})

export interface AnimatedHeaderProps
  extends VariantProps<typeof headerVariants> {
  subTitle: string
  title: string
  brief: string
  withScrollTrigger?: boolean
  className?: string
}

export default function AnimatedHeader({
  subTitle,
  title,
  brief,
  color,
  withScrollTrigger = false,
  className,
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
            className={cn(
              'px-10 font-light font-mono text-sm uppercase tracking-widest',
              headerVariants({ color }),
              className,
            )}
          >
            {subTitle}
          </p>
          <div className="px-10">
            <h1
              className={cn(
                'banner-text-responsive flex flex-col gap-12 uppercase sm:gap-16 md:block',
                headerVariants({ color }),
                className,
              )}
            >
              {titleParts.map((part, index) => (
                <span key={`${index}-${part}`}>{part} </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
      <div
        className={cn('relative px-10', headerVariants({ color }), className)}
      >
        <div className="absolute inset-x-0 border-t-2" />
        <div className="py-12 text-end sm:py-16">
          <AnimatedTextLines
            brief={brief}
            className={cn(
              'value-text-responsive font-mono font-thin lowercase',
              headerVariants({ color }),
              className,
            )}
          />
        </div>
      </div>
    </div>
  )
}
