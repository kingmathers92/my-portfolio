import { useEffect, useRef } from 'react'
import { T } from '../shared/theme'

export function Cursor() {
  const dotRef = useRef(null)

  useEffect(() => {
    const onMouseMove = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    return () => document.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <div
      ref={dotRef}
      style={{
        position: 'fixed',
        width: 10,
        height: 10,
        background: T.accent,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.2s, height 0.2s',
        mixBlendMode: 'difference',
      }}
    />
  )
}