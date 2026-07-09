/** biome-ignore-all lint/performance/noImgElement: Vite portfolio route uses static public media assets. */

import { useGSAP } from '@gsap/react'
import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  ArrowUpRight02Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef, useState } from 'react'
import {
  type SkyvaultMedia,
  skyvaultFit,
  skyvaultSections,
} from '../constants/skyvault'

gsap.registerPlugin(ScrollTrigger)

function SkyvaultVideo({
  media,
  className = '',
  controls = false,
}: {
  media: SkyvaultMedia
  className?: string
  controls?: boolean
}) {
  return (
    <video
      src={media.src}
      className={`h-full w-full bg-card object-cover ${className}`}
      muted
      autoPlay
      loop
      playsInline
      preload="metadata"
      controls={controls}
      aria-label={media.label}
    />
  )
}

function MediaFrame({
  media,
  className = '',
  controls = false,
}: {
  media: SkyvaultMedia
  className?: string
  controls?: boolean
}) {
  const imageClassName =
    media.src.includes('/floor-plan/') ||
    media.src.includes('/ifc-sheet-export/') ||
    media.src.includes('/neo-bike/')
    ? 'h-full w-full bg-background object-contain p-2'
    : 'h-full w-full object-cover'

  return (
    <figure className={`overflow-hidden bg-card ${className}`}>
      <div className="aspect-video w-full overflow-hidden border border-border bg-muted">
        {media.type === 'video' ? (
          <SkyvaultVideo media={media} controls={controls} />
        ) : (
          <img
            src={media.src}
            alt={media.alt ?? media.label}
            className={imageClassName}
            loading="lazy"
          />
        )}
      </div>
      <figcaption className="grid gap-3 border-border border-x border-b px-4 py-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
        <div>
          <p className="font-mono text-muted-foreground text-xs uppercase">
            {media.label}
          </p>
          {media.caption && (
            <p className="mt-2 text-pretty font-mono text-muted-foreground text-sm lowercase leading-relaxed">
              {media.caption}
            </p>
          )}
        </div>
        {media.duration && (
          <p className="font-mono text-muted-foreground text-xs">
            {media.duration}
          </p>
        )}
      </figcaption>
    </figure>
  )
}

