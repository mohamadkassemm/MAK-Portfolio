import { useEffect, useRef, useState } from 'react'

export default function Reveal({ as: Tag = 'div', direction = 'up', className = '', style, children, ...rest }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-reveal={direction}
      className={`${inView ? 'in' : ''} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  )
}
