import React from 'react'
import useReveal from '../hooks/useReveal.js'

/**
 * Wrap any block of content to have it gently fade/slide into place the
 * first time it scrolls into the viewport.
 *
 * Props:
 *  - as: element/tag to render (default 'div')
 *  - direction: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none'
 *  - delay: extra stagger delay in ms (useful for grids of cards)
 *  - duration: animation duration in ms
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  direction = 'up',
  delay = 0,
  duration = 700,
  className = '',
  ...rest
}) {
  const [ref, inView] = useReveal()

  const hiddenTransform =
    {
      up: 'translateY(28px)',
      down: 'translateY(-28px)',
      left: 'translateX(28px)',
      right: 'translateX(-28px)',
      scale: 'scale(0.92)',
      none: 'none',
    }[direction] || 'translateY(28px)'

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : hiddenTransform,
        transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...rest.style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
