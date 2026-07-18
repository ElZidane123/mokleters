import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type Key, type ReactNode } from 'react'

type LogoNodeItem = {
  node: ReactNode
  href?: string
  title?: string
  ariaLabel?: string
}

type LogoImageItem = {
  src: string
  alt?: string
  href?: string
  title?: string
  srcSet?: string
  sizes?: string
  width?: number
  height?: number
}

export type LogoItem = LogoNodeItem | LogoImageItem

export interface LogoLoopProps {
  logos: LogoItem[]
  speed?: number
  direction?: 'left' | 'right' | 'up' | 'down'
  width?: number | string
  logoHeight?: number
  gap?: number
  pauseOnHover?: boolean
  hoverSpeed?: number
  fadeOut?: boolean
  fadeOutColor?: string
  scaleOnHover?: boolean
  renderItem?: (item: LogoItem, key: Key) => ReactNode
  ariaLabel?: string
  className?: string
  style?: CSSProperties
}

const toCssLength = (value?: number | string): string | undefined =>
  typeof value === 'number' ? `${value}px` : value !== undefined ? value : undefined

const isLogoNode = (item: LogoItem): item is LogoNodeItem => 'node' in item

const LogoLoop = ({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = 'Partner logos',
  className,
  style,
}: LogoLoopProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const sequenceRef = useRef<HTMLUListElement | null>(null)

  const [seqSize, setSeqSize] = useState(0)
  const [copyCount, setCopyCount] = useState(3)
  const [isHovered, setIsHovered] = useState(false)

  const isVertical = direction === 'up' || direction === 'down'

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed
    if (pauseOnHover === true) return 0
    if (pauseOnHover === false) return undefined
    return 0
  }, [hoverSpeed, pauseOnHover])

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed)
    const directionMultiplier = isVertical
      ? direction === 'up'
        ? 1
        : -1
      : direction === 'left'
      ? 1
      : -1
    const speedMultiplier = speed < 0 ? -1 : 1
    return magnitude * directionMultiplier * speedMultiplier
  }, [speed, direction, isVertical])

  const updateSequenceSize = useCallback(() => {
    const sequenceRect = sequenceRef.current?.getBoundingClientRect()
    const size = isVertical ? sequenceRect?.height ?? 0 : sequenceRect?.width ?? 0
    const containerSize = isVertical
      ? containerRef.current?.clientHeight ?? 0
      : containerRef.current?.clientWidth ?? 0

    if (size > 0) {
      setSeqSize(Math.ceil(size))
      const count = Math.max(2, Math.ceil(containerSize / size) + 2)
      setCopyCount(count)
    }
  }, [isVertical])

  useEffect(() => {
    updateSequenceSize()
    window.addEventListener('resize', updateSequenceSize)
    return () => window.removeEventListener('resize', updateSequenceSize)
  }, [updateSequenceSize])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let rafId: number | null = null
    let lastTimestamp: number | null = null
    let offset = 0
    let velocity = 0

    const animate = (timestamp: number) => {
      if (lastTimestamp === null) {
        lastTimestamp = timestamp
      }

      const deltaTime = Math.max(0, timestamp - lastTimestamp) / 1000
      lastTimestamp = timestamp
      const target = isHovered && effectiveHoverSpeed !== undefined ? effectiveHoverSpeed : targetVelocity
      const easing = 1 - Math.exp(-deltaTime / 0.25)
      velocity += (target - velocity) * easing

      if (seqSize > 0) {
        offset += velocity * deltaTime
        const normalized = ((offset % seqSize) + seqSize) % seqSize
        const transformValue = isVertical
          ? `translate3d(0, ${-normalized}px, 0)`
          : `translate3d(${-normalized}px, 0, 0)`
        track.style.transform = transformValue
      }

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [targetVelocity, seqSize, isHovered, effectiveHoverSpeed, isVertical])

  const itemStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: logoHeight,
    marginRight: gap,
    transition: scaleOnHover ? 'transform 0.25s ease' : undefined,
  }

  const renderedLogos = useCallback(
    (copyIndex: number) =>
      logos.map((item, itemIndex) => {
        const key = `${copyIndex}-${itemIndex}`
        const itemContent = renderItem ? (
          renderItem(item, key)
        ) : isLogoNode(item) ? (
          item.node
        ) : (
          <img
            src={item.src}
            alt={item.alt ?? item.title ?? ''}
            title={item.title}
            srcSet={item.srcSet}
            sizes={item.sizes}
            width={item.width}
            height={item.height}
            style={{ height: logoHeight, width: 'auto', display: 'block' }}
            loading="lazy"
            decoding="async"
          />
        )

        const ariaLabelItem = isLogoNode(item) ? item.ariaLabel ?? item.title : item.alt ?? item.title
        const inner = item.href ? (
          <a
            href={item.href}
            aria-label={ariaLabelItem ?? 'Logo link'}
            target="_blank"
            rel="noreferrer noopener"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'inherit' }}
          >
            {itemContent}
          </a>
        ) : (
          itemContent
        )

        return (
          <li
            key={key}
            role="listitem"
            style={itemStyle}
            className={scaleOnHover ? 'logo-loop-item-scale' : undefined}
          >
            {inner}
          </li>
        )
      }),
    [logos, logoHeight, gap, renderItem, scaleOnHover, isVertical]
  )

  const loopItems = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, idx) => (
        <ul
          key={`logo-loop-copy-${idx}`}
          ref={idx === 0 ? sequenceRef : undefined}
          role="list"
          aria-hidden={idx > 0}
          style={{
            display: 'flex',
            flexDirection: isVertical ? 'column' : 'row',
            alignItems: 'center',
            gap,
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}
        >
          {renderedLogos(idx)}
        </ul>
      )),
    [copyCount, isVertical, gap, renderedLogos]
  )

  const rootStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    width: toCssLength(width) ?? '100%',
    ...style,
  }

  const fadeStyle = fadeOutColor
    ? fadeOutColor
    : 'rgba(255,255,255,0.95)'

  const overlayStyle = {
    position: 'absolute' as const,
    top: 0,
    bottom: 0,
    width: 40,
    pointerEvents: 'none' as const,
    zIndex: 2,
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={rootStyle}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={() => effectiveHoverSpeed !== undefined && setIsHovered(true)}
      onMouseLeave={() => effectiveHoverSpeed !== undefined && setIsHovered(false)}
    >
      {fadeOut && !isVertical && (
        <>
          <div
            aria-hidden="true"
            style={{
              ...overlayStyle,
              left: 0,
              background: `linear-gradient(to right, ${fadeStyle}, rgba(255,255,255,0))`,
            }}
          />
          <div
            aria-hidden="true"
            style={{
              ...overlayStyle,
              right: 0,
              background: `linear-gradient(to left, ${fadeStyle}, rgba(255,255,255,0))`,
            }}
          />
        </>
      )}

      {fadeOut && isVertical && (
        <>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 40,
              pointerEvents: 'none',
              background: `linear-gradient(to bottom, ${fadeStyle}, rgba(255,255,255,0))`,
              zIndex: 2,
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 40,
              pointerEvents: 'none',
              background: `linear-gradient(to top, ${fadeStyle}, rgba(255,255,255,0))`,
              zIndex: 2,
            }}
          />
        </>
      )}

      <div
        ref={trackRef}
        style={{
          display: 'flex',
          flexDirection: isVertical ? 'column' : 'row',
          alignItems: 'center',
          width: isVertical ? '100%' : 'max-content',
          minHeight: isVertical ? 'max-content' : logoHeight,
          gap,
          willChange: 'transform',
        }}
      >
        {loopItems}
      </div>
    </div>
  )
}

export default LogoLoop
