import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import Marquee from '../components/marquee'

// NOTE:
// 1. pinned section with scroll scrub effect (gsap scrollTrigger)
// 2. marquee component for scrolling text banners

const ITEMS_1 = ['Vision', 'Precision', 'Craft', 'Collaboration', 'Excellence']
const ITEMS_2 = [
  'contact us',
  'contact us',
  'contact us',
  'contact us',
  'contact us',
]

const ContactSummary = () => {
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'center center',
        end: '+=800 center',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        markers: false,
      },
    })
  }, [])

  return (
    <section
      ref={containerRef}
      className="mt-16 flex min-h-screen flex-col items-center justify-between gap-12"
    >
      <Marquee items={ITEMS_1} />
      <div className="contact-text-responsive overflow-hidden text-center font-light">
        <p>
          " Let's create <br />
          <span className="font-normal">memorable</span> &{' '}
          <span className="italic">inspiring</span> <br />
          visual experiences <span className="text-accent">together</span> "
        </p>
      </div>
      <Marquee
        items={ITEMS_2}
        className="border-y-2 bg-transparent font-black text-primary"
        reverse={true}
      />
    </section>
  )
}

export default ContactSummary
