import gsap from 'gsap'

export interface HorizontalLoopConfig {
  repeat?: number
  paused?: boolean
  speed?: number
  snap?: number | false
  paddingRight?: number
  reversed?: boolean
}

export interface LoopTimeline extends gsap.core.Timeline {
  next: (vars?: gsap.TweenVars) => gsap.core.Tween
  previous: (vars?: gsap.TweenVars) => gsap.core.Tween
  current: () => number
  toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween
  times: number[]
}

/**
 * Creates an infinite horizontal loop animation using GSAP.
 *
 * Features:
 * - Infinite horizontal loop using xPercent for responsive behavior
 * - Seamless looping with proper width calculations
 * - Navigation methods (next, previous, toIndex)
 *
 * @param items - Array of HTML elements to loop
 * @param config - Configuration options for the loop animation
 * @returns Extended GSAP timeline with navigation methods
 */
export function createHorizontalLoop(
  items: (HTMLElement | null)[],
  config: HorizontalLoopConfig = {},
): LoopTimeline {
  const elements = gsap.utils.toArray<HTMLElement>(
    items.filter((el): el is HTMLElement => el !== null),
  )

  if (elements.length === 0) {
    throw new Error('horizontalLoop requires at least one valid element')
  }

  const {
    repeat = 0,
    paused = false,
    speed = 1,
    snap: snapConfig = 1,
    paddingRight = 0,
    reversed = false,
  } = config

  const tl = gsap.timeline({
    repeat,
    paused,
    defaults: { ease: 'none' },
    onReverseComplete: () => {
      tl.totalTime(tl.rawTime() + tl.duration() * 100)
    },
  }) as LoopTimeline

  const length = elements.length
  const startX = elements[0].offsetLeft
  const times: number[] = []
  const widths: number[] = []
  const xPercents: number[] = []
  let curIndex = 0
  const pixelsPerSecond = speed * 100

  const snapFn =
    snapConfig === false ? (v: number) => v : gsap.utils.snap(snapConfig)

  // Convert "x" to "xPercent" for responsive behavior and populate arrays
  gsap.set(elements, {
    xPercent: (i, el) => {
      const w = parseFloat(String(gsap.getProperty(el, 'width', 'px')))
      widths[i] = w
      const x = parseFloat(String(gsap.getProperty(el, 'x', 'px')))
      const existingPercent = Number(gsap.getProperty(el, 'xPercent'))
      xPercents[i] = snapFn((x / w) * 100 + existingPercent)
      return xPercents[i]
    },
  })

  gsap.set(elements, { x: 0 })

  const lastElement = elements[length - 1]
  const lastScaleX = Number(gsap.getProperty(lastElement, 'scaleX'))
  const totalWidth =
    lastElement.offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    lastElement.offsetWidth * lastScaleX +
    paddingRight

  for (let i = 0; i < length; i++) {
    const item = elements[i]
    const curX = (xPercents[i] / 100) * widths[i]
    const distanceToStart = item.offsetLeft + curX - startX
    const itemScaleX = Number(gsap.getProperty(item, 'scaleX'))
    const distanceToLoop = distanceToStart + widths[i] * itemScaleX

    tl.to(
      item,
      {
        xPercent: snapFn(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0,
    )
      .fromTo(
        item,
        {
          xPercent: snapFn(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond,
      )
      .add('label' + i, distanceToStart / pixelsPerSecond)

    times[i] = distanceToStart / pixelsPerSecond
  }

  const toIndex = (
    index: number,
    vars: gsap.TweenVars = {},
  ): gsap.core.Tween => {
    let targetIndex = index

    // Always go in the shortest direction
    if (Math.abs(targetIndex - curIndex) > length / 2) {
      targetIndex += targetIndex > curIndex ? -length : length
    }

    const newIndex = gsap.utils.wrap(0, length, targetIndex)
    let time = times[newIndex]

    // If we're wrapping the timeline's playhead, make proper adjustments
    if (time > tl.time() !== targetIndex > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) }
      time += tl.duration() * (targetIndex > curIndex ? 1 : -1)
    }

    curIndex = newIndex
    vars.overwrite = true
    return tl.tweenTo(time, vars)
  }

  // Attach navigation methods to timeline
  tl.next = (vars?: gsap.TweenVars) => toIndex(curIndex + 1, vars)
  tl.previous = (vars?: gsap.TweenVars) => toIndex(curIndex - 1, vars)
  tl.current = () => curIndex
  tl.toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars)
  tl.times = times

  // Pre-render for performance
  tl.progress(1, true).progress(0, true)

  if (reversed) {
    tl.vars.onReverseComplete?.()
    tl.reverse()
  }

  return tl
}
