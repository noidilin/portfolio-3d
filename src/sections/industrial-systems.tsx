import { ArrowUpRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

const CAPABILITIES = [
  'BIM/IFC cleanup',
  'real-time walkthroughs',
  'OpenUSD lookdev',
  'streamed RTX review',
]

export default function IndustrialSystems() {
  return (
    <section
      id="industrial-systems"
      className="overflow-hidden border-foreground border-t-2 bg-background px-5 py-16 text-foreground sm:px-6 md:px-10 md:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
        <div className="min-w-0">
          <p className="font-mono text-muted-foreground text-sm uppercase tracking-widest">
            industrial systems
          </p>
          <h2 className="mt-8 max-w-5xl break-words font-bold text-4xl lowercase leading-none sm:text-5xl md:text-6xl lg:text-7xl">
            digital twins for AI-scale spaces
          </h2>
        </div>

        <div className="grid min-w-0 gap-8">
          <p className="max-w-4xl text-pretty break-words font-mono text-base text-muted-foreground lowercase leading-relaxed sm:text-lg md:text-2xl lg:ml-auto lg:text-right">
            BIM/IFC cleanup, real-time walkthroughs, and Omniverse-ready lookdev
            for smart factory and AI infrastructure teams.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 lg:justify-end">
            {CAPABILITIES.map((capability) => (
              <span
                key={capability}
                className="font-mono text-foreground/75 text-xs uppercase"
              >
                {'{ '}
                {capability}
                {' }'}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-stretch">
        <a
          href="/skyvault"
          aria-label="Open industrial AI digital twins route"
          className="group block min-w-0 overflow-hidden border border-border bg-card"
        >
          <video
            src="/assets/skyvault/lookdev-studio.mp4"
            className="aspect-video h-full w-full bg-card object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            aria-label="Omniverse-ready lookdev scene preview"
          />
        </a>

        <div className="flex min-w-0 flex-col justify-between gap-10 border-foreground border-t-2 pt-6">
          <p className="text-pretty break-words font-mono text-muted-foreground text-sm lowercase leading-relaxed md:text-base">
            A focused capability route collects proof across asset
            reconstruction, CAD-to-scene translation, browser-controlled
            Omniverse workflows, and real-time spatial review.
          </p>
          <a
            href="/skyvault"
            className="inline-flex w-fit items-center gap-3 bg-primary px-5 py-4 font-mono text-primary-foreground text-xs uppercase transition-colors duration-300 hover:bg-foreground"
          >
            view capability
            <HugeiconsIcon icon={ArrowUpRight02Icon} size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
