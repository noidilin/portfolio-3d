import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

// NOTE:
// 1. horizontal parallax scroll effect using xPercent (gsap scrollTrigger)
// 2. scrub animation syncs movement with scroll position

export default function ServiceSummary() {
  // NOTE: GSAP allows you to use id to reference target as well
  // scrub links the progress of the animation to the scrollbar (like DJ scroll musis)
  // the number set in scrub assign the amount of time that the playhead should take to 'catch up'
  // which smooth the experience
  useGSAP(() => {
    gsap.to('#title-service-1', {
      xPercent: 20,
      scrollTrigger: { trigger: '#title-service-1', scrub: 0.5 },
    })
    gsap.to('#title-service-2', {
      xPercent: -30,
      scrollTrigger: { trigger: '#title-service-2', scrub: 0.5 },
    })
    gsap.to('#title-service-3', {
      xPercent: 100,
      scrollTrigger: { trigger: '#title-service-3', scrub: 0.5 },
    })
    gsap.to('#title-service-4', {
      xPercent: -100,
      scrollTrigger: { trigger: '#title-service-4', scrub: 0.5 },
    })
  })

  return (
    // avoid the horizontal scroll with overflow-hidden class
    <section className="contact-text-responsive mt-20 mb-42 overflow-hidden text-center font-thin text-foreground leading-snug">
      {/* 01: text */}
      <div id="title-service-1">
        <p className="font-bold">Motion Graphic</p>
      </div>
      {/* 02: text / line / text */}
      <div
        id="title-service-2"
        className="flex translate-x-16 items-center justify-center gap-3"
      >
        <p>Architecture</p>
        <div className="h-1 w-10 bg-accent md:w-32" />
        <p>Product</p>
      </div>
      {/* text / line / text / line / text */}
      <div
        id="title-service-3"
        className="flex -translate-x-48 items-center justify-center gap-3"
      >
        <p className="font-bold">Commercial</p>
        <div className="h-1 w-10 bg-accent md:w-32" />
        <p className="italic">Grading</p>
        <div className="h-1 w-10 bg-accent md:w-32" />
        <p>FPE</p>
      </div>
      <div id="title-service-4" className="translate-x-48">
        <p className="italic">Corporate Identity System</p>
      </div>
    </section>
  )
}
