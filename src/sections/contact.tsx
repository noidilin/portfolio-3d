import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import AnimatedHeaderSection, {
  type AnimatedHeaderProps,
} from '../components/animated-header'
import Marquee from '../components/marquee'
import socials from '../constants/socials'

// NOTE:
// 1. stagger reveal animation for social links (gsap scrollTrigger)
// 2. marquee component for scrolling text banner

const HEADER: AnimatedHeaderProps = {
  title: 'Contact',
  subTitle: 'You envision it, I bring it to life',
  brief: `Have a project idea or creative vision?
  Let's discuss how to make it a reality.`,
  color: 'invert',
  withScrollTrigger: true,
}

const ITEMS = [
  'You imagine, I create',
  'You imagine, I create',
  'You imagine, I create',
  'You imagine, I create',
  'You imagine, I create',
]

export default function Contact() {
  useGSAP(() => {
    // NOTE: you can also reference css class as targets
    gsap.from('.social-link', {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: 'back.out',
      scrollTrigger: { trigger: '.social-link' },
    })
  }, [])

  return (
    <section
      id="contact"
      className="flex min-h-screen flex-col justify-between bg-primary"
    >
      <div>
        <AnimatedHeaderSection {...HEADER} />
        <div className="mb-10 flex px-10 font-light text-[26px] text-primary-foreground uppercase leading-none lg:text-[32px]">
          <div className="flex w-full flex-col gap-10">
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="my-2 h-px w-full bg-secondary-foreground" />
              <p className="text-muted-foreground text-xl lowercase tracking-wider md:text-2xl lg:text-3xl">
                linganinja.0120@gmail.com
              </p>
            </div>
            <div className="social-link">
              <h2>Phone</h2>
              <div className="my-2 h-px w-full bg-secondary-foreground" />
              <p className="text-muted-foreground text-xl lowercase md:text-2xl lg:text-3xl">
                +886 929 054 136
              </p>
            </div>
            <div className="social-link">
              <h2>Social Media</h2>
              <div className="my-2 h-px w-full bg-secondary-foreground" />
              <div className="flex flex-wrap gap-2">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground text-xs uppercase leading-loose tracking-wides transition-colors duration-200 hover:text-primary-foreground/80 md:text-sm"
                  >
                    {'{ '}
                    {social.name}
                    {' }'}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Marquee
        items={ITEMS}
        className="bg-transparent text-primary-foreground"
      />
    </section>
  )
}