function RepoLinks({ media }: { media: SkyvaultMedia[] }) {
  const links = media.filter((item) => item.type === 'repo')

  if (links.length === 0) return null

  return (
    <div className="px-5 pb-20 sm:px-6 md:px-10">
      <div className="skyvault-reveal grid gap-6 border-foreground border-t-2 pt-6 md:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="font-mono text-muted-foreground text-xs uppercase">
            repository evidence
          </p>
          <h3 className="mt-6 max-w-xl text-pretty font-bold text-3xl lowercase leading-none sm:text-4xl md:text-5xl">
            source files and implementation archive.
          </h3>
        </div>
        <div className="grid gap-3">
          {links.map((link) => (
            <a
              key={link.src}
              href={link.src}
              target="_blank"
              rel="noreferrer"
              className="group grid gap-4 border border-border bg-card px-4 py-5 transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground sm:grid-cols-[1fr_auto] sm:items-start"
            >
              <span>
                <span className="block font-mono text-muted-foreground text-xs uppercase transition-colors duration-300 group-hover:text-primary-foreground/70">
                  {link.label}
                </span>
                {link.caption && (
                  <span className="mt-3 block text-pretty font-mono text-muted-foreground text-sm lowercase leading-relaxed transition-colors duration-300 group-hover:text-primary-foreground/80">
                    {link.caption}
                  </span>
                )}
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase">
                open repo
                <HugeiconsIcon icon={ArrowUpRight02Icon} size={16} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function DocumentEvidence({ media }: { media: SkyvaultMedia }) {
  return (
    <div className="skyvault-reveal flex min-h-full flex-col justify-between gap-10 border-border border-t pt-4">
      <div>
        <p className="font-mono text-muted-foreground text-xs uppercase">
          source artifact
        </p>
        <h3 className="mt-8 max-w-2xl text-pretty font-bold text-3xl lowercase leading-none sm:text-4xl md:text-5xl">
          ifc-exported drawing package, preserved as the original pdf.
        </h3>
      </div>
      <div className="border border-border bg-card">
        <div className="grid gap-5 px-4 py-5 sm:grid-cols-[1fr_auto] sm:items-start">
          <div>
            <p className="font-mono text-muted-foreground text-xs uppercase">
              {media.label}
            </p>
            {media.caption && (
              <p className="mt-3 text-pretty font-mono text-muted-foreground text-sm lowercase leading-relaxed">
                {media.caption}
              </p>
            )}
          </div>
          {media.duration && (
            <p className="font-mono text-muted-foreground text-xs">
              {media.duration}
            </p>
          )}
        </div>
        <a
          href={media.src}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between gap-4 border-border border-t px-4 py-4 font-mono text-xs uppercase transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          open pdf
          <HugeiconsIcon icon={ArrowUpRight02Icon} size={16} />
        </a>
      </div>
    </div>
  )
}

function MediaCarousel({
  media,
  label = 'media set',
  previousLabel = 'Previous media',
  nextLabel = 'Next media',
}: {
  media: SkyvaultMedia[]
  label?: string
  previousLabel?: string
  nextLabel?: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeMedia = media[activeIndex]

  if (!activeMedia) return null

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? media.length - 1 : current - 1,
    )
  }

  const goToNext = () => {
    setActiveIndex((current) =>
      current === media.length - 1 ? 0 : current + 1,
    )
  }

  return (
    <div className="skyvault-reveal min-w-0">
      <div className="flex items-center justify-between gap-4 border-border border-t py-4">
        <p className="font-mono text-muted-foreground text-xs uppercase">
          {label} / {activeIndex + 1} of {media.length}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            title={previousLabel}
            aria-label={previousLabel}
            onClick={goToPrevious}
            className="flex size-10 items-center justify-center border border-border bg-background transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            <HugeiconsIcon icon={ArrowLeft02Icon} size={18} />
          </button>
          <button
            type="button"
            title={nextLabel}
            aria-label={nextLabel}
            onClick={goToNext}
            className="flex size-10 items-center justify-center border border-border bg-background transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            <HugeiconsIcon icon={ArrowRight02Icon} size={18} />
          </button>
        </div>
      </div>
      <MediaFrame media={activeMedia} />
      <div className="mt-3 flex flex-wrap gap-2">
        {media.map((item, index) => (
          <button
            key={item.src}
            type="button"
            aria-label={`Show ${item.label}`}
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 flex-1 basis-10 transition-colors duration-300 ${
              index === activeIndex ? 'bg-foreground' : 'bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function SectionHeader({
  eyebrow,
  title,
  description,
  tags,
}: {
  eyebrow: string
  title: string
  description: string
  tags: string[]
}) {
  return (
    <header className="grid gap-8 border-foreground border-t-2 px-5 py-10 sm:px-6 md:grid-cols-[0.6fr_1.4fr] md:px-10 md:py-14">
      <p className="min-w-0 break-words font-mono text-muted-foreground text-sm uppercase">
        {eyebrow}
      </p>
      <div className="min-w-0">
        <h2 className="max-w-5xl break-words font-bold text-4xl lowercase leading-none sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h2>
        <p className="mt-8 max-w-4xl text-pretty break-words font-mono text-base text-muted-foreground lowercase leading-relaxed sm:text-lg md:text-xl lg:text-2xl">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-foreground/75 text-xs uppercase"
            >
              {'{ '}
              {tag}
              {' }'}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}

function EvidenceMatrix() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="grid min-h-screen gap-10 px-6 py-20 md:grid-cols-[0.7fr_1.3fr] md:px-10">
        <div className="flex flex-col justify-between gap-12">
          <div>
            <p className="font-mono text-primary-foreground/60 text-sm uppercase tracking-widest">
              capability matrix
            </p>
            <h2 className="mt-10 font-bold text-4xl lowercase leading-none sm:text-5xl md:text-6xl lg:text-7xl">
              why this work maps to industrial AI infrastructure
            </h2>
          </div>
          <p className="max-w-xl text-pretty font-mono text-lg text-primary-foreground/70 lowercase leading-relaxed">
            the through-line is practical: convert complex physical systems into
            controlled, optimized, inspectable digital environments.
          </p>
        </div>
        <div className="self-end">
          {skyvaultFit.map((item, index) => (
            <div
              key={item.need}
              className="skyvault-reveal grid gap-5 border-primary-foreground/40 border-t py-7 md:grid-cols-[auto_0.7fr_1fr]"
            >
              <span className="font-mono text-primary-foreground/40 text-xs">
                0{index + 1}
              </span>
              <h3 className="text-2xl lowercase leading-tight md:text-3xl">
                {item.need}
              </h3>
              <p className="text-pretty font-mono text-primary-foreground/65 text-sm lowercase leading-relaxed md:text-base">
                {item.proof}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SkyvaultSectionBlock({
  section,
}: {
  section: (typeof skyvaultSections)[number]
}) {
  if (section.id === 'modeling') {
    return <ModelingSection section={section} />
  }

  if (section.id === 'bim-ifc') {
    return <BimIfcSection section={section} />
  }

  const repoLinks = section.media.filter((media) => media.type === 'repo')
  const displayMedia = section.media.filter(
    (media) => media.type === 'image' || media.type === 'video',
  )
  const featured = displayMedia.slice(0, 3)
  const supporting = displayMedia.slice(3)

  return (
    <section id={section.id} className="skyvault-section">
      <SectionHeader
        eyebrow={section.eyebrow}
        title={section.title}
        description={section.description}
        tags={section.tags}
      />
      <div className="grid gap-6 px-5 pb-16 sm:px-6 md:grid-cols-2 md:px-10 xl:grid-cols-3">
        {featured.map((media, index) => (
          <MediaFrame
            key={`${section.id}-${media.src}`}
            media={media}
            controls={media.type === 'video' && index > 1}
            className={index === 0 ? 'md:col-span-2' : ''}
          />
        ))}
      </div>
      {supporting.length > 0 && (
        <div className="grid gap-6 px-5 pb-24 sm:grid-cols-2 sm:px-6 md:px-10 lg:grid-cols-4">
          {supporting.map((media) => (
            <MediaFrame
              key={`${section.id}-${media.src}`}
              media={media}
              controls={media.type === 'video'}
            />
          ))}
        </div>
      )}
      <RepoLinks media={repoLinks} />
    </section>
  )
}

function ModelingSection({
  section,
}: {
  section: (typeof skyvaultSections)[number]
}) {
  const neoBikeImages = section.media.filter(
    (media) => media.type === 'image' && media.src.includes('/neo-bike/'),
  )
  const neoBikePresentation = section.media.find(
    (media) => media.type === 'video' && media.src.includes('/neo-bike/'),
  )
  const studyMedia = section.media.filter(
    (media) =>
      !media.src.includes('/neo-bike/') &&
      (media.type === 'image' || media.type === 'video'),
  )
  const repoLinks = section.media.filter((media) => media.type === 'repo')

  return (
    <section id={section.id} className="skyvault-section">
      <SectionHeader
        eyebrow={section.eyebrow}
        title={section.title}
        description={section.description}
        tags={section.tags}
      />
      {studyMedia.length > 0 && (
        <div className="grid gap-6 px-5 pb-12 sm:px-6 md:grid-cols-2 md:px-10">
          {studyMedia.map((media) => (
            <MediaFrame
              key={`${section.id}-${media.src}`}
              media={media}
              controls={media.type === 'video'}
            />
          ))}
        </div>
      )}
      <div className="grid gap-8 px-5 pb-16 sm:px-6 md:px-10 lg:grid-cols-[0.82fr_1.18fr]">
        <MediaCarousel
          media={neoBikeImages}
          label="neo-bike image set"
          previousLabel="Previous Neo-bike image"
          nextLabel="Next Neo-bike image"
        />
        {neoBikePresentation && (
          <MediaFrame
            media={neoBikePresentation}
            controls
            className="skyvault-reveal"
          />
        )}
      </div>
      <RepoLinks media={repoLinks} />
    </section>
  )
}

function BimIfcSection({
  section,
}: {
  section: (typeof skyvaultSections)[number]
}) {
  const floorPlanMedia = section.media.filter(
    (media) => media.type === 'image' && media.src.includes('/floor-plan/'),
  )
  const sheetPackageMedia = section.media.filter(
    (media) =>
      media.type === 'image' && media.src.includes('/ifc-sheet-export/'),
  )
  const renderMedia = section.media.filter(
    (media) => media.type === 'image' && media.src.includes('/render/'),
  )
  const walkthrough = section.media.find(
    (media) => media.type === 'video' && media.src.includes('walkthrough'),
  )
  const drawingPackage = section.media.find(
    (media) => media.type === 'document' && media.src.endsWith('.pdf'),
  )
  const repoLinks = section.media.filter((media) => media.type === 'repo')

  return (
    <section id={section.id} className="skyvault-section">
      <SectionHeader
        eyebrow={section.eyebrow}
        title={section.title}
        description={section.description}
        tags={section.tags}
      />
      <div className="grid gap-8 px-5 pb-16 sm:px-6 md:px-10 lg:grid-cols-[0.82fr_1.18fr]">
        <MediaCarousel
          media={floorPlanMedia}
          label="floor plan set"
          previousLabel="Previous drawing"
          nextLabel="Next drawing"
        />
        {walkthrough && (
          <MediaFrame
            media={walkthrough}
            controls
            className="skyvault-reveal"
          />
        )}
      </div>
      <div className="grid gap-8 px-5 pb-16 sm:px-6 md:px-10 lg:grid-cols-[0.82fr_1.18fr]">
        <MediaCarousel
          media={sheetPackageMedia}
          label="ifc sheet package"
          previousLabel="Previous IFC sheet"
          nextLabel="Next IFC sheet"
        />
        {drawingPackage && <DocumentEvidence media={drawingPackage} />}
      </div>
      <div className="grid gap-6 px-5 pb-16 sm:grid-cols-2 sm:px-6 md:px-10 lg:grid-cols-3">
        {renderMedia.map((media) => (
          <MediaFrame key={`${section.id}-${media.src}`} media={media} />
        ))}
      </div>
      <RepoLinks media={repoLinks} />
    </section>
  )
}

export default function SkyvaultPage() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.skyvault-hero-copy', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'circ.out',
      })

      gsap.utils.toArray<HTMLElement>('.skyvault-reveal').forEach((el) => {
        gsap.from(el, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: 'circ.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('.skyvault-section').forEach((el) => {
        gsap.from(el.querySelectorAll('figure, a'), {
          y: 80,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'circ.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
          },
        })
      })
    },
    { scope: rootRef },
  )

  return (
    <main ref={rootRef} className="min-h-screen bg-background text-foreground">
      <a
        href="/"
        className="fixed top-4 right-6 z-50 border border-border bg-card px-4 py-3 font-mono text-foreground text-xs uppercase transition-colors duration-300 hover:bg-primary hover:text-primary-foreground md:right-10"
      >
        home
      </a>

      <section className="grid min-h-screen content-between gap-10 px-5 pt-24 pb-10 sm:px-6 md:px-10">
        <div>
          <p className="skyvault-hero-copy font-mono text-muted-foreground text-sm uppercase">
            smart factory / AI architecture / Omniverse workflows
          </p>
          <h1
            aria-label="Industrial AI Digital Twins"
            className="skyvault-hero-copy mt-10 flex max-w-full flex-col overflow-hidden break-words font-bold text-5xl uppercase leading-none sm:text-7xl md:text-8xl lg:text-[10rem]"
          >
            <span>Industrial AI</span>
            <span>Digital Twins</span>
          </h1>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="skyvault-hero-copy aspect-video overflow-hidden border border-border bg-card">
            <SkyvaultVideo
              media={{
                type: 'video',
                src: '/assets/skyvault/lookdev-studio.mp4',
                label: 'Industrial AI digital twin lookdev hero',
              }}
            />
          </div>
          <div className="grid gap-8 border-foreground border-t-2 pt-8">
            <p className="skyvault-hero-copy break-words font-mono text-muted-foreground text-sm uppercase">
              3D assets / BIM + IFC / OpenUSD / streamed RTX review
            </p>
            <p className="skyvault-hero-copy max-w-5xl text-pretty font-mono text-lg lowercase leading-relaxed sm:text-xl md:text-2xl lg:ml-auto lg:text-right lg:text-3xl">
              3D asset, BIM/IFC, and OpenUSD evidence for turning complex
              facilities into simulated, optimized, browser-inspectable
              environments.
            </p>
          </div>
        </div>
      </section>

      <EvidenceMatrix />

      {skyvaultSections.map((section) => (
        <SkyvaultSectionBlock key={section.id} section={section} />
      ))}

      <section className="border-foreground border-t-2 px-5 py-20 sm:px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <p className="font-mono text-muted-foreground text-sm uppercase tracking-widest">
            closing capability
          </p>
          <div>
            <h2 className="max-w-6xl font-bold text-4xl lowercase leading-none sm:text-5xl md:text-6xl lg:text-7xl">
              a practical 3D pipeline for industrial AI systems.
            </h2>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="mailto:linganinja.0120@gmail.com"
                className="bg-primary px-5 py-4 font-mono text-primary-foreground text-xs uppercase transition-colors duration-300 hover:bg-foreground"
              >
                contact
              </a>
              <a
                href="/"
                className="border border-border px-5 py-4 font-mono text-xs uppercase transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                back home
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
