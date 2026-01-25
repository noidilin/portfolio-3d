import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import AnimatedHeaderSection, {
  type AnimatedHeaderProps,
} from '../components/animated-header'
import SERVICE from '../constants/services'

// NOTE:
// 1. scroll reveal animation for each service card (gsap)
// 2. sticky stacking cards on desktop with dynamic offset calculation

const HEADER: AnimatedHeaderProps = {
  title: 'services',
  subTitle: 'From concept to final delivery',
  brief: `I create stunning 3D visuals and motion content
    that captivate audiences
    and elevate brands.`,
  color: 'invert',
}

export default function Services() {
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])
  const isDesktop = useMediaQuery({ minWidth: '48rem' }) //768px

  useGSAP(() => {
    // NOTE: slide up effect for each el
    serviceRefs.current.forEach((el) => {
      if (!el) return

      gsap.from(el, {
        y: 200,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
        duration: 1,
        ease: 'circ.out',
      })
    })
  }, [])

  return (
    <section id="services" className="min-h-screen rounded-t-4xl bg-primary">
      <AnimatedHeaderSection {...HEADER} />
      {SERVICE.map((service, index) => (
        <div
          ref={(el) => {
            serviceRefs.current[index] = el
          }}
          key={service.title}
          className="sticky border-muted-foreground border-t-2 bg-primary px-10 pt-6 pb-12 text-primary-foreground"
          style={
            // NOTE: don't overlap on desktop
            isDesktop
              ? {
                  // NOTE: sticky start point for each el
                  top: `calc(10vh + ${index * 5}em)`,

                  // PERF: extra scroll space at the bottom of each el
                  // I didn't use fixed value because:
                  // 1. the last el can't have margin bottom, since it should connect with the about section
                  // 2. it create interesting pacing for the sticky stack effect
                  marginBottom: `${(SERVICE.length - index - 1) * 5}rem`,
                }
              : { top: 0 }
          }
        >
          <div className="flex items-center justify-between gap-4 font-light">
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="mb-2 text-4xl lg:text-5xl">{service.title}</h2>
                <p className="text-pretty font-mono text-lg text-muted-foreground lg:text-xl">
                  {service.description}
                </p>
              </div>

              <div className="flex flex-col gap-2 text-2xl text-primary-foreground/70 sm:gap-4 lg:text-3xl">
                {service.items.map((item, itemIndex) => (
                  <div key={`${service.title}-${index}-${itemIndex}`}>
                    <h3 className="flex">
                      <span className="mr-6 text-lg text-primary-foreground/30 lg:mr-10">
                        0{itemIndex + 1}
                      </span>
                      {item.title}
                    </h3>
                    {itemIndex < service.items.length - 1 && (
                      <div className="my-2 h-px w-full bg-secondary-foreground" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
