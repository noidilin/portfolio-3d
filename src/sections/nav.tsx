import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-scroll'
import SOCIALS from '../constants/socials'

// NOTE:
// 1. click animation for nav menu and button (gsap)
// 2. auto hide button when scroll (react scroll)

function Nav() {
  const NAV_ITEMS = ['home', 'services', 'about', 'work', 'contact']

  // NOTE: DOM reference for react
  // 1. different section of navbar
  const navRef = useRef(null) // nav element: slide in effect
  const linksRef = useRef<(HTMLDivElement | null)[]>([]) // links section: stagger effect at the same time
  const contactRef = useRef(null) // contact section: fade-in after effect
  // 2. button icon animation
  const topLineRef = useRef(null)
  const bottomLineRef = useRef(null)

  const tl = useRef<gsap.core.Timeline>(null)
  const iconTl = useRef<gsap.core.Timeline>(null)

  // trigger gsap animation instance
  const [isOpen, setIsOpen] = useState(false)
  // decide menu icon visibility when scrolling
  const [showBurger, setShowBurger] = useState(true)

  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 })
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    })

    // NOTE: store GSAP animation instance in ref:
    // 1. timeline are created in useGSAP, and later controlled in toggleMenu()
    // 2. state cause re-render and recreate timeline
    // 3. variable would be reset on every render
    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, { xPercent: 0, duration: 1, ease: 'power3.out' })
      .to(
        linksRef.current,
        { autoAlpha: 1, x: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
        // NOTE: start at the same time with previous animation
        '<',
      )
      .to(
        contactRef.current,
        { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        // NOTE: start after 0.2s with previous animation
        '<+0.2',
      )
    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: 'power2.inOut',
      })
      .to(
        bottomLineRef.current,
        { rotate: -45, y: -3.3, duration: 0.3, ease: 'power2.inOut' },
        '<',
      )
  }, [])

  useEffect(() => {
    // 1. initial position
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // 2. show when: scroll up or at the top
      setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 10)
      lastScrollY = currentScrollY
    }
    // 3. attach and cleanup (passive -> prevent default, which allow smooth scroll)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    if (isOpen) {
      tl.current?.reverse()
      iconTl.current?.reverse()
    } else {
      tl.current?.play()
      iconTl.current?.play()
    }
    setIsOpen(!isOpen)
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed z-50 flex h-full w-full flex-col justify-between gap-y-10 bg-black px-10 py-28 text-white/80 uppercase md:left-1/2 md:w-1/2"
      >
        <div className="flex flex-col gap-y-2 text-5xl md:text-6xl lg:text-8xl">
          {NAV_ITEMS.map((section, index) => (
            <div
              key={`${index}-${section}`}
              ref={(el) => {
                linksRef.current[index] = el
              }}
            >
              <Link
                className="cursor-pointer transition-all duration-300 hover:text-white"
                to={`${section}`}
                smooth
                offset={0}
                duration={2000}
              >
                {section}
              </Link>
            </div>
          ))}
        </div>
        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-8 md:flex-row"
        >
          <div className="font-light">
            <p className="text-white/50 tracking-wider">E-mail</p>
            <p className="text-pretty text-xl lowercase tracking-widest">
              JohnDoe@gmail.com
            </p>
          </div>
          <div className="font-light">
            <p className="text-white/50 tracking-wider">Social Media</p>
            <div className="flex flex-col flex-wrap gap-x-2 md:flex-row">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-sm uppercase leading-loose tracking-widest transition-colors duration-300 hover:text-white"
                >
                  {'{ '}
                  {social.name}
                  {' }'}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <button
        type="button"
        className="fixed top-4 right-10 z-50 flex h-14 w-14 cursor-pointer flex-col items-center justify-center gap-1 rounded-full bg-black transition-all duration-300 md:h-20 md:w-20"
        onClick={toggleMenu}
        style={
          showBurger
            ? { clipPath: 'circle(50% at 50% 50%)' }
            : { clipPath: 'circle(0% at 50% 50%)' }
        }
      >
        <span
          ref={topLineRef}
          className="block h-0.5 w-8 origin-center rounded-full bg-white"
        ></span>
        <span
          ref={bottomLineRef}
          className="block h-0.5 w-8 origin-center rounded-full bg-white"
        ></span>
      </button>
    </>
  )
}

export default Nav
