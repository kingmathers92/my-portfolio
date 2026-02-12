import { useEffect, useRef } from 'react'
import { T } from '../shared/theme'

export function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  // Current actual mouse position
  const mousePos = useRef({ x: 0, y: 0 })
  // Ring's current position (starts at 0,0 and chases the mouse)
  const ringPos  = useRef({ x: 0, y: 0 })
  const rafId    = useRef(null)

  useEffect(() => {
    // Move dot instantly on every mouse move
    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
    }

    const grow = () => {
      if (dotRef.current)  { dotRef.current.style.width = '18px'; dotRef.current.style.height = '18px' }
      if (ringRef.current) { ringRef.current.style.width = '54px'; ringRef.current.style.height = '54px'; ringRef.current.style.borderColor = 'rgba(232,168,56,0.7)' }
    }
    const shrink = () => {
      if (dotRef.current)  { dotRef.current.style.width = '10px'; dotRef.current.style.height = '10px' }
      if (ringRef.current) { ringRef.current.style.width = '36px'; ringRef.current.style.height = '36px'; ringRef.current.style.borderColor = 'rgba(232,168,56,0.4)' }
    }

    const attachListeners = () => {
      document.querySelectorAll('a, button, .project-card, .article-card, .contact-item, .skill-tag')
        .forEach(el => {
          el.addEventListener('mouseenter', grow)
          el.addEventListener('mouseleave', shrink)
        })
    }
    attachListeners()
    const interval = setInterval(attachListeners, 1500)
    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.13
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.13

      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px'
        ringRef.current.style.top  = ringPos.current.y + 'px'
      }

      rafId.current = requestAnimationFrame(animate)
    }
    animate()

    document.addEventListener('mousemove', onMouseMove)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      clearInterval(interval)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{ position:'fixed', width:10, height:10, background:T.accent, borderRadius:'50%', pointerEvents:'none', zIndex:9999, transform:'translate(-50%,-50%)', transition:'width 0.2s, height 0.2s', mixBlendMode:'difference' }} />

      <div ref={ringRef} style={{ position:'fixed', width:36, height:36, border:'1px solid rgba(232,168,56,0.4)', borderRadius:'50%', pointerEvents:'none', zIndex:9998, transform:'translate(-50%,-50%)', transition:'width 0.25s, height 0.25s, border-color 0.2s' }} />
    </>
  )
}