// import React from 'react';
// import Dimensions from 'react-dimensions';

// class DimensionsProvider extends React.Component {
//   render() {
//     return (
//       <div>
//         {this.props.children({
//           containerWidth: this.props.containerWidth,
//           containerHeight: this.props.containerHeight,
//         })}
//       </div>
//     );
//   }
// }

// export default Dimensions()(DimensionsProvider);

import { useState, useEffect } from 'react'

function getWindowDimensions () {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}

export default function useWindowDimensions () {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize () {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
