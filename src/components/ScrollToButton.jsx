import { func, string } from 'prop-types'

import React from 'react'

const ScrollToTopButton = ({ className }) => {
  const scrollOptions = {
    left: 0,
    top: 0,
    behavior: 'smooth',
  }

  const scrollTo = () => {
    // knows ScrollOptions
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo(scrollOptions)
    } else {
      window.scrollTo(0, 0)
    }
  }

  return (
    <button className={className} onClick={scrollTo}>
      <span className="text">{'backToTopButton'}</span>
      <i className="fa fa-arrow-up" aria-hidden="true" />
    </button>
  )
}

ScrollToTopButton.propTypes = {
  className: string,
}

export default ScrollToTopButton
