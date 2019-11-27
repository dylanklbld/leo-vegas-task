import { cleanup, fireEvent, render } from '@testing-library/react'

import React from 'react'
import ScrollToButton from '../ScrollToButton'

const defaultProps = { className: 'Hanswuarst', t: _ => _ }

beforeAll(() => {
  window.scrollTo = jest.fn()
})

afterEach(() => {
  cleanup()
  window.scrollTo.mockClear()
})

const renderScrollToButton = props => render(<ScrollToButton {...defaultProps} {...props} />)

describe('ScrollToButton', function() {
  it('should render correctly', function() {
    const { container } = renderScrollToButton()
    expect(container).toMatchSnapshot()
  })

  it('should call the window.scrollTo function with scroll behavior', function() {
    document.documentElement.style.setProperty('scroll-behavior', 'anystring')

    const { getByText } = renderScrollToButton()
    const scrollButton = getByText('components.backToTopButton.label')
    fireEvent.click(scrollButton)
    expect(window.scrollTo).toBeCalledWith({
      left: 0,
      top: 0,
      behavior: 'smooth',
    })
  })
})
