import { useEffect, useRef, useState } from 'react'

import {readCookie} from '../utils/cookie'

export const useCookies = (name) => {
    const [cookie, setReadCookie] = useState(null)
  
    useEffect(() => {
      const value = readCookie(name)
      
      if(value){
          setReadCookie(value)
      }
    }, [])
  
    return cookie
  }