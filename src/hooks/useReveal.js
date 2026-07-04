import { useEffect, useRef, useState } from 'react'

/**
 * useReveal — tiny scroll-reveal hook (no extra dependencies).
 * Returns a ref to attach to an element and a boolean that flips to
 * true once the element scrolls into view, so it can be given an
 * "in view" class that triggers a CSS animation/transition.
 */
export default function useReveal({ threshold = 0.15, rootMargin = '0px 0px -60px 0px', once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Respect users who prefer less motion — show content immediately.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) observer.unobserve(node)
          } else if (!once) {
            setInView(false)
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}
