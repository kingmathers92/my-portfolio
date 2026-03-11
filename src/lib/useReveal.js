import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 }
      )

      const elements = document.querySelectorAll('.reveal')

      elements.forEach(el => {
        const rect = el.getBoundingClientRect()
        const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0

        if (alreadyVisible) {
          // Already on screen — make visible immediately, no need to observe
          el.classList.add('visible')
        } else {
          observer.observe(el)
        }
      })

      return () => observer.disconnect()
    }, 100)

    return () => clearTimeout(timer)
  })
}