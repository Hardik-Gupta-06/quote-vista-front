import React from 'react'
import { BallTriangle, Blocks, RotatingSquare } from 'react-loader-spinner';

const Loader = () => {
  return (
    <RotatingSquare
        height="100"
        width="100"
        color="#a688fa"
        ariaLabel="rotating-square-loading"
        wrapperStyle={{ 
            position: 'fixed',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)' 
        }}
        wrapperClass=""
        visible={true}
    />
  )
}

export default Loader