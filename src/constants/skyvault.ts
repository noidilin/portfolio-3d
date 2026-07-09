export type SkyvaultMedia = {
  type: 'image' | 'video' | 'repo'
  src: string
  label: string
  alt?: string
  caption?: string
  duration?: string
}

export type SkyvaultSection = {
  id: string
  eyebrow: string
  title: string
  description: string
  tags: string[]
  media: SkyvaultMedia[]
}

export const skyvaultFit = [
  {
    need: 'Smart factory simulation context',
    proof:
      'Large-facility visualization, modular scene planning, and real-time walkthrough evidence for operational review.',
  },
  {
    need: 'CAD/BIM to optimized scene',
    proof:
      'Drawing cleanup, IFC-oriented interiors, renders, and lightweight walkthrough delivery.',
  },
  {
    need: 'DCC modeling reconstruction',
    proof:
      'Hard-surface product modeling, topology control, material development, and visual QA.',
  },
  {
    need: 'OpenUSD / Omniverse workflow',
    proof:
      'Browser-controlled OpenUSD lookdev with streamed RTX output and server-owned composition.',
  },
  {
    need: 'Interactive visual proof',
    proof:
      'Web, Unreal, and Blender pipelines that turn complex spaces into inspectable media.',
  },
]

export const skyvaultSections: SkyvaultSection[] = [
  {
    id: 'modeling',
    eyebrow: '01 / Modeling',
    title: 'asset reconstruction for precise digital twins',
    description:
      'Hard-surface studies and concept modeling show the craft needed to rebuild physical equipment, fixtures, and products as clean, optimized, material-ready 3D assets.',
    tags: [
      'DCC modeling',
      'topology control',
      'PBR-ready assets',
      'concept reconstruction',
    ],
    media: [
      {
        type: 'video',
        src: '/assets/skyvault/modeling/braun-100-model-a.mp4',
        label: 'Braun 100 model A',
        caption:
          'Short loop showing hard-surface form, bevel discipline, and product-scale modeling.',
        duration: '00:05',
      },
      {
        type: 'video',
        src: '/assets/skyvault/modeling/braun-100-model-b.mp4',
        label: 'Braun 100 model B',
        caption:
          'Alternate pass focused on proportion, surface continuity, and material readability.',
        duration: '00:05',
      },
      {
        type: 'video',
        src: '/assets/skyvault/modeling/neo-bike/2040-Neo-Bike.mp4',
        label: '2040 Neo Bike',
        caption:
          'Long-form concept vehicle study with coordinated design, motion, and presentation logic.',
        duration: '01:15',
      },
      {
        type: 'image',
        src: '/assets/skyvault/modeling/neo-bike/01-needs.jpg',
        label: 'Neo Bike needs',
        alt: 'Neo Bike concept board showing needs and design rationale.',
      },
      {
        type: 'image',
        src: '/assets/skyvault/modeling/neo-bike/02-humane.jpg',
        label: 'Neo Bike humane',
        alt: 'Neo Bike concept board showing human-centered design principles.',
      },
      {
        type: 'image',
        src: '/assets/skyvault/modeling/neo-bike/03-coordinated.jpg',
        label: 'Neo Bike coordinated',
        alt: 'Neo Bike concept board showing coordinated system behavior.',
      },
      {
        type: 'image',
        src: '/assets/skyvault/modeling/neo-bike/04-energy.jpg',
        label: 'Neo Bike energy',
        alt: 'Neo Bike concept board showing energy and mobility logic.',
      },
    ],
  },
  {
    id: 'bim-ifc',
    eyebrow: '02 / BIM + IFC',
    title: 'drawings into structured real-time spaces',
    description:
      'This interior reconstruction demonstrates the path from architectural drawings into modeled spaces, rendered checkpoints, and a navigable real-time walkthrough.',
    tags: [
      'CAD cleanup',
      'IFC thinking',
      'interior reconstruction',
      'real-time walkthrough',
    ],
    media: [
      {
        type: 'image',
        src: '/assets/skyvault/bim-ifc/floor-plan/01-floor-plan.jpg',
        label: 'Floor plan',
        alt: 'Interior floor plan drawing for the 12FA3 project.',
        caption: 'Drawings establish spatial intent before reconstruction.',
      },
      {
        type: 'image',
        src: '/assets/skyvault/bim-ifc/floor-plan/02-kitchen-section.jpg',
        label: 'Kitchen section',
        alt: 'Kitchen section drawing for the 12FA3 project.',
      },
      {
        type: 'image',
        src: '/assets/skyvault/bim-ifc/floor-plan/03-wardrobe-section-01.jpg',
        label: 'Wardrobe section 01',
        alt: 'Wardrobe section drawing for the 12FA3 project.',
      },
      {
        type: 'image',
        src: '/assets/skyvault/bim-ifc/floor-plan/03-wardrobe-section-02.jpg',
        label: 'Wardrobe section 02',
        alt: 'Second wardrobe section drawing for the 12FA3 project.',
      },
      {
        type: 'image',
        src: '/assets/skyvault/bim-ifc/floor-plan/04-washitsu-section.jpg',
        label: 'Washitsu section',
        alt: 'Washitsu section drawing for the 12FA3 project.',
      },
      {
        type: 'image',
        src: '/assets/skyvault/bim-ifc/floor-plan/05-bed-section.jpg',
        label: 'Bed section',
        alt: 'Bed section drawing for the 12FA3 project.',
      },
      {
        type: 'image',
        src: '/assets/skyvault/bim-ifc/floor-plan/05-tv-section.jpg',
        label: 'TV section',
        alt: 'TV section drawing for the 12FA3 project.',
      },
      {
        type: 'image',
        src: '/assets/skyvault/bim-ifc/render/12FA3-v2-001.jpg',
        label: 'Interior render 001',
        alt: 'Rendered interior view from the 12FA3 project.',
        caption: 'Modeled spaces become inspectable visual targets.',
      },
      {
        type: 'image',
        src: '/assets/skyvault/bim-ifc/render/12FA3-v2-004.jpg',
        label: 'Interior render 004',
        alt: 'Rendered living area view from the 12FA3 project.',
      },
      {
        type: 'image',
        src: '/assets/skyvault/bim-ifc/render/12FA3-v2-007.jpg',
        label: 'Interior render 007',
        alt: 'Rendered room view from the 12FA3 project.',
      },
      {
        type: 'video',
        src: '/assets/skyvault/bim-ifc/blender-real-time-walkthrough.mp4',
        label: 'Blender real-time walkthrough',
        caption:
          'The payoff: a reconstructed interior running as a navigable real-time scene.',
        duration: '01:26',
      },
      {
        type: 'repo',
        src: 'https://github.com/noidilin/ifc',
        label: 'IFC repository',
        caption:
          'Public project archive with IFC files, layouts, drawings, and sheets.',
      },
    ],
  },
  {
    id: 'omniverse-lookdev',
    eyebrow: '03 / Omniverse',
    title: 'browser-controlled lookdev for OpenUSD scenes',
    description:
      'The Omniverse lookdev prototype keeps OpenUSD composition on the server, streams RTX output to the browser, and lets a React control surface drive model switching and asset reload workflows.',
    tags: [
      'OpenUSD',
      'NVIDIA Omniverse',
      'RTX streaming',
      'React control surface',
    ],
    media: [
      {
        type: 'video',
        src: '/assets/skyvault/lookdev-studio.mp4',
        label: 'Lookdev studio',
        caption: 'A compact lookdev environment for streamed scene inspection.',
        duration: '00:14',
      },
      {
        type: 'video',
        src: '/assets/skyvault/omniverse-web-lookdev/model-oav-switch.mp4',
        label: 'Model switching',
        caption:
          'Browser commands trigger server-side USD composition changes.',
        duration: '01:14',
      },
      {
        type: 'video',
        src: '/assets/skyvault/omniverse-web-lookdev/asset-reload.mp4',
        label: 'Asset reload',
        caption:
          'Lookdev iteration stays live while assets update behind the streaming viewport.',
        duration: '01:41',
      },
      {
        type: 'repo',
        src: 'https://github.com/noidilin/omni-lookdev',
        label: 'Omniverse lookdev repository',
        caption:
          'React frontend with a server-owned OpenUSD, ovrtx, and ovstream pipeline.',
      },
    ],
  },
  {
    id: 'real-time',
    eyebrow: '04 / Real-time support',
    title: 'architectural visualization as delivery proof',
    description:
      'Unreal Engine walkthroughs show comfort with real-time lighting, spatial pacing, and client-facing visual review for AI architecture and digital twin programs.',
    tags: ['Unreal Engine', 'arch viz', 'lighting', 'walkthrough'],
    media: [
      {
        type: 'video',
        src: '/assets/skyvault/ue-arch-viz/ue-arch-viz-01.mp4',
        label: 'UE arch viz 01',
        caption:
          'Real-time architecture visualization with spatial review pacing.',
        duration: '01:17',
      },
      {
        type: 'video',
        src: '/assets/skyvault/ue-arch-viz/ue-arch-viz-02.mp4',
        label: 'UE arch viz 02',
        caption:
          'A shorter supporting walkthrough for environment, lighting, and camera control.',
        duration: '00:36',
      },
    ],
  },
]
