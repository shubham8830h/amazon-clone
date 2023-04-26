import React from 'react'
import Spinner from "react-bootstrap/Spinner"

const LoadingBox = () => {
  return (
    <Spinner animation='border' role="status">
      {/* spinner it can shows loading screen */}
    </Spinner>
  )
}

export default LoadingBox