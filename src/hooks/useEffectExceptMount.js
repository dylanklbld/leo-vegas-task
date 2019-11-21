import React from 'react'

export default (effect, deps) => {
  const isInitialMount = React.useRef(true)

  React.useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false
    else effect()
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}