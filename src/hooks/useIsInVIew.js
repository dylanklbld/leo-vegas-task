import { useEffect, useRef, useState } from 'react'

import { throttle } from 'lodash'

export const useIsInView = () => {
    const ref = useRef(null)
    const [inView, setInView] = useState(true)
  
    useEffect(() => {
      const handleScroll = throttle(() => {
        if (ref.current) setInView(ref.current.getBoundingClientRect().top > 0)
      }, 200)
  
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
  
      return () => window.removeEventListener('scroll', handleScroll)
    })
  
    return [ref, inView]
  }