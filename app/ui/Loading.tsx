'use client'

import React, { Fragment } from 'react'
import Spinner from './Spinner'

const LoadingModal = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-purple-3 bg-opacity-50 backdrop-blur-sm'>
      <Spinner />
    </div>
  )
}

export default LoadingModal
