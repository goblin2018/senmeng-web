import React, { useEffect } from 'react'

const LoggerHOC = Component => props => {
  useEffect(() => {
    console.log(window.location)
  }, [])
  return <Component {...props} />
}

export default LoggerHOC
