/** biome-ignore-all lint/performance/noImgElement: small project should be fine */

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import AnimatedHeaderSection, {
  type AnimatedHeaderProps,
} from '../components/animated-header'
import AnimatedTextLines from '../components/animated-text-lines'

// NOTE:
// 1. section scale down effect on scroll (gsap scrollTrigger)
// 2. image reveal with clip-path polygon animation
// 3. text lines animated with <AnimatedTextLines/>

const HEADER: AnimatedHeaderProps = {
  title: 'About',
  subTitle: 'Vision meets craft, frame by frame',
  brief: `Passionate about visual storytelling
  I create compelling CG content
  from concept to final render`,
  color: 'invert',
}

const INTRODUCTION = `Dedicated to crafting visually stunning 3D animations and motion graphics—from architectural visualizations to brand storytelling. Every frame is a commitment: quality that audiences feel.
  When I'm not rendering:
- Exploring procedural modeling and shader techniques in Blender
- Experimenting with real-time engines and AI-assisted workflows
- Refining color grading pipelines for cinematic consistency
- Finding inspiration in architecture, film, and data visualization`

const About = () => {
  const imgRef = useRef(null)

  useGSAP(() => {
    // NOTE: scale down when scroll to bottom 80% part of #about element
    gsap.to('#about', {
      scale: 0.95,
      scrollTrigger: {
        trigger: '#about',
        start: 'bottom 80%',
        end: 'bottom 20%',
        scrub: true,
        markers: false,
      },
      ease: 'power1.inOut',
    })

    // mask out and reveal the image
    gsap.set(imgRef.current, {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
    })
    gsap.to(imgRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: imgRef.current,
        start: 'top 100%',
        end: 'top 35%',
        scrub: true,
        markers: false,
      },
    })
  })

  return (
    <section id="about" className="min-h-screen rounded-b-4xl bg-primary">
      <AnimatedHeaderSection {...HEADER} />
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 font-light text-primary-foreground/60 text-xl tracking-wide md:text-2xl lg:flex-row lg:text-3xl">
        <div className="w-2xl">
          <img
            ref={imgRef}
            src="images/profile.webp"
            alt="profile photo"
            className="aspect-3/4 rounded-3xl object-cover grayscale"
          />
        </div>
        <AnimatedTextLines
          brief={INTRODUCTION}
          className={'w-full font-mono text-lg leading-relaxed lg:text-2xl'}
        />
      </div>
    </section>
  )
}

export default About
